'use client';

import { iconSize,  white } from '@scss/variables';
import './chip.styles.scss';
import React from 'react';

export default function Chip({
	text,
	icon,
	type,
	isSelected,
	setIsSelected,
	onClicked,
	beDark,
}: {
  text: string;
  icon?: React.JSX.Element;
  type?: 'primary' | 'secondary' | 'alert' | 'success' | 'warning' | 'info';
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
    onClicked?: () => void;
    beDark?: boolean;
}) {
	return (
		<button
			className={
				'chipButton ' +
        `${isSelected ? 'chipSelected ' : ''} ` +
        `${type ? type + '-' : 'primary-'}chip` +
        `${beDark ? ' beBlack' : ''}`
			}
			onClick={() => {
				setIsSelected(!isSelected);
				if (onClicked) {
					onClicked();
				}
			}}
		>
			{icon ? (
				<div className="chipIcon">
					{React.cloneElement(icon, {
						/* color: isSelected ? primary : white, 
            color depends on type and isSelected
            */
						color: isSelected ? (type ? type : 'primary') : white,
						size: iconSize,
					})}
				</div>
			) : null}

			<p className={isSelected ? 'chipTextSelected' : 'chipText'}>{text}</p>
		</button>
	);
}
