export default class AnswerTraceUnit {
  public QuestionID: number;
  public QuestionText: string;
  public AnswerID: number;
  public AnswerText: string;
  constructor(QuestionID: number, QuestionText: string, AnswerID: number, AnswerText: string) {
    this.QuestionID = QuestionID;
    this.QuestionText = QuestionText;
    this.AnswerID = AnswerID;
    this.AnswerText = AnswerText;
  }
}
