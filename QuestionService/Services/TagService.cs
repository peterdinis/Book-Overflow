using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using QuestionService.Data;
using QuestionService.Models;

namespace QuestionService.Services;

public class TagService
{
    private readonly IMemoryCache _cache;
    private readonly QuestionDbContext _db;
    private const string CacheKey = "tags";

    public TagService(IMemoryCache cache, QuestionDbContext db)
    {
        _cache = cache;
        _db = db;
    }

    public async Task<List<Tag>> GetTagsAsync()
    {
        return await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(2);
            return await _db.Tags.AsNoTracking().ToListAsync();
        }) ?? new List<Tag>();
    }

    public async Task<bool> AreTagsValidAsync(List<string> slugs)
    {
        var tags = await GetTagsAsync();
        var tagSet = tags.Select(x => x.Slug).ToHashSet(StringComparer.OrdinalIgnoreCase);
        return slugs.All(x => tagSet.Contains(x));
        
    }
}