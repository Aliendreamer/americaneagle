namespace backend.Models;

public class SurveyResponse {
    public int? id { get; set; }
    public string UserName { get; set; }
    public int SurveyId { get; set; }
    public string Feedback { get; set; }
}
