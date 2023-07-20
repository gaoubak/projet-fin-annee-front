'use client';
import React, { useState, CSSProperties } from 'react';
import { getAllStudents, getSingleStudent } from '@utils/students';

type StudentData = {
    id: string;
    name: string;
    age: number;
};

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

const StudentForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [student, setStudent] = useState<StudentData>({ id: '', name: '', age: 0 });
	const setStudentProp = (prop: keyof typeof student) => (value: string) => setStudent(s => ({ ...s, [prop]: value }));

	const logRequest = (msg: string, request: Promise<any>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		});
	};

	const handlers = {
		getSingleStudent: () => logRequest('GET Single Student', getSingleStudent(student.id)),
		getAllStudents: () => logRequest('GET All Students', getAllStudents()),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Étudiants</h1>

			<h2 style={styles.h2}>Récupérer un seul étudiant</h2>
			<StudentForm label="ID de l'étudiant:" value={student.id} setValue={setStudentProp('id')} />
			<button style={styles.button} onClick={handlers.getSingleStudent}>Récupérer</button>

			<h2 style={styles.h2}>Récupérer tous les étudiants</h2>
			<button style={styles.button} onClick={handlers.getAllStudents}>Récupérer</button>
		</div>
	);
}

// Signé CHAT-GPT