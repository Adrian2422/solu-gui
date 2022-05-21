export default function getToken(): string {
	return (
		localStorage?.getItem('token') || sessionStorage?.getItem('token') || ''
	);
}
