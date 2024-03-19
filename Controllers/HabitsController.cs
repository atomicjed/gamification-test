using gamification_project.Models;
using gamification_project.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gamification_project.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]

public class HabitsController : ControllerBase
{
  private readonly HabitsService _habitsService;

  public HabitsController(HabitsService habitsService)
  {
    _habitsService = habitsService;
  }

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    var allHabits = await _habitsService.GetAsync();

    if (allHabits.Any())
      return Ok(allHabits);

    return Ok(allHabits);
  }

  [HttpPost("{userId}/add-activity/{dayOfWeek}/{weekName}")]
  public async Task<IActionResult> AddActivity(string userId, string dayOfWeek, string weekName, [FromBody] Activity newHabit)
  {
    try
    {
      await _habitsService.AddActivity(userId, dayOfWeek, weekName, newHabit);

      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpPost("{userId}/add-activity-to-all-weeks/{dayOfWeek}/{isPreviousDay}")]
  public async Task<IActionResult> AddActivityToAllWeeks(string userId, string dayOfWeek, bool isPreviousDay, [FromBody] AddToAllWeeksApiBody body)
  {
    var weekKeys = body.WeekKeys;
    var newHabit = body.Activity;
    //var daysOfWeek = body.DaysOfWeek;
    try
    {
      await _habitsService.AddActivityToAllWeeks(userId, dayOfWeek, isPreviousDay, newHabit, weekKeys);

      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpGet("{userId}")]
  public async Task<IActionResult> GetCurrentUserSchedule(string userId)
  {
    var existingHabit = await _habitsService.GetCurrentUserSchedule(userId);

    if (existingHabit is null)
      return NotFound();

    return Ok(existingHabit);
  }

  [HttpPost("create-template/{userId}")]
  public async Task<IActionResult> Post(Habit habit, string userId)
  {
    await _habitsService.CreateAsync(habit, userId);
    return CreatedAtAction(nameof(Get), new { id = habit.Id }, habit);
  }

  [HttpGet("does-user-exist/{userId}")]
  public async Task<IActionResult> DoesUserExist(string userId)
  {
    var userExists = await _habitsService.DoesUserExist(userId);
    return Ok(userExists);
  }

  [HttpPut("{userId}/{dayOfWeek}/{weekName}/update-status/{activityName}/{completedValue}/")]
  public async Task<IActionResult> UpdateHabitStatus(string userId, string dayOfWeek, string weekName, string activityName,
    bool completedValue)
  {
    try
    {
      await _habitsService.UpdateFieldAsync(userId, dayOfWeek, weekName, activityName, completedValue);
      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"An error occured: {ex.Message}");
    }
  }

  [HttpPut("{userId}/{dayOfWeek}/{customName}/add-empty-week")]
  public async Task<IActionResult> AddEmptyWeek(string userId, string dayOfWeek, string customName)
  {
    try
    {
      await _habitsService.AddEmptyWeek(userId, dayOfWeek, customName);
      return Ok("Empty week added successfully.");
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpPut("{userId}/{weekName}/add-week/")]
  public async Task<IActionResult> AddWeek(string userId, string weekName, [FromBody] AddWeekApiBody bodyData)
  {
    try
    {
      await _habitsService.AddWeek(userId, weekName, bodyData);
      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpPut("{userId}/{weekName}/add-to-start-dates/{startDate}")]
  public async Task<IActionResult> AddStartDateForWeek(string userId, string weekName, DateTime startDate)
  {
    try
    {
      await _habitsService.AddStartDateForWeek(userId, weekName, startDate);
      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpDelete("/api/delete-user/{userId}")]
  public async Task<IActionResult> Delete(string userId)
  {
    var existingHabit = await _habitsService.GetCurrentUserSchedule(userId);

    if (existingHabit is null)
      return BadRequest();

    await _habitsService.RemoveAsync(userId);

    return NoContent();
  }

  [HttpDelete("deleteAll")]
  public async Task<IActionResult> DeleteAllDocuments()
  {
    try
    {
      await _habitsService.DeleteAllDocumentsAsync();
      return Ok("All documents deleted successfully.");
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"An error occurred: {ex.Message}");
    }
  }

}
