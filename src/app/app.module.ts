import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { NavbarComponent } from './pages/dashboard/navbar/navbar.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { FooterComponent } from './pages/dashboard/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SamplesComponent } from './pages/samples/samples/samples.component';
import { SampleDetailsComponent } from './pages/samples/sample-details/sample-details.component';
import { SampleDetailComponent } from './pages/dashboard/samples/sample-detail/sample-detail.component';

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
        SampleDetailsComponent,
        SampleDetailComponent
     ],
    imports:[
        BrowserModule,
        AppRoutingModule
    ],
    providers : [],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
