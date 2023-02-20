import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { GenerateEventComponent } from './event/generate-event/generate-event.component';
import { UserHomeComponent } from './event/user-home/user-home.component';
import { SuperAdminGuard } from './guards/role/super-admin.guard';
import { HomeComponent } from './home/home.component';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'user/dashboard', component: UserHomeComponent },
  { path: 'admin/dashboard', component: AdminHomeComponent },
  { path: 'super/dashboard', component: SuperAdminHomeComponent },
  { path: 'event/edit/:eventId', component: EditEventComponent },
  { path: 'event/create', component: GenerateEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
