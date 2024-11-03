import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  {

    path:'',
    canActivate:[authGuard],
    component:BlankLayoutComponent,children:[

      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home', component:HomeComponent,title:'Home' }
  ] },
  {path:'',component:AuthLayoutComponent,children:[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'register',component:RegisterComponent,title:'Register'}

  ]},


  {path:'**',component:NotFoundComponent,title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
