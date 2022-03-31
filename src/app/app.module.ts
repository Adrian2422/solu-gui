import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../shared/modules/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HeaderComponent,
		SidebarComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		PrimeNgModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
