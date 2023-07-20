import Link from 'next/link';
import '@scss/pages/not-found.scss';

export default function Custom404() {
	return (
		<main id="not-found">
			<h1>404 - Page Not Found</h1>
			<span>
				<Link href="/">Go back home</Link>
			</span>
		</main>
	);
}
