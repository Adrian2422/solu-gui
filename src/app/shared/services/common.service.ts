import { IJwtContent } from '../interfaces/IJwtContent';
import { IUserSettings } from '../interfaces/IUserSettings';
import getToken from '../utils/getToken';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	private _userData!: IUserSettings;
	private _decodedToken!: IJwtContent;
	public token$: BehaviorSubject<string | null> = new BehaviorSubject<
		string | null
	>(getToken());

	public get userData(): IUserSettings {
		return this._userData;
	}

	public set userData(value: IUserSettings) {
		this._userData = value;
	}

	public get decodedToken(): IJwtContent {
		return this._decodedToken;
	}
	public set decodedToken(value: IJwtContent) {
		this._decodedToken = value;
	}

	@Output() sidebarToggleClickedEvent = new EventEmitter<void>();

	public sidebarToggleClicked() {
		this.sidebarToggleClickedEvent.emit();
	}

	public getDecodedToken(token: string): IJwtContent {
		return jwtDecode(token);
	}

	public checkTokenExpDate(): void {
		this.token$
			.pipe(
				untilDestroyed(this),
				tap((tokenValue: string | null): void => {
					if (tokenValue) {
						this.decodedToken = this.getDecodedToken(tokenValue);
					}
				})
			)
			.subscribe();

		const tokenExpirationDate: Date = new Date(this.decodedToken?.exp * 1000);
		if (tokenExpirationDate < new Date()) {
			this.removeToken();
		}
	}

	public removeToken(): void {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');
	}
}
