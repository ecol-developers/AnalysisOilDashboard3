import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/dashboard/admin/clients/clients.component';
import { LogHistoriesComponent } from './pages/dashboard/admin/log-histories/log-histories.component';
import { UsersComponent } from './pages/dashboard/admin/users/users.component';
import { EquipmentsComponent } from './pages/dashboard/equipments/equipments.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { MainpageComponent } from './pages/dashboard/mainpage/mainpage.component';
import { SamplesComponent } from './pages/dashboard/samples/samples/samples.component';
import { MyLogHistoriesComponent } from './pages/dashboard/user/my-log-histories/my-log-histories.component';
import { MyProfileComponent } from './pages/dashboard/user/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent,canActivate:[LoginGuard]},
  {path:'dashboard', component:LayoutComponent, canActivate:[AuthGuard], children:[
    {path:'mainpage', component:MainpageComponent, canActivate:[AuthGuard]},
    {path:'samples', component:SamplesComponent, canActivate:[AuthGuard]},
    {path:'equipments', component:EquipmentsComponent, canActivate:[AuthGuard]},
    {path:'group/:id', component:SamplesComponent, canActivate:[AuthGuard]},
    {path:'user/myProfile', component:MyProfileComponent, canActivate:[AuthGuard]},
    {path:'user/myLogHistories', component:MyLogHistoriesComponent, canActivate:[AuthGuard]},
    {path:'admin/users', component:UsersComponent, canActivate:[AuthGuard]},
    {path:'admin/clients', component:ClientsComponent, canActivate:[AuthGuard]},
    {path:'admin/logHistories', component:LogHistoriesComponent, canActivate:[AuthGuard]}
  ]},
  {path:'**', component:NotFoundComponent}
 ];

  @NgModule({
    imports:[RouterModule.forRoot(routes, {useHash:true})],
    exports:[RouterModule]
  })

export class AppRoutingModule { }
