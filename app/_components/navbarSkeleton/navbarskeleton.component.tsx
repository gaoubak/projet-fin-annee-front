'use client';
import Chip from '@components/chip/chip.components';
import UserChip from '@components/userChip/userChip.component';
import { logout } from '@utils/session';
import { useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import './navbarskeleton.styles.scss';

export default function NavBarSkeleton() {
	const chipRepetition = 4;

	const [isSelected, setIsSelected] = useState({
		dashboard: false,
		project: false,
		moderator: false,
		settings: false,
		logout: false,
	});

	const setIsSelectedHandler = (chipName: string) => {
		return () => {
			// reset all the chips
			setIsSelected({
				dashboard: false,
				project: false,
				moderator: false,
				settings: false,
				logout: false,
			});
			// set the selected chip
			setIsSelected((prevState) => {
				return {
					...prevState,
					[chipName]: true,
				};
			});
		};
	};

	return (
		<nav>
			<UserChip
				userInfo={{
					avatar: '',
					role: 'Loading...',
					name: 'Loading...',
					email: 'Loading...',
				}}
				showText={true}
			/>
			<div className="nav-content">
				{Array.from({ length: chipRepetition }).map((_, index) => (
					<div key={index} className="chip-chargement">
						<div className="icon-chip"></div>
						<div className="content-chip"></div>
					</div>
				))}
			</div>
			<div className="bottom-btn">
				<Chip
					type="warning"
					text={'Logout'}
					setIsSelected={setIsSelectedHandler('logout')}
					isSelected={isSelected.logout}
					icon={<HiLogout />}
					onClicked={() => {
						logout();
						window?.location?.reload();
					}}
				/>
			</div>
		</nav>
	);
}
