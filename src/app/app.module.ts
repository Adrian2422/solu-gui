import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './shared/modules/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './shared/components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from './shared/modules/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

const routes: Route[] = [
	{
		path: 'users',
		loadChildren: () =>
			import('./users/users.module').then((m) => m.UsersModule)
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		SidebarComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FlexLayoutModule,
		HttpClientModule,
		LayoutModule,
		PrimeNgModule,
		ComponentsModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
