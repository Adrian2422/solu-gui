import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../shared/modules/components.module';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: '',
		component: UsersComponent
	},
	{
		path: 'user-profile',
		component: UserProfileComponent
	}
];

@NgModule({
	declarations: [ UsersComponent, UserProfileComponent ],
	imports: [ CommonModule, ComponentsModule, RouterModule.forChild(routes) ]
})
export class UsersModule {}
