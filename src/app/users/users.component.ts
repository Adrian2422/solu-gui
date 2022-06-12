import { HttpResponse } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-empty-function */
import IUserColumn from './interfaces/IUserColumn';
import IUserData from './interfaces/IUserData';
import { UsersService } from './services/users.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	public columns: IUserColumn[] = [];
	public dataSource: IUserData[] = [];

	constructor(
		private readonly usersService: UsersService,
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.columns = [
			{ field: 'id', header: 'TABLE.ID' },
			{ field: 'email', header: 'TABLE.EMAIL' },
			{ field: 'firstName', header: 'TABLE.FIRST_NAME' },
			{ field: 'lastName', header: 'TABLE.LAST_NAME' },
			{ field: 'phone', header: 'TABLE.PHONE' },
			{ field: 'role', header: 'TABLE.ROLE' },
			{ field: 'isBlocked', header: 'TABLE.STATUS' }
		];

		this.usersService
			.getUserData()
			.pipe(
				tap((data) => {
					this.dataSource = data.map((user) => this.translateUserStatus(user));
				})
			)
			.subscribe();
	}

	public toggleLock(userId: number) {
		this.usersService
			.lockOrUnlockUser(userId)
			.pipe(
				tap((response: HttpResponse<void>) => {
					if (response.ok) {
						this.ngOnInit();
					}
				})
			)
			.subscribe();
	}

	public showData(userId: number) {
		this.router.navigate([`${userId}`], { relativeTo: this.route });
	}

	public editUser(userId: number) {}

	public translateUserStatus(user: IUserData) {
		if (user.isBlocked) {
			return {
				...user,
				isBlocked: 'TABLE.LOCKED'
			};
		} else {
			return {
				...user,
				isBlocked: 'TABLE.ACTIVE'
			};
		}
	}
}
