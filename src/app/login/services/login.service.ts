import { ISigninDto } from './../dto/signin.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	// eslint-disable-next-line no-empty-function
	constructor(private readonly http: HttpClient) {}

	public login(credentials: ISigninDto): Observable<string> {
		return this.http.post('http://localhost:3000/auth/signin', credentials, {
			responseType: 'text'
		});
	}
}
