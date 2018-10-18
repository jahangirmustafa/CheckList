import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../common/auth/auth.service';
import { CurrentUser } from '../../common/models/current-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.template.html'
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  config: any;
  currentUser: CurrentUser;

  constructor(config: AppConfig, private authService: AuthService) {    
    this.config = config.getConfig();
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
