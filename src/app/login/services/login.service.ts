import { HttpClient } from '@angular/common/http';
import { ISigninDto } from '../dto/signin.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	// eslint-disable-next-line no-empty-function
	constructor(private readonly http: HttpClient) {}

	public login(credentials: ISigninDto): Observable<string> {
		return this.http.post(`${environment.baseURL}/auth/signin`, credentials, {
			responseType: 'text'
		});
	}
}
