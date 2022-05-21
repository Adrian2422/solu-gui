/* eslint-disable @typescript-eslint/no-empty-function */
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import IUserData from '../interfaces/IUserData';
import IUserStatus from '../interfaces/IUserStatus';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './../services/users.service';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	public userForm!: FormGroup;
	public statuses!: IUserStatus[];
	private userData!: IUserData;
	private userId!: number;

	constructor(
		private readonly usersService: UsersService,
		private readonly commonService: CommonService,
		private readonly route: ActivatedRoute,
		private readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		console.log('lol');

		this.route.paramMap.subscribe((paramMap) => {
			const paramUserId = Number(paramMap.get('id'));
			const loggedUserId = this.commonService.decodedToken.id;

			this.userId = paramUserId || loggedUserId;

			this.usersService
				.getUserDataById(this.userId)
				.pipe(
					untilDestroyed(this),
					tap((userData) => {
						this.userData = userData;
					}),
					tap(() => {
						this.initializeForm();
						this.disableAllFields();
					})
				)
				.subscribe();
		});
	}

	private initializeForm(): void {
		this.statuses = [
			{
				key: true,
				name: this.translate.instant('USER_PROFILE.ACTIVE')
			},
			{
				key: false,
				name: this.translate.instant('USER_PROFILE.LOCKED')
			}
		];

		const { firstName, lastName, email, phone, role, isBlocked } =
			this.userData;
		this.userForm = new FormGroup({
			firstName: new FormControl(firstName, [Validators.required]),
			lastName: new FormControl(lastName, [Validators.required]),
			email: new FormControl(email, [Validators.required]),
			phone: new FormControl(phone, [Validators.required]),
			role: new FormControl(role, [Validators.required]),
			status: new FormControl(isBlocked, [Validators.required])
		});
	}

	public onEditClick(): void {
		if (this.userForm.disabled) {
			this.enableAllFields();
		} else {
			this.disableAllFields();
		}
	}

	public onSaveClick(): void {
		this.usersService
			.saveUserData(this.userId, this.userForm.value)
			.pipe(
				tap(() => {
					this.ngOnInit();
					this.disableAllFields();
				})
			)
			.subscribe();
	}

	public disableAllFields(): void {
		Object.keys(this.userForm.controls).forEach((key) => {
			this.userForm.get(key)?.disable();
		});
	}

	public enableAllFields(): void {
		Object.keys(this.userForm.controls).forEach((key) => {
			this.userForm.get(key)?.enable();
		});
	}
}
