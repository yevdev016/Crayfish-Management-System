import { useState } from 'react'
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import AuthLayout from './AuthLayout';
import { signin } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {value, name} = e.target;

        setFormData(prevData => ({
            ...prevData, 
            [name]: value})
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signin(formData);
            if(response.status === 200){
                navigate('/dashboard');
            }
        } catch(err){
            console.log(err)
        }
    }
    return(
        <AuthLayout isLogin={true}>
            <form onSubmit={handleSubmit}>
                <Inputs 
                label="email" 
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

                <Button type="submit" variant="success" width='full'>
                    Login
                </Button>   
            </form>
        </AuthLayout>            
    );
}
export default LoginForm;