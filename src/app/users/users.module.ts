import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../shared/modules/components.module';
import { CoreModule } from './../shared/modules/core.module';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from './../shared/modules/prime-ng.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
	declarations: [ UsersComponent, UserProfileComponent ],
	imports: [
		CommonModule,
		ComponentsModule,
		PrimeNgModule,
		CoreModule,
		UsersRoutingModule
	]
})
export class UsersModule {}
