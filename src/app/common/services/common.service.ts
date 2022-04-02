import { IJwtContent } from '../interfaces/IJwtContent';
import jwtDecode from 'jwt-decode';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
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
