using backend.Models;
using System.Text;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
public class ApiController : ControllerBase
{
    private static List<Survey> Surveys = new List<Survey>()
    {
       new Survey(){id=1,Name="Sample Form"},
       new Survey(){id=2,Name="Another Sample Form with same Id",Description="Some description"},
       new Survey(){ id=3,Name="Yet Another Sample Form with same Id"}

    };


    private static List<SurveyResponse> SurveyResponses = new List<SurveyResponse>()
    {
       new SurveyResponse(){id=1,SurveyId=1,UserName="Test Name1",Feedback="Test Feedback1"},
       new SurveyResponse(){id=2,SurveyId=1,UserName="Test Name2",Feedback="Test Feedback2"},
       new SurveyResponse(){id=3,SurveyId=2,UserName="Test Name3",Feedback="Test Feedback3"}
    };

    private readonly ILogger<ApiController> _logger;

    public ApiController(ILogger<ApiController> logger)
    {
        _logger = logger;
    }

    [HttpGet("api/surveys")]
    public IEnumerable<Survey> GetSurveys()
    {
        return Surveys;
    }

    [HttpGet("api/survey/{id}")]
    public Survey GetSurvey(int id)
    {
        return Surveys.FirstOrDefault(survey => survey.id == id);
    }


    [HttpPost("api/response/{id}")]
    public ActionResult SurveyResponse(int id,[FromForm]SurveyResponse surveyResponse)
    {
        if (surveyResponse == null)
        {
            return BadRequest("no survey response provided");
        }
        surveyResponse.id = SurveyResponses.Last().id+1;
        SurveyResponses.Add(surveyResponse);
        return Ok("created");
    }

    [HttpGet("api/response/{id}")]
    public ActionResult SurveyResponseList(int id)
    {
        StringBuilder sbRtn = new StringBuilder();

        // If you want headers for your file
        var header = string.Format("\"{0}\",\"{1}\",\"{2}\"",
                                   "id",
                                   "UserName",
                                   "Feedback"
                                  );
        sbRtn.AppendLine(header);
        var responses = SurveyResponses.FindAll(surveyResponse => surveyResponse.SurveyId == id);
        foreach (var item in responses)
        {
            var listResults = string.Format("\"{0}\",\"{1}\",\"{2}\"",
                                              item.id,
                                              item.UserName,
                                              item.Feedback
                                             );
            sbRtn.AppendLine(listResults);
        }
        return File(new UTF8Encoding().GetBytes(sbRtn.ToString()), "text/csv", "responses.csv");
    }


    [HttpPost("api/survey")]
    public IActionResult AddSurvey([FromForm]CreateSurvey newSurvey)
    {
        if (newSurvey==null)
        {
            return BadRequest("no survey object provided");
        }
        var  survey = new Survey() { Description = newSurvey.Description, Name = newSurvey.Name, id = Surveys.Last().id + 1 };
        Surveys.Add(survey);
        return Ok("survey added");
    }

    [HttpPatch("api/survey/edit/{id}")]
    public IActionResult EditSurvey(int id,[FromForm] CreateSurvey newData)
    {
        if (newData == null)
        {
            return BadRequest("no survey data provided");
        }
        var surveyIndex = Surveys.FindIndex(survey => survey.id == id);
        if(surveyIndex == -1)
        {
            return BadRequest("survey not found");
        }
        Surveys[surveyIndex].Name = newData.Name;
        Surveys[surveyIndex].Description = newData.Description;
        return Ok("survey added");
    }


    [HttpDelete("api/survey/{id}")]
    public IActionResult DeleteSurvey(int? id)
    {
        if (id == null)
        {
            return BadRequest("no survey data provided");
        }
        var surveyIndex = Surveys.FindIndex(survey => survey.id == id);
        if (surveyIndex == -1)
        {
            return BadRequest("survey not found");
        }
        Surveys.RemoveAt(surveyIndex);
        return Ok("survey added");
    }
}
