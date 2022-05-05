import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { MainpageComponent } from './pages/dashboard/mainpage/mainpage.component';
import { SamplesComponent } from './pages/dashboard/samples/samples/samples.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:LayoutComponent, children:[
    {path:'mainpage', component:MainpageComponent},
    {path:'samples', component:SamplesComponent}
    ]},
  {path:'**', component:NotFoundComponent}
 ];

  @NgModule({
    imports:[RouterModule.forRoot(routes, {useHash:true})],
    exports:[RouterModule]
  })

export class AppRoutingModule { }
