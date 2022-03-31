export default function getToken(): string {
	return localStorage?.getItem('auth') || sessionStorage?.getItem('auth') || '';
}
