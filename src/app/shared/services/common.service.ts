import { IJwtContent } from '../interfaces/IJwtContent';
import { IUserData } from '../interfaces/IUserData';
import jwtDecode from 'jwt-decode';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	private _userData!: IUserData;

	public get userData(): IUserData {
		return this._userData;
	}

	public set userData(value: IUserData) {
		this._userData = value;
	}

	@Output() sidebarToggleClickedEvent = new EventEmitter<void>();
	@Output() userSigninEvent = new EventEmitter<void>();
	@Output() signOutClickedEvent = new EventEmitter<void>();

	public sidebarToggleClicked() {
		this.sidebarToggleClickedEvent.emit();
	}

	public userSignedIn(): void {
		this.userSigninEvent.emit();
	}

	public signOutClicked(): void {
		this.signOutClickedEvent.emit();
	}

	public getDecodedToken(token: string): IJwtContent {
		return jwtDecode(token);
	}

	public checkIfTokenIsAvailable() {
		return localStorage.getItem('auth') || sessionStorage.getItem('auth');
	}
}
