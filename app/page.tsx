'use client';
import content from '@content/landing.json';
import { isUserLoggedIn as User } from '@utils/session';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
export default function LandingPage() {
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState('');

	const isUserLoggedIn = () => {
		const user = User();
		console.log('supposed user', user);
		if (user.user) {
			setRole(user.user.attributes.role);
			setLoading(false);
			redirect('/dashboard/' + role);
		}
		console.log('not logged in');
		redirect('/auth/login');
	};

	useEffect(() => {
		isUserLoggedIn();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{content.title}</h1>
		</div>
	);
}
