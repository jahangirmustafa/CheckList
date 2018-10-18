import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: 'another-page', loadChildren: '../another/another.module#AnotherModule' },
    { path: 'manage-checklist', loadChildren: '../checklist/checklist.module#ChecklistModule' },
    { path: 'manage-user', loadChildren: '../user/user.module#UserModule' },
    { path: 'checklist', loadChildren: '../user-checklist/user-checklist.module#UserChecklistModule' }
    
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
