import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
	imports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule,
		PasswordModule,
		SidebarModule,
		TableModule,
		TooltipModule,
		DropdownModule,
		PanelModule
	],
	exports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule,
		PasswordModule,
		SidebarModule,
		TableModule,
		TooltipModule,
		DropdownModule,
		PanelModule
	]
})
export class PrimeNgModule {}
