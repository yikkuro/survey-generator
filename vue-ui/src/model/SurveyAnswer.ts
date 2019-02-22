export default class SurveyAnswer {
  public text: string;
  public redirectID: number;
  constructor(text: string, redirectID: number) {
    this.text = text;
    this.redirectID = redirectID;
  }
}
