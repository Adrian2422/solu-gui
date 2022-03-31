import { CommonService } from './common/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public title = 'solu-gui';
	public isAuthenticated!: boolean;
	public intervalId = -1;

	constructor(
		private readonly commonService: CommonService,
		private readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		this.translate.addLangs([ 'en', 'pl' ]);
		this.translate.setDefaultLang('en');
		this.translate.use('en');

		this.checkIfUserIsAuthenticated();

		if (this.isAuthenticated) {
			this.startCheckingIfUserWasSignedOut();
		}

		this.commonService.userSigninEvent
			.pipe(
				tap(() => {
					this.isAuthenticated = true;
					this.startCheckingIfUserWasSignedOut();
				})
			)
			.subscribe();

		this.commonService.signOutClickedEvent
			.pipe(
				tap(() => {
					localStorage.removeItem('auth');
					sessionStorage.removeItem('auth');
					this.isAuthenticated = false;
				})
			)
			.subscribe();
	}

	public checkIfUserIsAuthenticated(): void {
		this.isAuthenticated = this.commonService.checkIfUserIsSignedIn();
		console.log(`User status: ${this.isAuthenticated}`);
	}

	private startCheckingIfUserWasSignedOut(): void {
		this.intervalId = window.setInterval(() => {
			this.checkIfUserIsAuthenticated();

			if (!this.isAuthenticated) {
				this.stopCheckingIfUserWasSignedOut();
			}
		}, 5000);
	}

	private stopCheckingIfUserWasSignedOut(): void {
		window.clearInterval(this.intervalId);
		console.log('cleared');
	}
}
