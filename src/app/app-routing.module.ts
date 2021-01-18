import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path: 'registerform/:id', component:RegisterformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
