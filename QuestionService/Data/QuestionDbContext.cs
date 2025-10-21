using Microsoft.EntityFrameworkCore;
using QuestionService.Models;

namespace QuestionService.Data;

public class QuestionDbContext(DbContextOptions options): DbContext(options) 
{
    public DbSet<Question> Questions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    
    public DbSet<Answer> Answers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tag>();
    }
}