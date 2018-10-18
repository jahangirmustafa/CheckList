export class HeadingModel {
  id: number;
  checkListId: number;
  content: string;
  headingType: string;
  headingTypeId: number; 
  

  constructor(model) {
    {
      this.id = model.id || 0;
      this.checkListId = model.checkListId || '';
      this.content = model.content || '';
      this.headingType = model.headingType || '';
      this.headingTypeId = model.headingTypeId || 0;
     
    }
  }
}
