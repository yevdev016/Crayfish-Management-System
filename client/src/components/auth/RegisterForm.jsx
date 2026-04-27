import { useState } from 'react'
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import AuthLayout from './AuthLayout';
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
        <AuthLayout>
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
        </AuthLayout>
                
    );
}
export default RegisterForm;