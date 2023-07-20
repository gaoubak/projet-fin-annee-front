import Badge from '@components/badge/badge.component';
import { HiExternalLink } from 'react-icons/hi';
import './projectcard.styles.scss';
export default function ProjectCard({
	icon,
	status,
	progress,
	name,
	role,
	type,
}: {
  icon: React.JSX.Element;
  status: string;
  progress: number;
  name: string;
  role: string;
  type: string;
}) {
	return (
		<div className="project-card">
			<div className="project-card_top">
				<div className="project-card__icon">
					<Badge icon={icon} type="info" />
				</div>
				<div className="project-card__link">
					<Badge icon={<HiExternalLink size="24" />} type="transparent" />
				</div>
			</div>
			<div className="project-card_bottom">
				<span className="role">{type}</span>
				<p className="progress">
					{progress}% - {status}
				</p>
				<p className="whom">
          @{name} - {role}
				</p>
			</div>
		</div>
	);
}
