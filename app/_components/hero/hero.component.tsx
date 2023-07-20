import Image from 'next/image';
import './hero.styles.scss';
interface HeroProps {
  image: string;
  children: React.ReactNode;
}

export default function Hero({ image, children }: HeroProps) {
	return (
		<div className={'hero'}>
			<div className="hero__content">{children}</div>
			<div className={'hero__image'}>
				<Image src={image} alt="hero" fill quality={100} sizes={'100vw'} />
			</div>
		</div>
	);
}
