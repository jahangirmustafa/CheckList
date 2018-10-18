export class ChecklistAnswerModel {
  id: number;
  name: string;
  employementType: any;
  hrms: string;
  companyName: string;
  remarks: string;
  signature: string;

  constructor(model) {
    {
      this.id = model.id || 0;
      this.name = model.name || '';
      this.employementType = model.employementType || null;
      this.hrms = model.hrms || '';
      this.companyName = model.companyName || '';
      this.remarks = model.remarks || '';
      this.signature = model.signature || '';
    }
  }
}
