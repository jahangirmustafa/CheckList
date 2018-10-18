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
import { ManageChecklistComponent } from './manage-checklist.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { ChecklistService } from '../services/checklist.service';


export const routes = [
  { path: '', component: ManageChecklistComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ManageChecklistComponent,
    CreateChecklistComponent    
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
    RouterModule.forChild(routes),
    ModalModule,
    NgSelectModule
  ],
  exports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ChecklistService, BsModalService]
})
export class ChecklistModule {
  static routes = routes;
}
