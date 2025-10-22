using System.Text.RegularExpressions;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using SearchService.Data;
using SearchService.Models;
using Typesense;
using Typesense.Setup;
using Wolverine;
using Wolverine.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);

// --- Add OpenAPI ---
builder.Services.AddOpenApi();
builder.AddServiceDefaults();

// --- Add OpenTelemetry tracing ---
builder.Services.AddOpenTelemetry().WithTracing(traceProviderBuilder =>
{
    traceProviderBuilder.SetResourceBuilder(ResourceBuilder.CreateDefault()
            .AddService(builder.Environment.ApplicationName))
        .AddSource("Wolverine");
});

// --- Configure Wolverine with RabbitMQ ---
builder.Host.UseWolverine(opts =>
{
    opts.UseRabbitMqUsingNamedConnection("messaging").AutoProvision();
    opts.ListenToRabbitQueue("questions.search", cfg =>
    {
        cfg.BindExchange("questions");
    });
});

// --- Retrieve Typesense endpoint and API key from DistributedApplication builder ---
// (tieto hodnoty musia byť nastavené pri spustení buildera)
var typesenseContainer = builder.Configuration["services:typesense:typesense:0"];
if (string.IsNullOrEmpty(typesenseContainer))
    throw new InvalidOperationException("Typesense URI not found in config");

var typesenseApiKey = builder.Configuration["typesense-api-key"];
if (string.IsNullOrEmpty(typesenseApiKey))
    throw new InvalidOperationException("Typesense API key not found in config");

// --- Configure Typesense client ---
var uri = new Uri(typesenseContainer);
builder.Services.AddTypesenseClient(config =>
{
    config.ApiKey = typesenseApiKey;
    config.Nodes = new[]
    {
        new Node(uri.Host, uri.Port.ToString(), uri.Scheme)
    };
});

var app = builder.Build();

// --- Configure HTTP request pipeline ---
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapDefaultEndpoints();

// --- Search endpoint ---
app.MapGet("/search", async (string query, ITypesenseClient client) =>
{
    string? tag = null;
    var tagMatch = Regex.Match(query, @"\[(.*?)\]");
    if (tagMatch.Success)
    {
        tag = tagMatch.Groups[1].Value;
        query = query.Replace(tagMatch.Value, "").Trim();
    }

    var searchParams = new SearchParameters(query, "title,content");

    if (!string.IsNullOrWhiteSpace(tag))
    {
        searchParams.FilterBy = $"tags:=[{tag}]";
    }

    try
    {
        var result = await client.Search<SearchQuestion>("questions", searchParams);
        return Results.Ok(result.Hits.Select(hit => hit.Document));
    }
    catch (Exception e)
    {
        return Results.Problem("Typesense search failed", e.Message);
    }
});

// --- Similar titles endpoint ---
app.MapGet("/search/similar-titles", async (string query, ITypesenseClient client) =>
{
    var searchParams = new SearchParameters(query, "title");

    try
    {
        var result = await client.Search<SearchQuestion>("questions", searchParams);
        return Results.Ok(result.Hits.Select(hit => hit.Document));
    }
    catch (Exception e)
    {
        return Results.Problem("Typesense search failed", e.Message);
    }
});

// --- Ensure Typesense index exists ---
using var scope = app.Services.CreateScope();
var client = scope.ServiceProvider.GetRequiredService<ITypesenseClient>();
await SearchInitializer.EnsureIndexExists(client);

app.Run();