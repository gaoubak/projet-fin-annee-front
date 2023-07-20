import Button from '@components/button/button.component';
import './layout.styles.scss';
import { HiFolder, HiArrowUpRight} from 'react-icons/hi2';
import TableExample from '@components/table/tables/tableExemple.component';
export default function EditorDashboard(props: { children: React.ReactNode }) {
	return (
		<main id="editor-dashboard">
			<h1>Welcome Samanta</h1>
			<div className="actions">
				<Button
					type="success"
					isTransparent
					text="Project"
					leftIcon={<HiFolder color="#39de54" />}
					rightIcon={<HiArrowUpRight color="#39de54" />}
				/><Button
					type="info"
					isTransparent
					text="File"
					leftIcon={<HiFolder color="#3366ff" />}
					rightIcon={<HiArrowUpRight color="#3366ff" />}
				/><Button
					type="primary"
					isTransparent
					text="Traduction"
					leftIcon={<HiFolder color="#ac37b5" />}
					rightIcon={<HiArrowUpRight color="#ac37b5" />}
				/><Button
					type="alert"
					isTransparent
					text="En attente"
					leftIcon={<HiFolder color="#ff9533" />}
					rightIcon={<HiArrowUpRight color="#ff9533" />}
				/><Button
					type="warning"
					isTransparent
					text="Alert"
					leftIcon={<HiFolder color="#ff333f" />}
					rightIcon={<HiArrowUpRight color="#ff333f" />}
				/>
			</div>
			<div className="content">
				<section className="project-dashboard">
					{props.children}
				</section>
				<section className="notifications">
                    a
				</section>
				<section className="latest-files">
					<TableExample />
				</section>
			</div>
		</main>
	);
}