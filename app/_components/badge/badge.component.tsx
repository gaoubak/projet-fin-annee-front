import Image from 'next/image';
import React from 'react';
import './badge.styles.scss';

export default function Badge({
	type,
	icon,
	onClicked,
}: {
  type:
    | 'primary'
    | 'secondary'
    | 'alert'
    | 'success'
    | 'warning'
    | 'info'
    | 'transparent';
  icon: React.JSX.Element | string;
  onClicked?: () => void;
}) {
	const handleClick = () => {
		if (onClicked) {
			onClicked();
		}
	};

	return (
		<div
			className={`badge-${type} badge`}
			onClick={handleClick}
			style={{
				cursor: onClicked ? 'pointer' : 'default',
			}}
		>
			{icon ? (
				typeof icon === 'string' ? (
					<Image src={icon} width={16} height={16} alt="icon" />
				) : (
					React.cloneElement(icon, {
						size: 24,
					})
				)
			) : null}
		</div>
	);
}
