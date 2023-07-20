'use client';
import React, { useState, CSSProperties } from 'react';
import { getUser, getSingleUser, getAllUsers, createUser, updateUser, deleteUser, getAuthUser } from '@utils/users';

const styles: { [key: string]: CSSProperties } = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
		maxWidth: '600px',
		fontFamily: 'Arial, sans-serif'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		marginBottom: '20px'
	},
	input: {
		margin: '5px 0',
		padding: '10px',
		borderRadius: '5px',
		border: '1px solid #ddd'
	},
	button: {
		padding: '10px 20px',
		borderRadius: '5px',
		border: 'none',
		color: '#fff',
		backgroundColor: '#007BFF',
		cursor: 'pointer',
		marginBottom: '80px'
	},
	h1: {
		textAlign: 'center',
		color: '#007BFF',
		margin: '20px 0'
	},
	h2: {
		color: '#007BFF',
		margin: '20px 0'
	},
};

const UserForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [user, setUser] = useState({ id: '', name: '', email: '', role: '' });
	const setUserProp = (prop: keyof typeof user) => (value: string) => setUser(u => ({ ...u, [prop]: value }));

	const logRequest = (msg: string, request: Promise<any>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		});
	};

	const handlers = {
		getAuthUser: () => logRequest('GET Auth User', getAuthUser()),
		getUser: () => logRequest('GET User', getUser(user.id)),
		getSingleUser: () => logRequest('GET Single User', getSingleUser(user.id)),
		getAllUsers: () => logRequest('GET All Users', getAllUsers()),
		createUser: () => logRequest('POST User', createUser({ data: { users: [{ name: user.name, email: user.email, role: user.role }] } })),
		updateUser: () => logRequest('PATCH User', updateUser(user.id, { data: { attributes: { name: user.name } } })),
		deleteUser: () => logRequest('DELETE User', deleteUser(user.id)),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Users</h1>

			<h2 style={styles.h2}>Créer un utilisateur</h2>
			<UserForm label="Nom:" value={user.name} setValue={setUserProp('name')} />
			<UserForm label="Email:" value={user.email} setValue={setUserProp('email')} />
			<UserForm label="Rôle:" value={user.role} setValue={setUserProp('role')} />
			<button style={styles.button} onClick={handlers.createUser}>Créer</button>

			<h2 style={styles.h2}>Mettre à jour un utilisateur</h2>
			<UserForm label="ID de l'utilisateur:" value={user.id} setValue={setUserProp('id')} />
			<UserForm label="Nouveau nom:" value={user.name} setValue={setUserProp('name')} />
			<button style={styles.button} onClick={handlers.updateUser}>Mettre à jour</button>

			<h2 style={styles.h2}>Supprimer un utilisateur</h2>
			<UserForm label="ID de l'utilisateur:" value={user.id} setValue={setUserProp('id')} />
			<button style={styles.button} onClick={handlers.deleteUser}>Supprimer</button>

			<h2 style={styles.h2}>Récupérer un utilisateur</h2>
			<UserForm label="ID de l'utilisateur:" value={user.id} setValue={setUserProp('id')} />
			<button style={styles.button} onClick={handlers.getUser}>Récupérer</button>

			<h2 style={styles.h2}>Récupérer un seul utilisateur</h2>
			<UserForm label="ID de l'utilisateur:" value={user.id} setValue={setUserProp('id')} />
			<button style={styles.button} onClick={handlers.getSingleUser}>Récupérer</button>

			<h2 style={styles.h2}>Récupérer tous les utilisateurs</h2>
			<button style={styles.button} onClick={handlers.getAllUsers}>Récupérer</button>

			{/* eslint-disable-next-line react/no-unescaped-entities */}
			<h2 style={styles.h2}>Récupérer l'utilisateur authentifié</h2>
			<button style={styles.button} onClick={handlers.getAuthUser}>Récupérer</button>
		</div>
	);
}

// Signé CHAT-GPT