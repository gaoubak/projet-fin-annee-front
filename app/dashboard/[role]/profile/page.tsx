'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HiMiniArrowUturnLeft, HiPencilSquare } from 'react-icons/hi2';

import './profilePage.styles.scss';

export const isUserLoggedIn = () => {
	return JSON.parse(localStorage.getItem('user') || '{}');
};

export default function ProfilePage() {
	console.log('là', isUserLoggedIn());

	const userProfilInfos = isUserLoggedIn();

	const [modificateProfil, setModificateProfil] = useState(false);

	console.log(modificateProfil);

	const editProfile = () => {
		setModificateProfil(!modificateProfil);
	};

	return (
		<div>
			<div className="topProfile">
				<h1>Profil</h1>
				{modificateProfil ? (
					<button className="buttonEditProfil" onClick={editProfile}>
						<HiMiniArrowUturnLeft className="iconEditProfil" />
						<p className="textEditProfil">Annuler</p>
					</button>
				) : (
					<button className="buttonEditProfil" onClick={editProfile}>
						<HiPencilSquare className="iconEditProfil" />
						<p className="textEditProfil">Modifier le profil</p>
					</button>
				)}
			</div>

			<div className="profilePage_container">
				<Image
					src={
						'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
					}
					alt="Profile Picture"
					width={500}
					height={500}
					className="user-chip__profile-picture"
				/>
				<p className="profilePage_name">
					{userProfilInfos.user.attributes.name}
					{' - '}
					{userProfilInfos.user.attributes.role}
				</p>
				<p className="profilePage_email">
					{userProfilInfos.user.attributes.email}
				</p>
				<p className="profilePage_id">
					{'Identifiant : '}
					{userProfilInfos.user.id}
				</p>
			</div>
			<div className="contentProfile">
				{modificateProfil ? 'Il est true' : 'Il est false'}
			</div>
		</div>
	);
}
