import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/modules/core.module';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from './../shared/modules/prime-ng.module';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [ TicketsComponent, TicketDetailsComponent ],
	imports: [
		CommonModule,
		TicketsRoutingModule,
		PrimeNgModule,
		TranslateModule,
		CoreModule
	]
})
export class TicketsModule {}
