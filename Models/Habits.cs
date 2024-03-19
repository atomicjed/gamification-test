using System.Runtime.InteropServices.JavaScript;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace gamification_project.Models;

public class Habit
{

  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }


  [BsonElement("UserId")] public string UserId { get; set; } = null!;
  [BsonElement("Dates")]
  public Dictionary<string, DateTime> Dates { get; set; } = new Dictionary<string, DateTime>();
  [BsonElement("Monday")]
  public Dictionary<string, List<Activity>> Monday { get; set; } = new Dictionary<string, List<Activity>>();
  [BsonElement("Tuesday")]
  public Dictionary<string, List<Activity>> Tuesday { get; set; } = new Dictionary<string, List<Activity>>();
  [BsonElement("Wednesday")]
  public Dictionary<string, List<Activity>> Wednesday { get; set; } = new Dictionary<string, List<Activity>>();
  [BsonElement("Thursday")]
  public Dictionary<string, List<Activity>> Thursday { get; set; } = new Dictionary<string, List<Activity>>();
  [BsonElement("Friday")]
  public Dictionary<string, List<Activity>> Friday { get; set; } = new Dictionary<string, List<Activity>>();
  [BsonElement("Saturday")]
  public Dictionary<string, List<Activity>> Saturday { get; set; } = new Dictionary<string, List<Activity>>();
}


public class Activity
{
  [BsonElement("activityName")]
  public string ActivityName { get; set; }
  [BsonElement("completed")]
  public bool Completed { get; set; }
  public bool isForEveryWeek { get; set; }
}

public class AddWeekApiBody {
  public List<Activity> monday { get; set; }
  public List<Activity> tuesday { get; set; }
  public List<Activity> wednesday { get; set; }
  public List<Activity> thursday { get; set; }
  public List<Activity> friday { get; set; }
  public List<Activity> saturday { get; set; }
}

public class AddToAllWeeksApiBody
{
 // public string[] DaysOfWeek { get; set; }
  public string[] WeekKeys { get; set; }
  public Activity Activity { get; set; }
}
