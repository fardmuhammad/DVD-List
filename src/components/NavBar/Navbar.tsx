import { Link } from 'react-router-dom';
import { SCNavBar, SCNavBarLinks } from './styles';

/* Navigation bar for the top of the page */
const Navbar = (): JSX.Element => {
	return (
		<SCNavBar className="dvdNav" id="navigationBar">
			<SCNavBarLinks id="navigationBarZone">
				<Link to="/" className="homePageLink">
					Home
				</Link>
				<Link to="/list" className="masterListLink">
					Main List
				</Link>
				<Link to="/list?admin=true" className="masterListLink">
					Admin Mode
				</Link>
			</SCNavBarLinks>
		</SCNavBar>
	);
};

export default Navbar;
