import { ISigninDto } from './dto/signin.dto';
import { LoginService } from './services/login.service';
import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;

	// eslint-disable-next-line no-empty-function
	constructor(private readonly loginService: LoginService) {}

	ngOnInit(): void {
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
			email: this.loginForm.get('email')?.value,
			password: this.loginForm.get('password')?.value
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
