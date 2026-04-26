import { useState } from 'react'
import { Link } from 'react-router-dom'
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import './RegisterForm.css'
import google from '@/assets/icon-google.svg'
import logo from '@/assets/LOGO-CRAYFISH.png'
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        verifyPassword: ""
    });

    const handleChange = (e) => {
        const {value, name} = e.target;

        setFormData(prevData => ({
            ...prevData, 
            [name]: value})
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return(
        <div className='sign-up-container'>
            <div className='logo-container'>
                <img className='img-logo' src={logo} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
        
                <Inputs 
                label="Username" 
                id="userName" 
                type="text" 
                onChange={handleChange} 
                value={formData.userName}
                />

                <Inputs 
                label="Email" 
                id="email" 
                type="email" 
                onChange={handleChange} 
                value={formData.email}
                />

                
                <Inputs 
                label="Password" 
                id="password" 
                type="password" 
                onChange={handleChange} 
                value={formData.password}
                />

                <Inputs 
                label="Verify Password" 
                id="verifyPassword" 
                type="password" 
                onChange={handleChange} 
                value={formData.verifyPassword}
                />

                <Button type="submit" variant="success" width='full'>
                    Register
                </Button>
                
            </form>
            <div className='divider'>
                <span>OR</span>
            </div>
            <a href="" className='google-btn'>
                <img src={google} alt="Google" />
                Continue with google
            </a>
            <div className='terms-services-container'>
                <span>By creating an account, you agree to our <Link>Terms of Service</Link> and <Link>Privacy Policy.</Link></span>
            </div>
            <span>Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
    );
}
export default RegisterForm;