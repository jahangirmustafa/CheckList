import { Component, OnInit, EventEmitter, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthService } from '../../common/auth/auth.service';
import { ChecklistService } from '../../services/checklist.service';
import { HeadingModel } from '../../common/models/heading.model';
import { QuestionModel } from '../../common/models/question.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.scss']
})
export class CreateChecklistComponent implements OnInit {
  @Output() backToCheckList = new EventEmitter();
  @Input() detail: any;

  modalRef: BsModalRef;
  
  @ViewChild('createStartUp') public createStartUp: ModalDirective;
  @ViewChild('editStartUp') public editStartUp: ModalDirective;
  @ViewChild('questionWindow') public questionWindow: ModalDirective;
  @ViewChild('headingWindow') public headingWindow: ModalDirective;
  questionHeading: string = 'Add Question';
  headerHeading: string = 'Add Headings';

  createChecklistForm: FormGroup;
  editChecklistForm: FormGroup;
  questionForm: FormGroup;
  headingForm: FormGroup;
  headingModel: HeadingModel;
  questionModel: QuestionModel;

  headingData: any[];
  questionData: any[];
  headingTypes: any[] = [{ id: 1, text: 'Main Heading' }, { id: 2, text: 'Sub Heading' }, { id: 3, text: 'Sub of Sub Heading' }];
  subAdminList: any[];

  mainHeading: any[];
  subHeading: any[];
  subOfSubHeading: any[];

  itemToDeleteId: number;


  constructor(private formBuilder: FormBuilder, private checklistService: ChecklistService, private modalService: BsModalService, private userService: UserService,) { }

  ngOnInit() {
    this.createChecklistForm = this.createForm();
    this.editChecklistForm = this.editForm();

    this.questionModel = new QuestionModel({});
    this.questionForm = this.createQuestionForm();

    this.headingModel = new HeadingModel({});
    this.headingForm = this.createHeadingForm();    
   
    if (this.detail.id > 0) {
      this.loadHeading(this.detail.id);
      this.loadQuestions(this.detail.id);
    }

    this.loadSubAdmin();
  }

  ngAfterViewInit() {
    if (this.detail.id == 0) {
      this.createStartUp.show();
    }
  }

  onToBack(): void {
    this.backToCheckList.emit('');
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.itemToDeleteId = id; 
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  
  confirmDecline(): void {   
    this.modalRef.hide();
    this.itemToDeleteId = 0;
  }

  closeStartup() {
    this.createStartUp.hide();
    this.onToBack();
  }


   /*** Checklist Region ***/

  createForm() {
    return this.formBuilder.group({
      hubName: ['', Validators.required],
      heading: ['', Validators.required],
      userSubAdmin: [null]
    });
  }

  editForm() {
    return this.formBuilder.group({
      hubName: [this.detail.hubName],
      isActive: [this.detail.isActive],
      userSubAdmin: [this.detail.subAdminId]
    });
  }  

  createChecklist() {
    let formData = this.createChecklistForm.getRawValue();
    let data = { hubName: formData.hubName, heading: formData.heading, subAdminId: formData.userSubAdmin };
   
    this.checklistService.createChecklist(data).subscribe(
      (res) => {       
        this.createStartUp.hide();
        this.detail = res.json();
        this.loadHeading(this.detail.id);
      },
      (err) => {       
      }
    );
  }

  showEditChecklist() {    
    this.editChecklistForm = this.editForm();
    this.editStartUp.show();
  }

  updateChecklist() {
    let formData = this.editChecklistForm.getRawValue();
    let data = { hubName: formData.hubName, id: this.detail.id, isActive: formData.isActive, subAdminId: formData.userSubAdmin  };

    this.checklistService.updateChecklist(data).subscribe(
      (res) => {
        this.editStartUp.hide();
        this.detail = res.json();
      },
      (err) => {
      }
    );
  }


  loadSubAdmin() {
    this.userService.getSubAdmin().subscribe((res) => {
      this.subAdminList = res;
    });
  }

  /*** End of Checklist Region ***/



   /*** Heading Region ***/

  createHeadingForm() {
    return this.formBuilder.group({
      headingType: [this.headingModel.headingTypeId],
      content: [this.headingModel.content]
    });
  }

  loadHeading(id) {
    this.checklistService.getHeaderByChecklistId(id).subscribe(
      (res) => {
        this.headingData = res;
      },
      (err) => {
      }
    );
  }  

  addHeading() {
    this.headingModel = new HeadingModel({});
    this.headingModel.headingTypeId = 1;
    this.headingForm = this.createHeadingForm();
    this.headerHeading = 'Add Headings';
    this.headingWindow.show();
  }

  createHeading() {
    let formData = this.headingForm.getRawValue();    
    let data = {id: this.headingModel.id, checkListId: this.detail.id, content: formData.content, headingType: formData.headingType };

    this.checklistService.addHeading(data).subscribe(
      (res) => {
        this.headingWindow.hide();
        this.loadHeading(this.detail.id);
      },
      (err) => {
      }
    );
  }  

  editHeading(item) {
    this.headerHeading = 'Edit Headings';
    this.headingModel = item;
    this.headingModel.headingTypeId = this.getHeadingId(this.headingModel.headingType);
    this.headingForm = this.createHeadingForm();   
    this.headingWindow.show();
  }
   /*** End of Heading Region ***/



  /*** Question Region ***/ 

  createQuestionForm() {
    return this.formBuilder.group({
      content: [this.questionModel.content],
      headerText: [this.questionModel.headerText],
      footerText: [this.questionModel.footerText],
      mainHeading: [this.questionModel.mainHeadingId],
      subHeading: [this.questionModel.subHeadingId],
      subOfSubHeading: [this.questionModel.subOfSubHeadingId],      
      option1: [this.questionModel.option1],
      option2: [this.questionModel.option2],
      option3: [this.questionModel.option3],
      option4: [this.questionModel.option4],
      option5: [this.questionModel.option5],
      option6: [this.questionModel.option6]      
    });
  }

  loadQuestions(id) {
    this.checklistService.getQuestions(id).subscribe(
      (res) => {
        this.questionData = res;
      },
      (err) => {
      }
    );
  }

  addQuestion() {
    this.questionHeading = 'Add Questions';
    this.questionModel = new QuestionModel({});
    this.questionForm = this.createQuestionForm();
    this.loadHeadingTypes(this.detail.id);
    this.questionWindow.show();
  }

  createQuestion() {
    let formData = this.questionForm.getRawValue();
    let data = { id: this.questionModel.id, checkListId: this.detail.id, content: formData.content,
      mainHeadingId: formData.mainHeading, subHeadingId: formData.subHeading, subOfSubHeadingId: formData.subOfSubHeading,
      option1: formData.option1, option2: formData.option2, option3: formData.option3, option4: formData.option4, option5: formData.option5,
      option6: formData.option6, headerText: formData.headerText, footerText: formData.footerText
    };

    this.checklistService.saveQuestion(data).subscribe(
      (res) => {
        this.questionWindow.hide();
        this.loadQuestions(this.detail.id);
      },
      (err) => {
      }
    );
  }

  editQuestion(item) {
    this.questionHeading = 'Edit Questions';
    this.loadHeadingTypes(this.detail.id);
    this.questionModel = item;
    this.questionForm = this.createQuestionForm();    
    this.questionWindow.show();
  }

  loadHeadingTypes(id) {
    this.checklistService.getHeadingByType(id).subscribe(
      (res) => {
        this.mainHeading = res.mainHeading;
        this.subHeading = res.subHeading;
        this.subOfSubHeading = res.subOfSubHeading;
      },
      (err) => {
      }
    );
  }

  questionDelete() {
    this.checklistService.deleteQuestions(this.itemToDeleteId).subscribe(
      (res) => {
        this.confirmDecline();
        this.loadQuestions(this.detail.id);
      },
      (err) => {
      }
    );
  }
  

  /*** End of Question Region ***/


  /*** Helper methods ***/
  getHeadingId(val): number {   
    if (val == 'MainHeading')
      return 1;
    else if (val == 'SubHeading')
      return 2;
    else if (val == 'SubOfSubHeading')
      return 3;
  }

}
