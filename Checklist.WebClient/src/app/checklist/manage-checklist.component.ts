import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';

@Component({
  selector: 'app-manage-checklist',
  templateUrl: './manage-checklist.component.html',
  styleUrls: ['./manage-checklist.component.scss']
})
export class ManageChecklistComponent implements OnInit {
  data: any[];
  showCreateCheck: boolean = false;
  showChecklist: boolean = true;
  createDetail: any;

  constructor(private checklistService: ChecklistService) { }

  ngOnInit() {
    this.loadChecklist();
  }

  changeChecklistComponent(componentName: string): void { 
    if (componentName == 'checkList') {
      this.showCreateCheck = false;
      this.showChecklist = true;
      this.loadChecklist();

    } else if (componentName == 'create'){
      this.showCreateCheck = true;
      this.showChecklist = false;
      this.createDetail = { id: 0, hubName: ''};
    }
  }

  loadChecklist() {
    this.checklistService.getChecklist().subscribe((res) => {
      this.data = res;
    });
  }

  editChecklist(item) {
    this.createDetail = { id: item.id, hubName: item.hubName, isActive: item.isActive, subAdminId: item.subAdminId};
    this.showCreateCheck = true;
    this.showChecklist = false;
  }
}
