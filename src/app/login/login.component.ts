import { ISigninDto } from './dto/signin.dto';
import { LoginService } from './services/login.service';
import { tap } from 'rxjs';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
	TRANSLOCO_SCOPE,
	TranslocoService,
	getBrowserLang
} from '@ngneat/transloco';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'login' }]
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;

	get email(): AbstractControl | null {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl | null {
		return this.loginForm.get('password');
	}

	// eslint-disable-next-line no-empty-function
	constructor(
		private readonly loginService: LoginService,
		private readonly translate: TranslocoService
	) {}

	ngOnInit(): void {
		const browserLang = getBrowserLang();
		if (browserLang) {
			this.translate.setActiveLang(browserLang);
		}

		this.loginForm = new FormGroup({
			email: new FormControl('', [ Validators.email, Validators.required ]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			rememberMe: new FormControl(false)
		});
	}

	onSubmit(): void {
		const credentials: ISigninDto = {
			email: this.email?.value,
			password: this.password?.value
		};

		this.loginService
			.login(credentials)
			.pipe(
				tap((jwt) => {
					sessionStorage.setItem('auth', jwt);
				})
			)
			.subscribe();
	}
}
