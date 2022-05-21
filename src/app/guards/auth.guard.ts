import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getToken from '../shared/utils/getToken';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (getToken() && state.url !== '/login') {
			return true;
		}

		if (getToken() && state.url === '/login') {
			return false;
		}

		if (!getToken() && state.url === '/login') {
			return true;
		}

		if (!getToken() && state.url !== '/login') {
			return false;
		}

		return true;
	}
}
