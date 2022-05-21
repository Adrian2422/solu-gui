import { CommonModule } from '@angular/common';
import { CoreModule } from './../shared/modules/core.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from './../shared/modules/prime-ng.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [ CommonModule, PrimeNgModule, CoreModule ]
})
export class LoginModule {}
