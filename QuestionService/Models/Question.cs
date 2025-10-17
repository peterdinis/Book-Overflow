namespace QuestionService.Models;

public class Question {
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string AskerId { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public int ViewCount {get; set;}
    public List<string> TagSlugs { get; set; } = [];
    public bool HasAcceptedAnswer { get; set; }
    public int Votes {get; set;}
}