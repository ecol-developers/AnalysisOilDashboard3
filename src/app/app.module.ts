import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { NavbarComponent } from './pages/dashboard/shared/navbar/navbar.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { FooterComponent } from './pages/dashboard/shared/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SamplesComponent } from './pages/dashboard/samples/samples/samples.component';
import { SampleDetailComponent } from './pages/dashboard/samples/sample-detail/sample-detail.component';
import { MainpageComponent } from './pages/dashboard/mainpage/mainpage.component';
import { FixedpluginModule } from './pages/dashboard/shared/fixedplugin/fixedplugin.module';
import { FormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthconfigInterceptor } from './shared/authconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentsComponent } from './pages/dashboard/equipments/equipments.component';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SummarySampleTableComponent } from './components/mainpage/summary-sample-table/summary-sample-table.component';
import { SummarySampleDoughnutCahrtComponent } from './components/mainpage/summary-sample-doughnut-cahrt/summary-sample-doughnut-cahrt.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        NotFoundComponent,
        SamplesComponent,
        SampleDetailComponent,
        MainpageComponent,
        EquipmentsComponent,
        SummarySampleTableComponent,
        SummarySampleDoughnutCahrtComponent
     ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        FixedpluginModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TreeModule,
        TableModule,
        ButtonModule,
        ChartModule
    ],
    providers : [
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthconfigInterceptor,
            multi:true
        }
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
