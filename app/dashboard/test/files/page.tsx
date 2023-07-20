'use client';
import React, { useState, ChangeEvent, CSSProperties } from 'react';
import { getFile, createFileFromURL, uploadFile, deleteFile, FileData } from '@utils/files';

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

const FileForm: React.FC<{ label: string, value: string, setValue: (value: string) => void, type?: string, onChange?: (event: ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, setValue, type = 'text', onChange }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type={type} value={value} onChange={onChange || ((e) => setValue(e.target.value))} />
	</div>
);

export default function Page() {
	const [file, setFile] = useState({ id: '', name: '', url: '' });
	const setFileProp = (prop: keyof typeof file) => (value: string) => setFile(p => ({ ...p, [prop]: value }));
	const [fileData, setFileData] = useState<FileData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const logRequest = (msg: string, request: Promise<any>) => {
		setLoading(true);
		setError(null);
		console.log(`Sending ${msg} request...`);
		return request.then(r => {
			console.log(`${msg} response:`, r);
			return r;
		}).catch((error: any) => {
			setError(error.message);
		}).finally(() => setLoading(false));
	};

	const handlers = {
		getFile: () => logRequest('GET File', getFile(file.id)).then(setFileData),
		createFileFromURL: () => logRequest('CREATE File from URL', createFileFromURL(file.name, file.url)).then(setFileData),
		uploadFile: (event: ChangeEvent<HTMLInputElement>) => {
			const fileToUpload = event.target.files && event.target.files[0];
			if (fileToUpload) {
				const type = 'document';
				logRequest('UPLOAD File', uploadFile(fileToUpload, type)).then(setFileData);
			}
		},
		deleteFile: () => logRequest('DELETE File', deleteFile(file.id)).then(() => setFileData(null)),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Files</h1>

			<h2 style={styles.h2}>Get File</h2>
			<FileForm label="File ID:" value={file.id} setValue={setFileProp('id')} />
			<button style={styles.button} onClick={handlers.getFile} disabled={loading}>Get File</button>

			<h2 style={styles.h2}>Create File from URL</h2>
			<FileForm label="Name:" value={file.name} setValue={setFileProp('name')} />
			<FileForm label="URL:" value={file.url} setValue={setFileProp('url')} />
			<button style={styles.button} onClick={handlers.createFileFromURL} disabled={loading}>Create File from URL</button>

			<h2 style={styles.h2}>Upload File</h2>
			<FileForm label="Upload:" value="" setValue={() => { }} type="file" onChange={handlers.uploadFile} />
			<button style={styles.button} onClick={() => { }} disabled={loading}>Upload File</button>

			<h2 style={styles.h2}>Delete File</h2>
			<FileForm label="File ID:" value={file.id} setValue={setFileProp('id')} />
			<button style={styles.button} onClick={handlers.deleteFile} disabled={loading}>Delete File</button>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{fileData && (
				<div>
					<h2 style={styles.h2}>File Details</h2>
					<p>ID: {fileData?.id}</p>
					<p>Name: {fileData?.attributes?.name}</p>
					<p>Type: {fileData?.attributes?.type}</p>
					<p>URL: {fileData?.attributes?.url}</p>
				</div>
			)}
		</div>
	);
}
