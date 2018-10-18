import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { WidgetModule } from '../layout/widget/widget.module';
import { ResultService } from '../services/result.service';
import { ViewChecklistModule } from '../view-checklist/view-checklist.module';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    WidgetModule,
    DataTableModule,
    Ng2TableModule,
    ViewChecklistModule,
    DataTablesModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalModule

  ],
  declarations: [DashboardComponent],
  providers: [ResultService]
})
export class DashboardModule {
  static routes = routes;
}
