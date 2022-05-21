import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { UsersModule } from './users/users.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		loadChildren: (): Promise<DashboardModule> =>
			import('./dashboard/dashboard.module').then(
				(m: typeof import('./dashboard/dashboard.module')): DashboardModule =>
					m.DashboardModule
			)
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard],
		loadChildren: (): Promise<LoginModule> =>
			import('./login/login.module').then(
				(m: typeof import('./login/login.module')): LoginModule => m.LoginModule
			)
	},
	{
		path: 'users',
		canActivate: [AuthGuard],
		loadChildren: (): Promise<LoginModule> =>
			import('./users/users.module').then(
				(m: typeof import('./users/users.module')): UsersModule => m.UsersModule
			)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
