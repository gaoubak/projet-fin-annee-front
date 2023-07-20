import '@scss/globals.scss';

export const metadata = {
	title: 'Masterclass',
	description: 'Your online courses platform',
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
