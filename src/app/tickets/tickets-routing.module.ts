import { NgModule } from '@angular/core';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TicketsComponent
	},
	{
		path: ':id',
		component: TicketDetailsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TicketsRoutingModule {}
