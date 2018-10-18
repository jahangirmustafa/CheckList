export class QuestionModel {
  id: number;  
  content: string;
  footerText: string;
  headerText: string;

  mainHeadingId: any;
  subHeadingId: any;
  subOfSubHeadingId: any;

  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  option6: string;
  
  constructor(model) {
    {
      this.id = model.id || 0;
      this.content = model.content || '';
      this.footerText = model.footerText || '';

      this.headerText = model.headerText || '';
      this.mainHeadingId = model.mainHeadingId || null;
      this.subHeadingId = model.subHeadingId || null;
      this.subOfSubHeadingId = model.subOfSubHeadingId || null;

      this.option1 = model.option1 || '';
      this.option2 = model.option2 || '';
      this.option3 = model.option3 || '';
      this.option4 = model.option4 || '';
      this.option5 = model.option5 || '';
      this.option6 = model.option6 || '';
      
    }
  }
}
