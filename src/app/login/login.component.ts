import { CommonService } from './../common/services/common.service';
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

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;

	get email(): AbstractControl | null {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl | null {
		return this.loginForm.get('password');
	}

	get rememberMe(): AbstractControl | null {
		return this.loginForm.get('rememberMe');
	}

	constructor(
		private readonly commonService: CommonService,
		private readonly loginService: LoginService
	) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [ Validators.email, Validators.required ]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
				)
			]),
			rememberMe: new FormControl(false)
		});
	}

	public onSubmit(): void {
		const credentials: ISigninDto = {
			email: this.email?.value,
			password: this.password?.value
		};

		const isRememberMeChecked = this.rememberMe?.value;

		this.loginService
			.login(credentials)
			.pipe(
				tap((jwt) => {
					if (isRememberMeChecked) {
						localStorage.setItem('auth', jwt);
					} else {
						sessionStorage.setItem('auth', jwt);
					}
				}),
				tap(() => {
					this.commonService.userSignedIn();
				})
			)
			.subscribe();
	}

	public isControlInvalidOrDirty(
		control: AbstractControl | null
	): boolean | undefined {
		return control?.invalid && control?.dirty;
	}

	public generateErrorMessage(
		controlName: string,
		control: AbstractControl | null
	): string {
		if (control?.hasError('required')) {
			return 'ERROR.REQUIRED';
		}

		if (controlName === 'email' && control?.hasError('email')) {
			return 'ERROR.INVALID_EMAIL';
		}

		if (controlName === 'password' && control?.hasError('minlength')) {
			return 'ERROR.MIN_PASSWORD_LENGTH';
		}

		if (controlName === 'password' && control?.hasError('maxlength')) {
			return 'ERROR.MAX_PASSWORD_LENGTH';
		}

		if (controlName === 'password' && control?.hasError('pattern')) {
			return 'ERROR.ILLEGAL_CHARACTERS';
		}

		return '';
	}
}
