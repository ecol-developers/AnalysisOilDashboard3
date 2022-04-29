import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { MainpageComponent } from './pages/dashboard/mainpage/mainpage.component';
import { SamplesComponent } from './pages/dashboard/samples/samples/samples.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'', component:LayoutComponent, children:[
    {path:'', loadChildren:() => import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule)}
  ]},
  {path:'login', component:LoginComponent},
  {path:'**', component:NotFoundComponent}
  ];

  @NgModule({
    imports:[RouterModule.forRoot(routes, {useHash:true})],
    exports:[RouterModule]
  })

export class AppRoutingModule { }
