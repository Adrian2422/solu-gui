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
		this.loginService
			.login()
			.pipe(
				tap((jwt) => {
					sessionStorage.setItem('auth', jwt);
				})
			)
			.subscribe();
	}
}
