import './button.styles.scss';
import Image from 'next/image';
export default function Button({
	type,
	isTransparent,
	text,
	leftIcon,
	rightIcon,
	onClicked,
	disabled,
}: {
  type: 'primary' | 'secondary' | 'alert' | 'success' | 'warning' | 'info';
  isTransparent?: boolean;
  text?: string;
  leftIcon?: React.JSX.Element | string;
  rightIcon?: React.JSX.Element | string;
  onClicked?: () => void;
  disabled?: boolean;
}) {
	return (
		<button
			className={`button type-${type ? type : 'primary'} ${
				isTransparent ? 'transparent' : ''
			}
      ${leftIcon || rightIcon ? 'with-icon' : ''}
      `}
			onClick={() => {
				onClicked && onClicked();
			}}
			disabled={disabled}
		>
			{leftIcon ? (
				typeof leftIcon === 'string' ? (
					<Image src={leftIcon} width={16} height={16} alt="icon" />
				) : (
					leftIcon
				)
			) : null}
			{text ? text : ''}
			{rightIcon ? (
				typeof rightIcon === 'string' ? (
					<Image src={rightIcon} width={16} height={16} alt="icon" />
				) : (
					rightIcon
				)
			) : null}
		</button>
	);
}
