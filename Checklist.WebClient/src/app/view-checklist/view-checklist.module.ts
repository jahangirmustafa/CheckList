import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { ButtonsModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';
import { SignaturePadModule } from 'angular2-signaturepad';

import { ChecklistService } from '../services/checklist.service';
import { ViewChecklistComponent } from './view-checklist.component';
import { ChecklistAnswerService } from '../services/checklist-answer.service';
import { SignatureFieldComponent } from '../common/signature-field/signature-field.component';

@NgModule({
  declarations: [
    SignatureFieldComponent,
    ViewChecklistComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    DataTableModule,
    ModalModule,
    NgSelectModule,
    SignaturePadModule
    
  ],
  exports: [
    ReactiveFormsModule,
    ViewChecklistComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ChecklistService,
    BsModalService,
    ChecklistAnswerService
  ]
})
export class ViewChecklistModule {
  
}
