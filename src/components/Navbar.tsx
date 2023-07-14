import { Link } from 'react-router-dom';

const Navbar = ():JSX.Element => {
    return (
        <nav className='nbcNav'>
            <Link to='/' className='homePageLink'>
                Home
            </Link>
            <Link to='/list' className='masterListLink'>
                Main List
            </Link>
        </nav>
    );
};

export default Navbar;