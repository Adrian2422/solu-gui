import { CommonService } from './../../services/common.service';
import { ISidebarItem } from './interfaces/ISidebarItem';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';

enum SidebarState {
	EXPANDED = 'expanded',
	COLLAPSED = 'collapsed'
}

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	animations: [
		trigger('sidebarSlide', [
			state(SidebarState.COLLAPSED, style({ width: '64px' })),
			state(SidebarState.EXPANDED, style({ width: '300px' })),
			transition('* => *', [animate('200ms ease-out')])
		])
	]
})
export class SidebarComponent implements OnInit {
	public sidebarState = SidebarState.EXPANDED;
	public sidebarItems: ISidebarItem[] = [];

	constructor(
		private readonly commonService: CommonService,
		private readonly route: Router
	) {}

	ngOnInit(): void {
		this.commonService.sidebarToggleClickedEvent
			.pipe(tap(() => this.toggleSidebar()))
			.subscribe();

		this.generateSidebarItems();
	}

	private toggleSidebar(): void {
		this.sidebarState =
			this.sidebarState === SidebarState.EXPANDED
				? SidebarState.COLLAPSED
				: SidebarState.EXPANDED;
	}

	public translateSidebarState(): boolean {
		return this.sidebarState === SidebarState.EXPANDED;
	}

	private generateSidebarItems(): void {
		this.sidebarItems = [
			{
				label: 'SIDEBAR.USERS',
				icon: 'pi-user',
				isExpanded: false,
				subitems: [
					{
						label: 'SIDEBAR.USERS',
						icon: 'pi-user',
						onClick: () => {
							this.route.navigate(['/users']);
						}
					}
				],
				onClick: (item: ISidebarItem) => {
					item.isExpanded = !item.isExpanded;
				}
			},
			{
				label: 'SIDEBAR.TICKETS',
				icon: 'pi-envelope',
				isExpanded: false,
				subitems: [
					{
						label: 'SIDEBAR.TICKETS',
						icon: 'pi-envelope',
						onClick: () => {
							this.route.navigate(['/tickets']);
						}
					}
				],
				onClick: (item: ISidebarItem) => this.expandItem(item)
			},
			{
				label: 'SIDEBAR.ARCHIVE',
				icon: 'pi-database',
				isExpanded: false,
				subitems: [],
				onClick: () => null
			},
			{
				label: 'SIDEBAR.SETTINGS',
				icon: 'pi-cog',
				isExpanded: false,
				subitems: [],
				onClick: () => null
			}
		];
	}

	private expandItem(item: ISidebarItem): void {
		item.isExpanded = !item.isExpanded;
	}
}
