import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { HttpClientModule } from  '@angular/common/http';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopnavComponent,
    FooterComponent,
    ProductManagementComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
