import { Link } from 'react-router-dom';
import './Header.css';
import logo from '@/assets/LOGO-CRAYFISH.png';
function Header(){
    return(
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src={logo} alt="Logo" />
                </Link>
                <nav>
                    <Link to="register">Register</Link>
                    <Link to="login">Sign In</Link>
                </nav>
            </div>
        </header>
    );
}
export default Header;