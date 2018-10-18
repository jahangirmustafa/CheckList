import { Component, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../common/models/current-user.model';
import { ResultService } from '../services/result.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentUser: CurrentUser;
  data: any[];
  showUserChecklist: boolean = true;
  showViewChecklist: boolean = false;
  checklistDetail: any;

  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  hubData: any[];
  employementTypeData: any[] = [{ id: 1, text: 'Permanent Staff' }, { id: 2, text: 'Contractor' }];
  yearData: any[] = [{ id: '2018', text: '2018' }, { id: '2019', text: '2019' }, { id: '2019', text: '2020' }, { id: '2021', text: '2021' }, { id: '2022', text: '2022' }, { id: '2023',text: '2023' },
    { id: '2024', text: '2024' }, { id: '2025', text: '2025' }, { id: '2026', text: '2026' }, { id: '2027', text: '2027' }, { id: '2028', text: '2028' }, { id: '2029', text: '2029' }, { id: '2030',text: '2030' }];

  filterForm: FormGroup;
  @ViewChild('confirmWindow') public confirmWindow: ModalDirective;
  itemToDelete: any;
  deleteMessage: string = 'Are you sure to delete?';

  constructor(private authService: AuthService, private userService: UserService, private router: Router,
    private resultService: ResultService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {  
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser.role == 'User') {
      this.router.navigate(['/app/checklist']);
    }
    else {
      this.filterForm = this.createForm();
      this.loadResultTable();
      this.loadResult();
      this.loadHubItems();
    }    
  }

  ngAfterViewInit(): void {
   
  }

  ngOnDestroy(): void {    
   // $.fn['dataTable'].ext.search.pop();
  }

  loadResult() {
    this.resultService.getResult(null, null, null).subscribe((res) => {
      this.data = res;
      this.loadResultTable();
      this.dtTrigger.next();
    });
  }

  changeChecklistComponent(componentName: string): void {
    if (componentName == 'userCheckList') {
      this.showUserChecklist = true;
      this.showViewChecklist = false;      
    }
  }

  openViewChecklist(item) {
    this.checklistDetail = { id: item.checkListId, resultId: item.id };
    this.showUserChecklist = false;
    this.showViewChecklist = true;
  }  

  loadResultTable(): void {
    this.dtOptions = {
      data: this.data,     
      searching: false,
      ordering: false,
      bInfo: false,
      dom: 'Bfrtip',    
      buttons: [        
        {
          extend: 'excel', text: 'Export Excel',
          exportOptions: {
            columns: [0, 1, 2, 3, 4]
          }
        },
        {
          extend: 'pdf', text: 'Export PDF',
          exportOptions: {
            columns: [0, 1, 2, 3,4]
          }
        }        
      ]
    };
  }


  filter() {
    let formData = this.filterForm.getRawValue();
    this.resultService.getResult(formData.hubName, formData.year, formData.employementType).subscribe((res) => {
      this.data = res;      
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        
        dtInstance.data.bind(this.data);
      });
    });   
  }

  createForm() {
    return this.formBuilder.group({
      hubName: [null],
      employementType: [null],
      year: [null]
     
    });
  }

  loadHubItems() {
    this.resultService.getHubItems().subscribe((res) => {
      this.hubData = res;
    });
  }

  confirmDelete(item) {
    this.itemToDelete = item;
    this.confirmWindow.show();
  }

  deleteResult() {
    this.resultService.deleteResult(this.itemToDelete.id).subscribe((res) => {
      this.filter();
      this.confirmWindow.hide();
    });
  }

}


