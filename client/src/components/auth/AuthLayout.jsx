import { Link } from 'react-router-dom'
import './AuthLayout.css'
import google from '@/assets/icon-google.svg'
import logo from '@/assets/LOGO-CRAYFISH.png'
const AuthLayout = ({children, isLogin}) => {
    return(
         <div className='auth-container'>
            <div className='logo-container'>
                <img className='img-logo' src={logo} alt="Logo" />
            </div>

            {children}

            <div className='divider'>
                <span>OR</span>
            </div>

            <a href="" className='google-btn'>
                <img src={google} alt="Google" />
                Continue with google
            </a>
            <div className='terms-services-container'>
                <span>By {isLogin ? "signing in" : "creating an account"}, you agree to our <Link>Terms of Service</Link> and <Link>Privacy Policy.</Link></span>
            </div>
            <div className='footer-link'>
                {isLogin ? (
                    <span>Don't have an account? <Link to="/register">Register</Link></span>

                ): (
                    <span>Already have an account? <Link to="/login">Sign In</Link></span>
                )
                }
            </div>
        </div>
    );
}
export default AuthLayout;