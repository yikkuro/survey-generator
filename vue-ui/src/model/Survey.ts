import SurveyAnswer from '@/model/SurveyAnswer';

export default class Survey {
  public ID?: number;
  public question?: string;
  public answers: SurveyAnswer[] = [];
  constructor(params: any = {} as Survey) {
    try {
      if (params.ID === undefined) {
        throw new Error('no ID');
      }
      this.ID = params.ID;
      this.question = params.question;
      if (params.answers && params.answers.length > 0) {
        for (const answer of params.answers) {
          if (answer.text === undefined || answer.redirectID === undefined) {
            throw new Error('Answer do not have text/redirectID');
          }
          this.answers.push(new SurveyAnswer(answer.text, answer.redirectID));
        }
      }
    } catch (e) {
      throw e;
    }
  }
}
