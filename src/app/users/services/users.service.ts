/* eslint-disable @typescript-eslint/no-empty-function */
import IUserData from '../interfaces/IUserData';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	constructor(private readonly http: HttpClient) {}

	public getUserData(): Observable<IUserData[]> {
		return this.http.get<IUserData[]>('api/user');
	}

	public getUserDataById(userId: number): Observable<IUserData> {
		return this.http.get<IUserData>(`api/user/${userId}`);
	}

	public saveUserData(userId: number, data: IUserData): Observable<IUserData> {
		return this.http.patch<IUserData>(`api/user/${userId}`, data);
	}

	public lockOrUnlockUser(userId: number): Observable<HttpResponse<void>> {
		return this.http.patch<void>(`api/user/lock/${userId}`, null, {
			observe: 'response'
		});
	}
}
