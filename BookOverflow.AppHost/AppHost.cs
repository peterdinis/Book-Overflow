var builder = DistributedApplication.CreateBuilder(args);

var keycloak = builder.AddKeycloak("keycloak", 6001)
    .WithDataVolume("keycloak-data-dev");

//TODO For now sqlite later postgresql

var rabbitmq = builder.AddRabbitMQ("messaging")
    .WithDataVolume("rabbitmq-data")
    .WithManagementPlugin(port: 15672);

var typesense = builder.AddContainer("typesense", "typesense/typesense", "29.0")
    .WithArgs("--data-dir", "/data", "--api-key", "xyz", "--enable-cors")
    .WithVolume("typesense-data", "/data")
    .WithHttpEndpoint(8108, 8108, name: "typesense");

var typesenseContainer = typesense.GetEndpoint("typesense");

var questionService = builder.AddProject<Projects.QuestionService>("question-svc")
    .WithReference(keycloak)
    .WithReference(rabbitmq)
    .WaitFor(keycloak)
    .WaitFor(rabbitmq);

var webapp = builder.AddNpmApp("webapp", "../webapp", "dev")
    .WithReference(keycloak)
    .WithHttpEndpoint(env: "PORT", port: 3000);

var searchService = builder.AddProject<Projects.SearchService>("search-svc")
    .WithReference(typesenseContainer)
    .WaitFor(typesense);

builder.Build().Run();