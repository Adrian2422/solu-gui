import { TicketDetailsComponent } from './ticket-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TicketDetailsComponent', () => {
	let component: TicketDetailsComponent;
	let fixture: ComponentFixture<TicketDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketDetailsComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TicketDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});