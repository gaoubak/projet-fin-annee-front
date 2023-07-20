'use client';
import React, { useState, CSSProperties } from 'react';
import {
	getUserIdTickets,
	getProjectIdTickets,
	getUserIdTicket,
	getProjectIdTicket,
	createTicketForProject,
	updateTicket,
	deleteTicket,
	TicketDataPostProps,
	TicketDataPutProps,
} from '@utils/tickets';

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

const TicketForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [ticket, setTicket] = useState({ userId: '', projectId: '', ticketId: '', ticketData: { data: { attributes: { name: '', status: '', description: '' } } }, updatedTicketData: { data: { id: '', attributes: {}} }, createWithRelationship: false, files: [] });

	const setTicketProp = <T extends keyof typeof ticket>(prop: T) => (value: typeof ticket[T]) =>
		setTicket((t) => ({ ...t, [prop]: value }));

	const logRequest = (msg: string, request: Promise<any>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		});
	};

	const handlers = {
		getUserIdTickets: () => logRequest('GET Tickets by User ID', getUserIdTickets(ticket.userId)),
		getProjectIdTickets: () => logRequest('GET Tickets by Project ID', getProjectIdTickets(ticket.projectId)),
		getUserIdTicket: () => logRequest('GET Ticket by User ID and Ticket ID', getUserIdTicket(ticket.userId, ticket.ticketId)),
		getProjectIdTicket: () => logRequest('GET Ticket by Project ID and Ticket ID', getProjectIdTicket(ticket.projectId, ticket.ticketId)),
		createTicketForProject: () => {
			const ticketDataToPost: TicketDataPostProps = {
				data: {
					attributes: {
						name: ticket.ticketData.data.attributes.name,
						status: ticket.ticketData.data.attributes.status,
						description: ticket.ticketData.data.attributes.description,
					},
				},
			};

			if (ticket.createWithRelationship && ticket.files.length > 0) {
				ticketDataToPost.data.relationships = {
					files: {
						data: ticket.files.map((file) => ({
							// @ts-ignore
							id: file.name,
							type: 'files',
						})),
					},
				};
			}

			return logRequest('CREATE Ticket for Project', createTicketForProject(ticket.projectId, ticketDataToPost));
		},
		updateTicket: () => {
			const updatedTicketDataToSend: TicketDataPutProps = {
				data: {
					id: ticket.updatedTicketData.data.id,
					attributes: {
						// @ts-ignore

						...(ticket.updatedTicketData.data.attributes.name && {
							// @ts-ignore
							name: ticket.updatedTicketData.data.attributes.name,
						}),
						// @ts-ignore
						...(ticket.updatedTicketData.data.attributes.status && {
							// @ts-ignore
							status: ticket.updatedTicketData.data.attributes.status,
						}),
						// @ts-ignore
						...(ticket.updatedTicketData.data.attributes.description && {
							// @ts-ignore
							description: ticket.updatedTicketData.data.attributes.description,
						}),
					},
				},
			};

			return logRequest('UPDATE Ticket', updateTicket(ticket.ticketId, updatedTicketDataToSend));
		},
		deleteTicket: () => logRequest('DELETE Ticket', deleteTicket(ticket.ticketId)),
	};

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const selectedFiles = Array.from(event.target.files);
			// @ts-ignore
			setTicketProp('files')(selectedFiles);
		}
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Tickets</h1>

			<h2 style={styles.h2}>Get Tickets by User ID</h2>
			<TicketForm label="User ID:" value={ticket.userId} setValue={setTicketProp('userId')} />
			<button style={styles.button} onClick={handlers.getUserIdTickets}>Get Tickets</button>

			<h2 style={styles.h2}>Get Tickets by Project ID</h2>
			<TicketForm label="Project ID:" value={ticket.projectId} setValue={setTicketProp('projectId')} />
			<button style={styles.button} onClick={handlers.getProjectIdTickets}>Get Tickets</button>

			<h2 style={styles.h2}>Get Ticket by User ID and Ticket ID</h2>
			<TicketForm label="User ID:" value={ticket.userId} setValue={setTicketProp('userId')} />
			<TicketForm label="Ticket ID:" value={ticket.ticketId} setValue={setTicketProp('ticketId')} />
			<button style={styles.button} onClick={handlers.getUserIdTicket}>Get Ticket</button>

			<h2 style={styles.h2}>Get Ticket by Project ID and Ticket ID</h2>
			<TicketForm label="Project ID:" value={ticket.projectId} setValue={setTicketProp('projectId')} />
			<TicketForm label="Ticket ID:" value={ticket.ticketId} setValue={setTicketProp('ticketId')} />
			<button style={styles.button} onClick={handlers.getProjectIdTicket}>Get Ticket</button>

			<h2 style={styles.h2}>Create Ticket for Project</h2>
			<TicketForm label="Project ID:" value={ticket.projectId} setValue={setTicketProp('projectId')} />
			<TicketForm label="Ticket Name:" value={ticket.ticketData.data.attributes.name} setValue={(value) => setTicketProp('ticketData')({ data: { attributes: { ...ticket.ticketData.data.attributes, name: value } } })} />
			<TicketForm label="Ticket Status:" value={ticket.ticketData.data.attributes.status} setValue={(value) => setTicketProp('ticketData')({ data: { attributes: { ...ticket.ticketData.data.attributes, status: value } } })} />
			<TicketForm label="Ticket Description:" value={ticket.ticketData.data.attributes.description} setValue={(value) => setTicketProp('ticketData')({ data: { attributes: { ...ticket.ticketData.data.attributes, description: value } } })} />
			<label>Create with Relationship:</label>
			<input style={styles.input} type="checkbox" checked={ticket.createWithRelationship} onChange={e => setTicketProp('createWithRelationship')(e.target.checked)} />
			{ticket.createWithRelationship && (
				<div>
					<label>Upload File(s):</label>
					<input style={styles.input} type="file" multiple onChange={handleFileInputChange} />
				</div>
			)}
			<button style={styles.button} onClick={handlers.createTicketForProject}>Create Ticket</button>

			<h2 style={styles.h2}>Update Ticket</h2>
			<TicketForm label="Ticket ID:" value={ticket.ticketId} setValue={setTicketProp('ticketId')} />
			{/*@ts-ignore*/}
			<TicketForm label="Updated Ticket Name:" value={ticket.updatedTicketData.data.attributes.name} setValue={(value) => setTicketProp('updatedTicketData')({ data: { ...ticket.updatedTicketData.data, id: ticket.ticketId, attributes: { ...ticket.updatedTicketData.data.attributes, name: value } } })} />
			{/*@ts-ignore*/}
			<TicketForm label="Updated Ticket Status:" value={ticket.updatedTicketData.data.attributes.status} setValue={(value) => setTicketProp('updatedTicketData')({ data: { ...ticket.updatedTicketData.data, id: ticket.ticketId, attributes: { ...ticket.updatedTicketData.data.attributes, status: value } } })} />
			{/*@ts-ignore*/}
			<TicketForm label="Updated Ticket Description:" value={ticket.updatedTicketData.data.attributes.description} setValue={(value) => setTicketProp('updatedTicketData')({ data: { ...ticket.updatedTicketData.data, id: ticket.ticketId, attributes: { ...ticket.updatedTicketData.data.attributes, description: value } } })} />
			<button style={styles.button} onClick={handlers.updateTicket}>Update Ticket</button>

			<h2 style={styles.h2}>Delete Ticket</h2>
			<TicketForm label="Ticket ID:" value={ticket.ticketId} setValue={setTicketProp('ticketId')} />
			<button style={styles.button} onClick={handlers.deleteTicket}>Delete Ticket</button>
		</div>
	);
}

// Signé CHAT-GPT