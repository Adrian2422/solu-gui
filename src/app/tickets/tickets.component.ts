import { ETicketPriority } from './enums/ETicketPriority';
import { ETicketType } from './enums/ETicketType';
import ITicketColumn from './interfaces/ITicketColumn';
import ITicketData from './interfaces/ITicketData';
import ITicketPriorityBadge from './interfaces/ITicketPriorityBadge';
import ITicketTypeBadge from './interfaces/ITicketTypeBadge';
import { TicketsService } from './services/tickets.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.component.html',
	styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
	public columns: ITicketColumn[] = [];
	public dataSource: ITicketData[] = [];
	public priorities: ITicketPriorityBadge[] = [];
	public types: ITicketTypeBadge[] = [];

	constructor(
		private readonly ticketService: TicketsService,
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.columns = [
			{ field: 'id', header: 'TABLE.ID' },
			{ field: 'title', header: 'TABLE.TITLE' },
			{ field: 'priority', header: 'TABLE.PRIORITY' },
			{ field: 'asigneeId', header: 'TABLE.ASIGNEE-ID' },
			{ field: 'creatorId', header: 'TABLE.CREATOR-ID' },
			{ field: 'productId', header: 'TABLE.PRODUCT-ID' },
			{ field: 'type', header: 'TABLE.TYPE' }
		];

		this.priorities = [
			{ label: ETicketPriority.CRITICAL, value: 'critical' },
			{ label: ETicketPriority.HIGH, value: 'high' },
			{ label: ETicketPriority.NORMAL, value: 'normal' },
			{ label: ETicketPriority.LOW, value: 'low' },
			{ label: ETicketPriority.TRIVAL, value: 'trival' }
		];

		this.types = [
			{ label: ETicketType.ABSENCE, value: 'absence' },
			{ label: ETicketType.BUG, value: 'bug' },
			{ label: ETicketType.CRASH, value: 'crash' },
			{ label: ETicketType.TYPO, value: 'typo' },
			{ label: ETicketType.OTHER, value: 'other' }
		];

		this.ticketService
			.getTicketData()
			.pipe(
				tap((data) => {
					this.dataSource = data;
				})
			)
			.subscribe();
	}

	public showData(ticketId: number): void {
		this.router.navigate([`${ticketId}`], { relativeTo: this.route });
	}
}
