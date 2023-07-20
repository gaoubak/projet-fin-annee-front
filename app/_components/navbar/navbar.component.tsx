'use client';
import Chip from '@components/chip/chip.components';
import './navbar.styles.scss';
import UserChip from '@components/userChip/userChip.component';
import ChipDropdown from '@components/chipDropdown/chipDropdown.component';
import { useEffect, useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import { NavItem } from '@interface/nav.interface';
import { logout } from '@utils/session';

export default function NavBar({
	userInfo,
	navItems,
	isExpanded,
}: {
  userInfo: {
    avatar: string;
    role: string;
    name: string;
    email: string;
  };
  navItems: NavItem[];
  isExpanded: boolean;
}) {
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

	useEffect(() => {
		console.log('navItems', navItems);
		console.log('userInfo', userInfo);
	}, []);

	return (
		<nav>
			<UserChip userInfo={userInfo} showText={isExpanded} />
			<div className="nav-content">
				{navItems.map((item) => {
					if (item.type === 'link') {
						return (
							<Chip
								key={item.name}
								text={isExpanded ? item.name : ''}
								icon={item.icon}
								setIsSelected={setIsSelectedHandler(item.name)}
								isSelected={isSelected[item.name as keyof typeof isSelected]}
								onClicked={() => {
									window?.location?.assign(item.link as string);
								}}
							/>
						);
					} else if (item.type === 'dropdown') {
						return (
							<ChipDropdown
								key={item.name}
								dropDownContent={item.items as NavItem[]}
								text={isExpanded ? item.name : ''}
								icon={item.icon}
								setIsSelected={setIsSelectedHandler(item.name)}
								isSelected={isSelected[item.name as keyof typeof isSelected]}
								type="primary"
							/>
						);
					}
				})}
			</div>
			<div className="bottom-btn">
				<Chip
					type="warning"
					text={isExpanded ? 'Logout' : ''}
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
