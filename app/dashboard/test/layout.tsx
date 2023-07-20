'use client';
import React, { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const styles: { [key: string]: CSSProperties } = {
	nav: {
		backgroundColor: '#f5f5f5',
		padding: '20px',
		display: 'flex',
		overflowX: 'auto',
	},
	ul: {
		listStyleType: 'none',
		margin: 0,
		padding: 0,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: '10px',
	},
	li: {
		margin: '0 10px',
	},
	a: {
		textDecoration: 'none',
		color: '#333',
		fontWeight: 'bold',
		fontSize: '16px',
	}
};

const Layout: React.FC<LayoutProps> = ({ children }) => {

	return (
		<div>
			<nav style={styles.nav}>
				<ul style={styles.ul}>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/users">Users
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/tickets">Tickets
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/students">Students
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/projects">Projects
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/professors">Professors
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/productionItems">Production Items
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/orchestres">Orchestres
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/instrument">Instrument
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/files">Files
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.a} href="/dashboard/test/comments">Comments
						</Link>
					</li>
				</ul>
			</nav>
			<div>{children}</div>
		</div>
	);
};

export default Layout;
