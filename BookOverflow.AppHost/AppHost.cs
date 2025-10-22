var builder = DistributedApplication.CreateBuilder(args);

// --- Keycloak ---
var keycloak = builder.AddContainer("keycloak", "quay.io/keycloak/keycloak", "26.3")
    .WithEnvironment("KEYCLOAK_ADMIN", "admin")
    .WithEnvironment("KEYCLOAK_ADMIN_PASSWORD", "admin")
    .WithArgs("start-dev", "--import-realm")
    .WithVolume("keycloak-data-dev", "/opt/keycloak/data") // opravené
    .WithHttpEndpoint(6001, 8080, name: "http");

// --- RabbitMQ ---
var rabbitmq = builder.AddRabbitMQ("messaging")
    .WithDataVolume("rabbitmq-data") // správne, je to RabbitMQBuilder
    .WithManagementPlugin(port: 15672);

// --- Typesense ---
var typesense = builder.AddContainer("typesense", "typesense/typesense", "29.0")
    .WithArgs(
        "--data-dir", "/data",
        "--api-key", "xyz",
        "--enable-cors",
        "--listen-port", "8108"
    )
    .WithVolume("typesense-data", "/data")
    .WithHttpEndpoint(8108, 8108, name: "typesense");

// získaj endpoint pre Typesense
var typesenseContainer = typesense.GetEndpoint("typesense");

// --- QuestionService ---
var questionService = builder.AddProject<Projects.QuestionService>("question-svc")
    .WithReference(rabbitmq) // keycloak nie je projekt, použijeme rabbitmq
    .WaitFor(keycloak)       // čakáme na kontajner
    .WaitFor(rabbitmq)
    .WithEnvironment("ConnectionStrings__DefaultConnection", "Data Source=question.db"); // SQLite DB

// --- SearchService ---
var searchService = builder.AddProject<Projects.SearchService>("search-svc")
    .WithReference(typesenseContainer) // endpoint správne
    .WaitFor(typesense)
    .WithEnvironment("ConnectionStrings__DefaultConnection", "Data Source=search.db"); // SQLite DB

builder.Build().Run();