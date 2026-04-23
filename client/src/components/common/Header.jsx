import './Header.css'
import logo from '@/assets/LOGO-CRAYFISH.png'
function Header(){
    return(
        <header className="header">
            <div className="header-container">
                <a href="#" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
                <nav>
                    <a href="">Sign Up</a>
                    <a href="">Sign In</a>
                </nav>
            </div>
        </header>
    );
}
export default Header;