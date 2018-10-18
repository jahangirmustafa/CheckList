import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ChecklistAnswerModel } from '../common/models/checklist-answer.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';
import { ChecklistAnswerService } from '../services/checklist-answer.service';
import { SignatureFieldComponent } from '../common/signature-field/signature-field.component';
import { CurrentUser } from '../common/models/current-user.model';

@Component({
  selector: 'view-checklist',
  templateUrl: './view-checklist.component.html',
  styleUrls: ['./view-checklist.component.scss']
})
export class ViewChecklistComponent implements OnInit {
  currentUser: CurrentUser;
  data: any;
  resultData: any;
  @Output() backToCheckList = new EventEmitter();
  @Input() detail: any;
  //checklistId: number;
  employementTypeData: any[] = [{ id: 1, text: 'Permanent Staff' }, { id: 2, text: 'Contractor' }];
  model: ChecklistAnswerModel;
  checklistForm: FormGroup;
  showCompany: boolean = false;
  showHRMS: boolean = false;
  showContractText: boolean = false;
  dateNow: Date;
  isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder, private checklistAnswerService: ChecklistAnswerService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.dateNow = new Date();
    this.model = new ChecklistAnswerModel({});
    this.checklistForm = this.createForm();
    
    if (this.currentUser.role == 'User') {
      this.loadQuestions(this.detail.id);
    }
    else if (this.currentUser.role == 'Admin' || this.currentUser.role == 'SubAdmin') {
      this.isAdmin = true;
      this.loadResultAnswer(this.detail.id, this.detail.resultId);
    }
  }

  onToBack(): void {
    this.backToCheckList.emit('');
  }

  loadQuestions(checklistId) {
    this.checklistAnswerService.getChecklistQuestion(checklistId).subscribe((res) => {
      this.data = res;
      if (this.currentUser.role == 'User') {        
        this.addQuestionToControl();
      }
      else if (this.currentUser.role == 'Admin' || this.currentUser.role == 'SubAdmin') {
        this.setResultData();
      }
    });
  }

  loadResultAnswer(checklistId, resultId) {
    this.checklistAnswerService.getResultAnswer(checklistId, resultId).subscribe((res) => {
      this.resultData = res;
      this.loadQuestions(this.detail.id);
    });
  }


  setResultData() {
    let data = this.resultData;
    this.model = data.result;
    this.checklistForm = this.createForm();

    this.sigs.first.writeValue(data.result.signatureBase64);
    this.dateNow = new Date(data.result.submitOn);

    if (data.result.employementType == 2) {
      this.showCompany = true;
      this.showHRMS = false;
      this.showContractText = false;
    }
    else if (data.result.employementType == 1) {
      this.showHRMS = true;
      this.showCompany = false;
      this.showContractText = true;
    }

    for (let item of data.answers) {
      this.checklistForm.addControl(item.question.id, new FormControl(item.userAnswer, Validators.required));
    }

  }

  //setResultData() {
  //  let data = this.resultData;
  //  this.model = data.result;
  //  this.checklistForm = this.createForm();
    
  //  this.sigs.first.writeValue(data.result.signatureBase64);
  //  this.dateNow = new Date(data.result.submitOn);
  //  //this.model.HRMS = data.result.hrms;

  //  if (data.result.employementType == 1) {
  //    this.showCompany = false;
  //    //this.showHRMS = false;
  //    this.showContractText = false;
  //  }
  //  else if (data.result.employementType == 2) {
  //    //this.showHRMS = true;
  //    this.showCompany = true;
  //    this.showContractText = true;
  //  }    

  //  for (let item of data.answers) {
  //    this.checklistForm.addControl(item.question.id, new FormControl(item.userAnswer, Validators.required));
  //  }

  //}

  createForm() {
    return this.formBuilder.group({
      name: [this.model.name],
      employementType: [this.model.employementType],
      companyName: [this.model.companyName],
      HRMS: [this.model.hrms],
      remarks: [this.model.remarks],
      signature: [this.model.signature, Validators.required] 
     });
  }

  addQuestionToControl() {
    let control = this.checklistForm.controls;    
    for (let question of this.data.questions) {
      this.checklistForm.addControl(question.id, new FormControl('', Validators.required));
    }
  }

  postChecklist() {
    let formData = this.checklistForm.getRawValue();
    let answerData = [];
    for (let item in formData) {      
      if (!isNaN(parseInt(item))) {
        let answer = {};
        answer["id"] = item;
        answer["answer"] = formData[item]
        answerData.push(answer);
      }
    }

    let dataToPost = {
      checkListId: this.detail.id, name: formData.name, employementType: formData.employementType, userSignature: this.sigs.first.signature,
      companyName: formData.companyName, HRMS: formData.HRMS, answerItems: answerData, remarks: formData.remarks
    };

    this.checklistAnswerService.saveChecklistAnswer(dataToPost).subscribe(
      (res) => {
        if (res.ok)
          this.onToBack();
      },
      (err) => {
      }
    );
  }

  onEmployementChange($event) {
    if ($event != undefined) {
      if ($event.id == 2) {
        this.showCompany = true;
        this.showHRMS = false;
        this.showContractText = false;
        this.checklistForm.get('HRMS').setValue('');
        this.checklistForm.get('HRMS').clearValidators();
        this.checklistForm.get('HRMS').updateValueAndValidity();
      }
      else if ($event.id == 1) {
        this.showHRMS = true;
        this.showCompany = false;
        this.showContractText = true;
        this.checklistForm.get('companyName').setValue('');
        this.checklistForm.get('companyName').clearValidators();
        this.checklistForm.get('companyName').updateValueAndValidity();
      }
    } else {
      this.showHRMS = false;
      this.showCompany = false;
      this.showContractText = false;
    }
  }

  //onEmployementChange($event) {
  //  if ($event != undefined) {
  //    if ($event.id == 1) {
  //      this.showCompany = false;
  //      this.showContractText = false;
  //      this.checklistForm.get('companyName').clearValidators();
  //      this.checklistForm.get('companyName').updateValueAndValidity();    
  //    }
  //    else if ($event.id == 2) {
  //      this.showCompany = true;
  //      this.showContractText = true;      
  //    }
  //  } else {
  //    this.showCompany = false;
  //    this.showContractText = false;
  //  }
  //} 


  /***** User Signature *****/

  public secondSig: SignatureFieldComponent;
  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer') public sigContainer: QueryList<ElementRef>;

  public ngAfterViewInit() {
    this.secondSig = this.sigs.find((sig, index) => index === 1);
    this.beResponsive();
    this.setOptions();
  }

  // set the dimensions of the signature pad canvas
  public beResponsive() {   
    this.size(this.sigContainer.first, this.sigs.first);    
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
    //this.sigs.first.signaturePad.set('backgroundColor', 'rgb(255,255,255)');
    //this.secondSig.signaturePad.set('penColor', 'rgb(255, 255, 0)');
    //this.secondSig.signaturePad.set('backgroundColor', 'rgb(0, 0, 255)');
    //this.secondSig.signaturePad.clear(); // clearing is needed to set the background colour
  }  

  public clear() {
    this.sigs.first.clear();    
  }

  /**** End ****/


}
