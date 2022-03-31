import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@NgModule({
	imports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule
	],
	exports: [
		InputTextModule,
		ButtonModule,
		CheckboxModule,
		MenuModule,
		RippleModule
	]
})
export class PrimeNgModule {}
