import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	// eslint-disable-next-line no-empty-function
	constructor(private readonly http: HttpClient) {}

	public login(): Observable<string> {
		return this.http.get<string>('localhost:3000/signin');
	}
}
