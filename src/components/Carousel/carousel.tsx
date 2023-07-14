import { ReactNode, Children, useState, useEffect } from 'react';

import {
	SCCarouselContainer,
	SCCarouselWrapper,
	SCCarouselButtonGraphic,
	SCCarouselButton,
	SCCarouselContentWrapper,
	SCCarouselContent,
} from './styles';
import Emoji from '../../utils/emoji';

interface ICarouselProps {
	children: ReactNode;
}
export const Carousel = ({ children }: ICarouselProps): JSX.Element => {
	/* Current viewed item in the carousel */
	const [currentIndex, setCurrentIndex] = useState(0);
	/* Length of items in the carousel */
	const [length, setLength] = useState(Children.count(children));

	/* The number could change in Admin mode */
	useEffect(() => {
		setLength(Children.count(children));
	}, [children]);

	/* Right Arrow Handler */
	const next = () => {
		if (currentIndex < length - 1) {
			setCurrentIndex((prevState) => prevState + 1);
		} else {
			setCurrentIndex(0);
		}
	};

	/* Left Arrow Handler */
	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevState) => prevState - 1);
		} else {
			setCurrentIndex(length - 1);
		}
	};

	/* DO THE THING */
	return (
		<SCCarouselContainer id="CarouselContainer">
			<SCCarouselWrapper id="CarouselWrapper">
				<SCCarouselButton
					onClick={prev}
					className="leftButton"
					id="CarouselLeftButtonContainer"
				>
					{length > 1 && (
						<SCCarouselButtonGraphic>
							<Emoji label="left arrow" symbol="⬅️" />
						</SCCarouselButtonGraphic>
					)}
				</SCCarouselButton>
				<SCCarouselContentWrapper id="CarouselContentWrapper">
					<SCCarouselContent $currentidx={currentIndex} id="CarouselContent">
						{children}
					</SCCarouselContent>
				</SCCarouselContentWrapper>
				{length > 1 && (
					<SCCarouselButton
						className="rightButton"
						onClick={next}
						id="CarouselRightButtonContainer"
					>
						<SCCarouselButtonGraphic>
							<Emoji label="right arrow" symbol="➡️" />
						</SCCarouselButtonGraphic>
					</SCCarouselButton>
				)}
			</SCCarouselWrapper>
		</SCCarouselContainer>
	);
};

export default Carousel;
