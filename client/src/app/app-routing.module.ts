import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EventDetailsPublicComponent } from './event/event-details-public/event-details-public.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { GenerateEventComponent } from './event/generate-event/generate-event.component';
import { UserHomeComponent } from './event/user-home/user-home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/role/admin.guard';
import { SuperAdminGuard } from './guards/role/super-admin.guard';
import { UserGuard } from './guards/role/user.guard';
import { HomeComponent } from './home/home.component';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user/dashboard',
    component: UserHomeComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminHomeComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'super/dashboard',
    component: SuperAdminHomeComponent,
    canActivate: [AuthGuard, SuperAdminGuard],
  },
  {
    path: 'event/edit/:eventId',
    component: EditEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event/create',
    component: GenerateEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event/details/general/:eventId',
    component: EventDetailsPublicComponent,
  },
  {
    path: 'event/details/:eventId',
    component: EventDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event/my-events',
    component: AdminEventsComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
