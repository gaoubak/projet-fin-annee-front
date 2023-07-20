'use client';
import './projectList.styles.scss';
import Chip from '@components/chip/chip.components';
import { HiPlus } from 'react-icons/hi2';
import Badge from '@components/badge/badge.component';
import { useState } from 'react';

interface projectListProps {
  list: Array<{
    name: string;
    id: string;
  }>;
}

export default function ProjectList() {
	const list: projectListProps['list'] = [
		{
			name: 'Project 1',
			id: '1',
		},
		{
			name: 'Project 2',
			id: '2',
		},
		{
			name: 'Project 3',
			id: '3',
		},
	];

	const [selected, setSelected] = useState(list[0].id);

	return (
		<>
			<div className={'project_list'}>
				<div className={'project_list__header'}>
					<h3>Projects en cours</h3>
					{list.map((item) => (
						<Chip
							beDark
							isSelected={selected === item.id}
							setIsSelected={() => setSelected(item.id)}
							text={item.name} key={item.id} />
					))}
				</div>
				<Chip
					beDark
					isSelected={false}
					setIsSelected={() => {}}
					text="Create new project"
					icon={<Badge icon={<HiPlus />} type="transparent" />}
				/>
			</div>
		</>
	);
}
