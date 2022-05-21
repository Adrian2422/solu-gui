import { CommonService } from '../shared/services/common.service';
import { Injectable } from '@angular/core';
import { LoginService } from './../login/services/login.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import getToken from '../shared/utils/getToken';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(
		private readonly commonService: CommonService,
		private readonly loginService: LoginService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		let baseUrl = '';
		let reqEP = '';

		if (request.url.startsWith('auth')) {
			baseUrl = environment.auth;
			reqEP = request.url;
		}

		if (request.url.startsWith('api')) {
			baseUrl = environment.api;
			reqEP = request.url;
		}

		if (getToken()) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${getToken()}`
				}
			});
		} else {
			this.loginService.logOut();
		}

		const prefixRequest: HttpRequest<any> = request.clone({
			url: `${baseUrl}${reqEP}`,
			withCredentials: true
		});

		return next.handle(prefixRequest);
	}
}
