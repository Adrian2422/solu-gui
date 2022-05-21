import { CommonService } from './shared/services/common.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public isAuthenticated = false;

	constructor(
		private readonly commonService: CommonService,
		private readonly translate: TranslateService,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		this.translate.addLangs([ 'en', 'pl' ]);
		this.translate.setDefaultLang('en');
		this.translate.use('en');

		this.commonService.token$
			.pipe(
				untilDestroyed(this),
				tap((token: string | null): void => {
					if (!token) {
						this.isAuthenticated = false;
						this.router.navigate(['/login']);
					}

					if (token) {
						this.isAuthenticated = true;
						this.router.navigate(['/']);
					}
				})
			)
			.subscribe();

		this.commonService.checkTokenExpDate();
	}
}
