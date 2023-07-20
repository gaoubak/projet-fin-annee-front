import ProjectList from '@components/projectList/projectList.component';
import ProjectCard from '@components/projectcard/projectcard.component';
import Badge from '@components/badge/badge.component';
import {HiFolder} from 'react-icons/hi2';
import './project.style.scss';

export default function ProjectDashboard() {

	return (
		<div className="project">
			<ProjectList />
			<div className={'project_content'}>
				<ProjectCard
					icon={<Badge icon={<HiFolder />} type="info" />}
					status="In progress"
					progress={50}
					name="John Doe"
					role="Developer"
					type="Web"
				/>
				<ProjectCard
					icon={<Badge icon={<HiFolder />} type="info" />}
					status="In progress"
					progress={50}
					name="John Doe"
					role="Developer"
					type="Web"
				/>
				<ProjectCard
					icon={<Badge icon={<HiFolder />} type="info" />}
					status="In progress"
					progress={50}
					name="John Doe"
					role="Developer"
					type="Web"
				/>
				<ProjectCard
					icon={<Badge icon={<HiFolder />} type="info" />}
					status="In progress"
					progress={50}
					name="John Doe"
					role="Developer"
					type="Web"
				/>
			</div>
		</div>
	);
}