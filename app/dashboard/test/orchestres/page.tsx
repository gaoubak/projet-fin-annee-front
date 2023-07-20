'use client';
import React, { useState, CSSProperties, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { getSingleOrchestra, createOrchestra, OrchestraDataPostProps } from '@utils/orchestras';

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
	checkboxLabel: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '10px'
	},
	checkbox: {
		marginLeft: '10px'
	},
	button: {
		padding: '10px 20px',
		borderRadius: '5px',
		border: 'none',
		color: '#fff',
		backgroundColor: '#007BFF',
		cursor: 'pointer',
		marginBottom: '40px'
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

const OrchestraForm: React.FC<{
    label: string;
    value: string | number | boolean;
    setValue: Dispatch<SetStateAction<string | number | boolean>>;
    type?: string;
}> = ({ label, value, setValue, type = 'text' }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = type === 'checkbox' ? event.target.checked : event.target.value;
		setValue(newValue as string | number | boolean);
	};

	return (
		<div style={styles.form}>
			<label>{label}</label>
			{type === 'checkbox' ? (
				<label style={styles.checkboxLabel}>
					<input
						style={styles.checkbox}
						type="checkbox"
						checked={value as boolean}
						onChange={handleChange}
					/>

					{label}
				</label>
			) : (
				<input
					style={styles.input}
					type={type}
					value={value as string}
					onChange={handleChange}
				/>
			)}
		</div>
	);
};

export default function Page() {
	const [orchestraId, setOrchestraId] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [membersCount, setMembersCount] = useState<number | undefined>(0);
	const [hasBeenInvited, setHasBeenInvited] = useState<boolean>(false); // Modifier le type ici

	const handleGetSingleOrchestra = async () => {
		console.log('Envoi de la requête GET pour récupérer un seul orchestre...');
		const singleOrchestra = await getSingleOrchestra(orchestraId);
		console.log('Requête GET pour récupérer un seul orchestre - Réponse:', singleOrchestra);
	};

	const handleCreateOrchestra = async () => {
		console.log('Envoi de la requête POST pour créer un orchestre...');
		const orchestraData: OrchestraDataPostProps = {
			data: {
				attributes: {
					name,
					email,
					members_count: membersCount ?? 0,
					has_been_invited: hasBeenInvited,
				}
			}
		};
		const createdOrchestra = await createOrchestra(orchestraData);
		console.log('Requête POST pour créer un orchestre - Réponse:', createdOrchestra);
	};


	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Orchestres</h1>

			{/* Formulaire pour récupérer un seul orchestre */}
			<div>
				<h2 style={styles.h2}>Récupérer un seul orchestre</h2>
				<OrchestraForm
					label="ID de l'orchestre"
					value={orchestraId}
					// @ts-ignore
					setValue={setOrchestraId}
				/>
				<button style={styles.button} onClick={handleGetSingleOrchestra}>Récupérer</button>
			</div>

			{/* Formulaire pour créer un orchestre */}
			<div>
				<h2 style={styles.h2}>Créer un orchestre</h2>
				<OrchestraForm
					label="Nom"
					value={name}
					// @ts-ignore
					setValue={setName}
				/>
				<OrchestraForm
					label="Email"
					value={email}
					// @ts-ignore
					setValue={setEmail}
					type="email"
				/>
				<OrchestraForm
					label="Nombre de membres"
					value={membersCount ?? ''}
					// @ts-ignore
					setValue={setMembersCount}
					type="number"
				/>
				<OrchestraForm
					label="Invité"
					value={hasBeenInvited}
					// @ts-ignore
					setValue={setHasBeenInvited}
					type="checkbox"
				/>
				<button style={styles.button} onClick={handleCreateOrchestra}>Créer</button>
			</div>
		</div>
	);
}
