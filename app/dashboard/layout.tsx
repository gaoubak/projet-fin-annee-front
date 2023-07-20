'use client';
import NavBar from '@components/navbar/navbar.component';
import NavBarSkeleton from '@components/navbarSkeleton/navbarskeleton.component';
import { getAllRoles, getCurrentUser } from '@utils/users';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	HiBookmark as CoursesIcon,
	HiAcademicCap as DashboardIcon,
	HiArrowLeft,
	HiBookOpen as MyCoursesIcon,
	HiUser as ProfileIcon,
} from 'react-icons/hi2';
import './layout.styles.scss';

export default function Layout(props: { children: React.ReactNode }) {
	// get current route
	const [userData, setUserData] = useState();

	const [isSessionValid, setIsSessionValid] = useState(true);
	const [isExpanded, setIsExpanded] = useState(true);
	const [allowedRoles, setAllowedRoles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (getCurrentUser() === '{}') {
			redirect('/auth/login');
		}
		const user = getCurrentUser();
		setUserData(user.user.attributes);
		setIsSessionValid(true);
	}, []);

	const toggleNavbarWidth = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		fetchAllowedRoles(); // Fetch allowedRoles
	}, []);

	const fetchAllowedRoles = () => {
		getAllRoles()
			.then((res) => {
				const roles = res.data;
				const allowedRoles = roles.map((role) => role.attributes.name);
				setAllowedRoles(allowedRoles);
				console.log(allowedRoles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	return (
		<main id="dashboard-layout">
			<>
				<div
					id="nav"
					className={`navbar ${isExpanded ? 'expanded' : 'collapsed'}`}
				>
					{userData ? (
						<NavBar
							isExpanded={isExpanded}
							userInfo={userData}
							navItems={[
								{
									name: 'Dashboard',
									icon: <DashboardIcon />,
									link: '/dashboard/regisseur',
									type: 'link',
								},
								{
									name: 'Users',
									icon: <CoursesIcon />,
									link: '/dashboard/regisseur/users',
									type: 'link',
								},
								{
									name: 'Courses',
									icon: <MyCoursesIcon />,
									link: '/dashboard/regisseur/courses',
									type: 'link',
								},
								{
									name: 'My Profile',
									icon: <ProfileIcon />,
									link: '/dashboard/regisseur/profile',
									type: 'link',
								},
							]}
						/>
					) : (
						<NavBarSkeleton />
					)}
					<button className="toggle-nav-btn" onClick={toggleNavbarWidth}>
						<HiArrowLeft />
					</button>
				</div>
				{isLoading ? (
					<div id="loading-content">
						<div className="spinner"></div>
					</div>
				) : (
					<div id="content">{props.children}</div>
				)}
			</>
		</main>
	);
}
