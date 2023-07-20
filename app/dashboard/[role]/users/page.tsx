'use client';
import Button from '@components/button/button.component';
import Input from '@components/input/input.component';
import { createUser, getAllUsers } from '@utils/users';
import { useState, useEffect } from 'react';

export default function Page() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({
		name: '',
		email: '',
		role: '',
	});

	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	const handleUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSelectRole = (e) => {
		setUser({ ...user, role: e.target.value });
	};

	const handleCreateUser = async () => {
		const response = await createUser(user);
		if (response) {
			setUser({
				name: '',
				email: '',
				role: '',
			});
		}
	};

	useEffect(() => {
		getAllUsers()
			.then((response) => {
				setUsers(response);
			})
			.finally(() => {
				console.log(users);
			});
	}, []);

	return (
		<section>
			<h1>Manage User</h1>
			<div id="users-list"></div>
			{modal ? (
				<div id="create-user-modal">
					<Input
						type="text"
						name="name"
						label="Name"
						onChange={handleUser}
						placeholder="Name"
					/>
					<Input
						type="email"
						name="email"
						label="Email"
						onChange={handleUser}
						placeholder="Email"
					/>
					<Input
						type="select"
						name="role"
						label="Role"
						onChange={handleSelectRole}
						placeholder="Role"
						options={[
							'regisseur',
							'monteur',
							'traducteur',
							'redacteur',
							'controle_qualite',
							'equipe_video',
							'graphiste',
							'traducteur_son',
							'responsable_publication',
							'responsable_marketing',
						]}
					/>
					<Button
						onClicked={handleCreateUser}
						text="Create User"
						type="success"
						isTransparent
					/>
				</div>
			) : null}
			{modal ? (
				<Button
					onClicked={handleModal}
					text="Close"
					type="alert"
					isTransparent
				/>
			) : (
				<Button
					onClicked={handleModal}
					text="Create User"
					type="success"
					isTransparent
				/>
			)}
		</section>
	);
}
