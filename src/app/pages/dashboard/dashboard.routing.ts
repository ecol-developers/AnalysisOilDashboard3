import { Routes } from "@angular/router";
import { MainpageComponent } from "./mainpage/mainpage.component";
import { SamplesComponent } from "./samples/samples/samples.component";

export const DashboardRoutes: Routes = [
    {
        path:'',
        children:[{path:'dashboard', component:MainpageComponent}]
    }, {
        path:'',
        children:[{path:'samples/tree', component:SamplesComponent}]
    }
] 