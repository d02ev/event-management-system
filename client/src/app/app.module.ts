import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdminService } from './services/admin.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { GenerateEventComponent } from './event/generate-event/generate-event.component';
import { UserHomeComponent } from './event/user-home/user-home.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventDetailsPublicComponent } from './event/event-details-public/event-details-public.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    SuperAdminHomeComponent,
    GenerateEventComponent,
    UserHomeComponent,
    EditEventComponent,
    HomeComponent,
    EventDetailsComponent,
    EventDetailsPublicComponent,
    AdminEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, EventService, AdminService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }