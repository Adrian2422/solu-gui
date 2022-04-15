import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
	imports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule,
		PasswordModule,
		SidebarModule
	],
	exports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule,
		PasswordModule,
		SidebarModule
	]
})
export class PrimeNgModule {}
