import { useState } from 'react'
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import AuthLayout from './AuthLayout';
const LoginForm = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
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
        <AuthLayout isLogin={true}>
            <form onSubmit={handleSubmit}>
                <Inputs 
                label="Username" 
                id="userName" 
                type="text" 
                onChange={handleChange} 
                value={formData.userName}
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