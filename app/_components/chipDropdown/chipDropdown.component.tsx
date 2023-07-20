import Link from 'next/link';
import './chipDropdown.styles.scss';
import { white } from '@scss/variables';
import React from 'react';
import { NavItem } from '@interface/nav.interface';

export default function ChipDropdown({
	text,
	icon,
	dropDownContent,
	setIsSelected,
	isSelected,
	type,
}: {
  text: string;
  icon?: React.JSX.Element;
  dropDownContent: NavItem[];
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'primary' | 'secondary' | 'alert' | 'success' | 'warning' | 'info';
}) {
	return (
		<div className="chipDropdown">
			<button
				className={'chipButton ' + `${type ? type + '-' : 'primary-'}chip`}
				onClick={() => setIsSelected(!isSelected)}
			>
				{icon ? (
					<div className="chipIcon">
						{React.cloneElement(icon, {
							color: isSelected ? (type ? type : 'primary') : white,
							size: 20,
						})}
					</div>
				) : null}

				<p className="chipText">{text}</p>
			</button>
			{isSelected ? (
				<div className="chipDropdownContent">
					{dropDownContent.map((item, index) => (
						<Link href={item.link as string} key={index}>
							{item.name}
						</Link>
					))}
				</div>
			) : null}
		</div>
	);
}
