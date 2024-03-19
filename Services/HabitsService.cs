using gamification_project.Configurations;
using gamification_project.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace gamification_project.Services;

public interface IHabitService
{
  Task<bool> DoesUserExist(string userId);
  Task CreateAsync(Habit habit, string userId);
  Task AddActivity(string userId, string dayOfWeek, string weekName, Activity newHabit);
  Task AddActivityToAllWeeks(string userId, string dayOfWeek, bool isPreviousDay ,Activity newHabit, string[] weekKeys);
  Task AddWeek(string userId, string weekName, AddWeekApiBody bodyData);
  Task AddStartDateForWeek(string userId, string weekName, DateTime startDate);
  Task<Habit> GetCurrentUserSchedule(string userId);
  Task UpdateFieldAsync(string userId, string dayOfWeek, string weekName, string activityName, bool completedValue);
  Task AddEmptyWeek(string userId, string dayOfWeek, string customName);
  Task<List<Habit>> GetAsync();
  Task RemoveAsync(string userId);
  Task DeleteAllDocumentsAsync();
}

public class HabitsService : IHabitService
{
  private readonly IMongoCollection<Habit> _habitCollection;

  public HabitsService(IOptions<DatabaseSettings> databaseSettings)
  {
    var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
    var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
    _habitCollection = mongoDb.GetCollection<Habit>(databaseSettings.Value.CollectionName);
  }

  public async Task<bool> DoesUserExist(string userId)
  {
    var filter = Builders<Habit>.Filter.Eq(x => x.UserId, userId);
    var result = await _habitCollection.Find(filter).AnyAsync();
    return result;
  }

  public async Task CreateAsync(Habit habit, string userId)
  {
    Console.WriteLine("Called");
    var userExists = await DoesUserExist(userId);
    if (!userExists)
    {
      Console.WriteLine("Reached");
      await _habitCollection.InsertOneAsync(habit);
    }
    else
    {
      Console.WriteLine("UserExists");
      await _habitCollection.InsertOneAsync(habit);
    }
  }

  public async Task AddActivity(string userId, string dayOfWeek, string weekName, Activity newHabit)
  {
    var filter = Builders<Habit>.Filter.Eq(x => x.UserId, userId);
    var update = Builders<Habit>.Update.AddToSet($"{dayOfWeek}.{weekName}", newHabit);

    await _habitCollection.UpdateOneAsync(filter, update);
  }

  public async Task AddActivityToAllWeeks(string userId, string dayOfWeek, bool isPreviousDay, Activity newHabit, string[] weekKeys)
  {
    var filter = Builders<Habit>.Filter.And(
      Builders<Habit>.Filter.Eq(x => x.UserId, userId)
    );
      if (isPreviousDay)
        for (var i = weekKeys.Length - 1; i < weekKeys.Length; i++)
        {
          var update = Builders<Habit>.Update.AddToSet($"{dayOfWeek}.{weekKeys[i]}", newHabit);
          await _habitCollection.UpdateManyAsync(filter, update);
        }
      else
        for (var i = weekKeys.Length - 2; i < weekKeys.Length; i++)
        {
          var update = Builders<Habit>.Update.AddToSet($"{dayOfWeek}.{weekKeys[i]}", newHabit);
          await _habitCollection.UpdateManyAsync(filter, update);
        }
  }

  public async Task AddWeek(string userId, string weekName, AddWeekApiBody bodyData)
  {
    var filter = Builders<Habit>.Filter.Eq(x => x.UserId, userId);
    var update = Builders<Habit>.Update
      .Set($"Monday.{weekName}", bodyData.monday)
      .Set($"Tuesday.{weekName}", bodyData.tuesday)
      .Set($"Wednesday.{weekName}", bodyData.wednesday)
      .Set($"Thursday.{weekName}", bodyData.thursday)
      .Set($"Friday.{weekName}", bodyData.friday)
      .Set($"Saturday.{weekName}", bodyData.saturday);

    await _habitCollection.UpdateManyAsync(filter, update);
  }

  public async Task AddStartDateForWeek(string userId, string weekName, DateTime startDate)
  {
    var filter = Builders<Habit>.Filter.Eq(x => x.UserId, userId);

    var update = Builders<Habit>.Update.Set($"Dates.{weekName}", startDate);
    await _habitCollection.UpdateManyAsync(filter, update);
  }

  public async Task<Habit> GetCurrentUserSchedule(string userId)
  {
    return await _habitCollection.Find(u => u.UserId == userId).FirstOrDefaultAsync();
  }

  public async Task UpdateFieldAsync(string userId, string dayOfWeek, string weekName, string activityName,
    bool completedValue)
  {
    var filter = Builders<Habit>.Filter.And(
      Builders<Habit>.Filter.Eq(x => x.UserId, userId),
      Builders<Habit>.Filter.ElemMatch($"{dayOfWeek}.{weekName}",
        Builders<Activity>.Filter.Eq(y => y.ActivityName, activityName))
    );

    var update = Builders<Habit>.Update.Set($"{dayOfWeek}.{weekName}.$.Completed", completedValue);

    await _habitCollection.UpdateOneAsync(filter, update);
  }


  //Not in use

  public async Task AddEmptyWeek(string userId, string dayOfWeek, string customName)
  {
    var filter = Builders<Habit>.Filter.Eq(x => x.UserId, userId);
    var update = Builders<Habit>.Update.Set($"{dayOfWeek}.{customName}", new List<Activity>());

    await _habitCollection.UpdateOneAsync(filter, update);
  }

  public async Task<List<Habit>> GetAsync()
  {
    return await _habitCollection.Find(_ => true).ToListAsync();
  }

  public async Task RemoveAsync(string userId)
  {
    await _habitCollection.DeleteOneAsync(x => x.UserId == userId);
  }

  public async Task DeleteAllDocumentsAsync()
  {
    var filter = Builders<Habit>.Filter.Empty;
    await _habitCollection.DeleteManyAsync(filter);
  }
}
