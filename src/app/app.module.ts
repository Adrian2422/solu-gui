import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../shared/shared/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent, LoginComponent ],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		PrimeNgModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
