import { CommonService } from './shared/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public isAuthenticated!: boolean;
	public isTokenExpired!: boolean;
	public intervalId = -1;

	constructor(
		private readonly commonService: CommonService,
		private readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		this.translate.addLangs([ 'en', 'pl' ]);
		this.translate.setDefaultLang('en');
		this.translate.use('en');

		if (this.commonService.checkIfTokenIsAvailable()) {
			this.isAuthenticated = true;
		}

		this.commonService.userSigninEvent
			.pipe(
				tap(() => {
					this.isAuthenticated = true;
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
}
