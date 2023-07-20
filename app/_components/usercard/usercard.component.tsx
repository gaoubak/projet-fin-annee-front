import Image from 'next/image';
import './usercard.styles.scss';
import React from 'react';

export default function UserCard({
	profilePicture,
	name,
	role,
	email,
	action,
}: {
  profilePicture: string;
  name: string;
  role: string;
  email: string;
  action?: React.JSX.Element;
}) {
	return (
		<div className="user-card">
			<Image
				src={
					profilePicture
						? profilePicture
						: '/images/default-profile-picture.jpg'
				}
				alt="Profile Picture"
				width={500}
				height={500}
				className="user-card__profile-picture"
			/>
			<div className="user-card__name">{name}</div>
			<div className="user-card__email">{email}</div>
			<div className="user-card__role">{role}</div>

			{action ? <div className="user-card__action">{action}</div> : null}
		</div>
	);
}
