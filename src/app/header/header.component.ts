import { CommonService } from './../common/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import getToken from 'src/shared/utils/getToken';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public menuItems: MenuItem[] = [];
	public menuItemsLabels: string[] = [ 'HEADER.PROFILE', 'HEADER.SIGNOUT' ];

	constructor(
		private readonly primeNgConfig: PrimeNGConfig,
		private readonly commonService: CommonService,
		private readonly translate: TranslateService
	) {}

	ngOnInit() {
		this.primeNgConfig.ripple = true;

		this.translate
			.get(this.menuItemsLabels)
			.pipe(
				tap((translations) => {
					this.generateMenuItems(translations);
				})
			)
			.subscribe();
	}

	private generateUserNameLabel(): string {
		const token = getToken();
		const decodedToken = this.commonService.getDecodedToken(token);
		return `${decodedToken.firstName} ${decodedToken.lastName}`;
	}

	private generateMenuItems(labels: any): void {
		this.menuItems = [
			{
				label: this.generateUserNameLabel(),
				items: [
					{
						label: labels['HEADER.PROFILE'],
						icon: 'pi pi-refresh',
						command: () => {
							console.log('profile');
						}
					},
					{
						label: labels['HEADER.SIGNOUT'],
						icon: 'pi pi-sign-out',
						command: () => {
							this.signOut();
						}
					}
				]
			}
		];
	}

	public sidebarToggled() {
		this.commonService.sidebarToggleClicked();
	}

	public signOut() {
		this.commonService.signOutClicked();
	}
}
