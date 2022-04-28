import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:LayoutComponent},
  {path:'**', component:NotFoundComponent}
  
  ];

  @NgModule({
    imports:[RouterModule.forRoot(routes, {useHash:true})],
    exports:[RouterModule]
  })

export class AppRoutingModule { }
