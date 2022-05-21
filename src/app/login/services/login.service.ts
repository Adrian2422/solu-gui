import { CommonService } from './../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { ISigninDto } from './../dto/signin.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	// eslint-disable-next-line no-empty-function
	constructor(
		private readonly http: HttpClient,
		private readonly commonService: CommonService
	) {}

	public login(credentials: ISigninDto): Observable<string> {
		return this.http.post('auth/signin', credentials, {
			responseType: 'text'
		});
	}

	public logOut(): void {
		this.commonService.removeToken();
		this.commonService.token$.next(null);
	}
}
