import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG  } from '@ng-select/ng-select';
import { ROUTES, authProviders } from './app.routes';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { SignaturePadModule } from 'angular2-signaturepad';

import { ErrorComponent } from './error/error.component';
import { AuthService } from './common/auth/auth.service';
import { AuthGuard } from './common/guards/auth.guard';
import { UserService } from './services/user.service';
//import { SignatureFieldComponent } from './common/signature-field/signature-field.component';


const APP_PROVIDERS = [
  AppConfig
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    SignaturePadModule
  ],
  providers: [
    UserService,

    APP_PROVIDERS,
    ...authProviders,
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Items not found'
      }
    }
  ]
})
export class AppModule {}
