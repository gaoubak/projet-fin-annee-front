'use client';
import React, { useState, CSSProperties } from 'react';
import {
	getInstruments,
	getInstrument,
	createInstrument,
	updateInstrument,
	deleteInstrument,
} from '@utils/instruments';

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

const InstrumentForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [instrument, setInstrument] = useState({ id: '', description: '', quantity: '0', state: '', type: '' });
	const setInstrumentProp = (prop: keyof typeof instrument) => (value: string) => setInstrument(p => ({ ...p, [prop]: value }));

	const logRequest = (msg: string, request: Promise<unknown>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		}).catch((error: unknown) => {
			console.error(`Error ${msg.toLowerCase()}:`, error);
		});
	};

	const handlers = {
		getInstruments: () => logRequest('GET Instruments', getInstruments()),
		getInstrument: () => logRequest('GET Instrument', getInstrument(instrument.id)),
		createInstrument: () => logRequest('CREATE Instrument', createInstrument({
			data: {
				attributes: {
					description: instrument.description,
					quantity: parseInt(instrument.quantity),
					state: instrument.state,
					type: instrument.type,
				},
			},
		})),
		updateInstrument: () => logRequest('UPDATE Instrument', updateInstrument(instrument.id, {
			data: {
				id: instrument.id,
				attributes: {
					description: instrument.description,
					quantity: parseInt(instrument.quantity),
					state: instrument.state,
					type: instrument.type,
				},
			},
		})),
		deleteInstrument: () => logRequest('DELETE Instrument', deleteInstrument(instrument.id)),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Instruments</h1>

			<h2 style={styles.h2}>Get Instruments</h2>
			<button style={styles.button} onClick={handlers.getInstruments}>Get Instruments</button>

			<h2 style={styles.h2}>Get Instrument</h2>
			<InstrumentForm label="Instrument ID:" value={instrument.id} setValue={setInstrumentProp('id')} />
			<button style={styles.button} onClick={handlers.getInstrument}>Get Instrument</button>

			<h2 style={styles.h2}>Create Instrument</h2>
			<InstrumentForm label="Description:" value={instrument.description} setValue={setInstrumentProp('description')} />
			<InstrumentForm label="Quantity:" value={instrument.quantity} setValue={setInstrumentProp('quantity')} />
			<InstrumentForm label="State:" value={instrument.state} setValue={setInstrumentProp('state')} />
			<InstrumentForm label="Type:" value={instrument.type} setValue={setInstrumentProp('type')} />
			<button style={styles.button} onClick={handlers.createInstrument}>Create Instrument</button>

			<h2 style={styles.h2}>Update Instrument</h2>
			<InstrumentForm label="Instrument ID:" value={instrument.id} setValue={setInstrumentProp('id')} />
			<InstrumentForm label="Description:" value={instrument.description} setValue={setInstrumentProp('description')} />
			<InstrumentForm label="Quantity:" value={instrument.quantity} setValue={setInstrumentProp('quantity')} />
			<InstrumentForm label="State:" value={instrument.state} setValue={setInstrumentProp('state')} />
			<InstrumentForm label="Type:" value={instrument.type} setValue={setInstrumentProp('type')} />
			<button style={styles.button} onClick={handlers.updateInstrument}>Update Instrument</button>

			<h2 style={styles.h2}>Delete Instrument</h2>
			<InstrumentForm label="Instrument ID:" value={instrument.id} setValue={setInstrumentProp('id')} />
			<button style={styles.button} onClick={handlers.deleteInstrument}>Delete Instrument</button>
		</div>
	);
}
