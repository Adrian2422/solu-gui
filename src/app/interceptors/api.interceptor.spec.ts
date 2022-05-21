import { ApiInterceptor } from './api.interceptor';
import { TestBed } from '@angular/core/testing';

describe('ApiInterceptorInterceptor', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [ApiInterceptor]
		})
	);

	it('should be created', () => {
		const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
