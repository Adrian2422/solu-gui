import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import ITicketData from '../interfaces/ITicketData';
import { TicketsService } from './../services/tickets.service';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-ticket-details',
	templateUrl: './ticket-details.component.html',
	styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
	private ticketId!: number;
	private ticketData!: ITicketData;
	public formGroup!: FormGroup;

	constructor(
		private readonly ticketsService: TicketsService,
		private readonly commonService: CommonService,
		private readonly route: ActivatedRoute,
		private readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap) => {
			this.ticketId = Number(paramMap.get('id'));

			this.ticketsService
				.getTicketDataById(this.ticketId)
				.pipe(
					untilDestroyed(this),
					tap((ticketData) => {
						this.ticketData = ticketData;
					}),
					tap(() => {
						this.initializeForm();
						this.disableAllFields();
					})
				)
				.subscribe();
		});
	}

	private initializeForm(): void {
		const { title, description, type, priority, productId } = this.ticketData;

		this.formGroup = new FormGroup({
			title: new FormControl(title, []),
			description: new FormControl(description, []),
			type: new FormControl(type, []),
			priority: new FormControl(priority, []),
			productId: new FormControl(productId, [])
		});
	}

	public disableAllFields(): void {
		Object.keys(this.formGroup.controls).forEach((key) => {
			this.formGroup.get(key)?.disable();
		});
	}

	public enableAllFields(): void {
		Object.keys(this.formGroup.controls).forEach((key) => {
			this.formGroup.get(key)?.enable();
		});
	}
}
