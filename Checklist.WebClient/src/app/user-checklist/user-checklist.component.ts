import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth/auth.service';
import { ChecklistService } from '../services/checklist.service';


@Component({
  selector: 'app-user-checklist',
  templateUrl: './user-checklist.component.html',
  styleUrls: ['./user-checklist.component.scss']
})
export class UserChecklistComponent implements OnInit {
  data: any[];
  showUserChecklist: boolean = true;
  showViewChecklist: boolean = false;
  checklistDetail: any;

  constructor(private checklistService: ChecklistService) { }

  ngOnInit() {
    this.loadChecklist();
  }

  changeChecklistComponent(componentName: string): void {
    if (componentName == 'userCheckList') {
      this.showUserChecklist = true;
      this.showViewChecklist = false;
      this.loadChecklist();
    }    
  }

  openViewChecklist(item) {
    this.checklistDetail = item;
    this.showUserChecklist = false;
    this.showViewChecklist = true;  
  }

  loadChecklist() {
    this.checklistService.getChecklistForUser().subscribe((res) => {
      this.data = res;
    });
  }


}
