'use client';
import React, { useState, CSSProperties } from 'react';
import { getSingleProfessor, getAllProfessors } from '@utils/professors';

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

const ProfessorForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [professor, setProfessor] = useState({ id: '', name: '', specialization: '' });
	const setProfessorProp = (prop: keyof typeof professor) => (value: string) => setProfessor(p => ({ ...p, [prop]: value }));

	const logRequest = (msg: string, request: Promise<unknown>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		});
	};

	const handlers = {
		getSingleProfessor: () => logRequest('GET Single Professor', getSingleProfessor(professor.id)),
		getAllProfessors: () => logRequest('GET All Professors', getAllProfessors()),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Professeurs</h1>

			<h2 style={styles.h2}>Récupérer un seul professeur</h2>
			<ProfessorForm label="ID du professeur:" value={professor.id} setValue={setProfessorProp('id')} />
			<button style={styles.button} onClick={handlers.getSingleProfessor}>Récupérer</button>

			<h2 style={styles.h2}>Récupérer tous les professeurs</h2>
			<button style={styles.button} onClick={handlers.getAllProfessors}>Récupérer</button>
		</div>
	);
}
