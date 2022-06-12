import { HttpClient } from '@angular/common/http';
import ITicketData from '../interfaces/ITicketData';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TicketsService {
	constructor(private readonly http: HttpClient) {}

	public getTicketData(): Observable<ITicketData[]> {
		return this.http.get<ITicketData[]>('api/ticket');
	}

	public getTicketDataById(ticketId: number): Observable<ITicketData> {
		return this.http.get<ITicketData>(`api/ticket/${ticketId}`);
	}

	public saveTicketData(
		ticketId: number,
		data: ITicketData
	): Observable<ITicketData> {
		return this.http.patch<ITicketData>(`api/ticket/${ticketId}`, data);
	}
}
