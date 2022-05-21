import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [ TranslateModule, ReactiveFormsModule ],
	exports: [ TranslateModule, ReactiveFormsModule ]
})
export class CoreModule {}
