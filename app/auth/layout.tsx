import './layout.styles.scss';
export default function Layout(props: { children: React.ReactNode }) {
	return (
		<main id="connection-layout">
			<div id="connection-layout__content">{props.children}</div>
		</main>
	);
}