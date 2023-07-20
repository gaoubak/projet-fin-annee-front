'use client';
import React, {CSSProperties, useState} from 'react';
import {
	getProjectRelationship,
	updateProjectRelationship,
	getSingleProject,
	getAllUserProjects,
	getAllOwnedProjects,
	getAllAssignedProjects,
	createProject,
	updateProject,
	deleteProject,
	ProjectDataPostProps,
	ProjectDataPutProps,
} from '@utils/projects';

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
	heading: {
		textAlign: 'center',
		color: '#007BFF',
		margin: '20px 0'
	},
	subheading: {
		color: '#007BFF',
		margin: '20px 0'
	},
};

type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ label, value, onChange }) => (
	<div style={styles.form}>
		<label>{label}</label>
		<input style={styles.input} type="text" value={value} onChange={onChange} />
	</div>
);

export default function Page() {
	const [projectId, setProjectId] = useState('');
	const [relationship, setRelationship] = useState('');
	const [relationshipData, setRelationshipData] = useState<ProjectDataPutProps>({
		data: {}
	});
	const [userId, setUserId] = useState('');
	const [projectData, setProjectData] = useState<ProjectDataPostProps>({
		data: {
			attributes: {
				name: '',
				description: '',
				type: '',
				team_in_charge: ''
			}
		}
	});

	const logRequest = (msg: string, request: Promise<any>) => {
		console.log(`Sending ${msg} request...`);
		return request
			.then((response) => {
				console.log(`${msg} response:`, response);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handlers = {
		getProjectRelationship: () => logRequest('GET Project Relationship', getProjectRelationship(projectId, relationship)),
		updateProjectRelationship: () => logRequest('UPDATE Project Relationship', updateProjectRelationship(projectId, relationship, relationshipData)),
		getSingleProject: () => logRequest('GET Single Project', getSingleProject(projectId)),
		getAllUserProjects: () => logRequest('GET All User Projects', getAllUserProjects(userId)),
		getAllOwnedProjects: () => logRequest('GET All Owned Projects', getAllOwnedProjects(userId)),
		getAllAssignedProjects: () => logRequest('GET All Assigned Projects', getAllAssignedProjects(userId)),
		createProject: () => logRequest('CREATE Project', createProject(userId, projectData)),
		updateProject: () => logRequest('UPDATE Project', updateProject(projectId, projectData)),
		deleteProject: () => logRequest('DELETE Project', deleteProject(projectId)),
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.heading}>Projects</h1>
			<br /><br /><br />

			{/* Get Project Relationship */}
			<h2 style={styles.subheading}>Get Project Relationship</h2>
			<Input
				label="Project ID"
				value={projectId}
				onChange={(e) => setProjectId(e.target.value)}
			/>
			<Input
				label="Relationship"
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.getProjectRelationship}>Get Relationship</button>
			<br /><br /><br />

			{/* Update Project Relationship */}
			<h2 style={styles.subheading}>Update Project Relationship</h2>
			<Input
				label="Project ID"
				value={projectId}
				onChange={(e) => setProjectId(e.target.value)}
			/>
			<Input
				label="Relationship"
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
			/>
			<div style={styles.form}>
				<label>Relationship Data</label>
				<textarea
					style={styles.input}
					value={JSON.stringify(relationshipData)}
					onChange={(e) => setRelationshipData(JSON.parse(e.target.value))}
				/>
			</div>
			<button style={styles.button} onClick={handlers.updateProjectRelationship}>Update Relationship</button>
			<br /><br /><br />

			{/* Get Single Project */}
			<h2 style={styles.subheading}>Get Single Project</h2>
			<Input
				label="Project ID"
				value={projectId}
				onChange={(e) => setProjectId(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.getSingleProject}>Get Single Project</button>
			<br /><br /><br />

			{/* Get All User Projects */}
			<h2 style={styles.subheading}>Get All User Projects</h2>
			<Input
				label="User ID"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.getAllUserProjects}>Get All User Projects</button>
			<br /><br /><br />

			{/* Get All Owned Projects */}
			<h2 style={styles.subheading}>Get All Owned Projects</h2>
			<Input
				label="User ID"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.getAllOwnedProjects}>Get All Owned Projects</button>
			<br /><br /><br />

			{/* Get All Assigned Projects */}
			<h2 style={styles.subheading}>Get All Assigned Projects</h2>
			<Input
				label="User ID"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.getAllAssignedProjects}>Get All Assigned Projects</button>
			<br /><br /><br />

			{/* Create Project */}
			<h2 style={styles.subheading}>Create Project</h2>
			<Input
				label="User ID"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<Input
				label="Name"
				value={projectData.data.attributes.name}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							name: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Description"
				value={projectData.data.attributes.description}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							description: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Type"
				value={projectData.data.attributes.type}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							type: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Team in Charge"
				value={projectData.data.attributes.team_in_charge as string}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							team_in_charge: e.target.value
						}
					}
				})}
			/>
			<button style={styles.button} onClick={handlers.createProject}>Create Project</button>
			<br /><br /><br />

			{/* Update Project */}
			<h2 style={styles.subheading}>Update Project</h2>
			<Input
				label="Project ID"
				value={projectId}
				onChange={(e) => setProjectId(e.target.value)}
			/>
			<Input
				label="Name"
				value={projectData.data.attributes.name}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							name: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Description"
				value={projectData.data.attributes.description}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							description: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Type"
				value={projectData.data.attributes.type}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							type: e.target.value
						}
					}
				})}
			/>
			<Input
				label="Team in Charge"
				value={projectData.data.attributes.team_in_charge as string}
				onChange={(e) => setProjectData({
					...projectData,
					data: {
						...projectData.data,
						attributes: {
							...projectData.data.attributes,
							team_in_charge: e.target.value
						}
					}
				})}
			/>
			<button style={styles.button} onClick={handlers.updateProject}>Update Project</button>
			<br /><br /><br />

			{/* Delete Project */}
			<h2 style={styles.subheading}>Delete Project</h2>
			<Input
				label="Project ID"
				value={projectId}
				onChange={(e) => setProjectId(e.target.value)}
			/>
			<button style={styles.button} onClick={handlers.deleteProject}>Delete Project</button>
			<br /><br /><br />
		</div>
	);
}

// Signé CHAT-GPT