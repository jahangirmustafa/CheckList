import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';

import { WidgetModule } from '../layout/widget/widget.module';
import { UserChecklistComponent } from './user-checklist.component';
import { ChecklistService } from '../services/checklist.service';
import { ViewChecklistModule } from '../view-checklist/view-checklist.module';

export const routes = [
  { path: '', component: UserChecklistComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    Ng2TableModule,
    DataTableModule,
    ViewChecklistModule
  ],
  declarations: [UserChecklistComponent],
  providers: [ChecklistService]
})
export class UserChecklistModule {
  static routes = routes;
}
