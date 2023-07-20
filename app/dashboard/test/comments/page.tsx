'use client';
import React, { useState, CSSProperties } from 'react';
import {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
} from '@utils/comments';

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

const CommentForm: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
	</div>
);

export default function Page() {
	const [comment, setComment] = useState({ id: '', content: '', ticketId: '' });
	const setCommentProp = (prop: keyof typeof comment) => (value: string) => setComment(p => ({ ...p, [prop]: value }));

	const logRequest = (msg: string, request: Promise<unknown>) => {
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		});
	};

	const handlers = {
		getAllComments: () => logRequest('GET All Comments', getAllComments(comment.ticketId)),
		createComment: () => logRequest('CREATE Comment', createComment(comment.ticketId, {
			data: {
				attributes: {
					content: comment.content,
				},
			},
		})),
		updateComment: () => logRequest('UPDATE Comment', updateComment(comment.id, {
			data: {
				attributes: {
					content: comment.content,
				},
			},
		})),
		deleteComment: () => logRequest('DELETE Comment', deleteComment(comment.id)),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Comments</h1>

			<h2 style={styles.h2}>Get All Comments</h2>
			<CommentForm label="Ticket ID:" value={comment.ticketId} setValue={setCommentProp('ticketId')} />
			<button style={styles.button} onClick={handlers.getAllComments}>Get All Comments</button>

			<h2 style={styles.h2}>Create Comment</h2>
			<CommentForm label="Ticket ID:" value={comment.ticketId} setValue={setCommentProp('ticketId')} />
			<CommentForm label="Comment content:" value={comment.content} setValue={setCommentProp('content')} />
			<button style={styles.button} onClick={handlers.createComment}>Create Comment</button>

			<h2 style={styles.h2}>Update Comment</h2>
			<CommentForm label="Comment ID:" value={comment.id} setValue={setCommentProp('id')} />
			<CommentForm label="Comment content:" value={comment.content} setValue={setCommentProp('content')} />
			<button style={styles.button} onClick={handlers.updateComment}>Update Comment</button>

			<h2 style={styles.h2}>Delete Comment</h2>
			<CommentForm label="Comment ID:" value={comment.id} setValue={setCommentProp('id')} />
			<button style={styles.button} onClick={handlers.deleteComment}>Delete Comment</button>
		</div>
	);
}
