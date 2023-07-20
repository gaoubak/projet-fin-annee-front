import Image from 'next/image';
import './userChip.styles.scss';
export default function UserChip({
	userInfo,
	showText,
}: {
  userInfo: {
    avatar?: string;
    role: string;
    name:string;
    email:string;
  };
  showText?: boolean;
}) {
	return (
		<div className="user-chip">
			<Image
				src={userInfo.avatar ||'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
				alt="Profile Picture"
				width={500}
				height={500}
				className="user-chip__profile-picture"
			/>
			{showText && (
				<div className="user-info">
					<abbr title={userInfo.email}>
						<p className="user-name">{userInfo.name} </p>
						<p className="user-role">{userInfo.role}</p>
					</abbr>
				</div>
			)}
		</div>
	);
}
