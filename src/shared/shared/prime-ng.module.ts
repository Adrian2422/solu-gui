import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [ InputTextModule, ButtonModule, CheckboxModule ],
	exports: [ InputTextModule, ButtonModule, CheckboxModule ]
})
export class PrimeNgModule {}
