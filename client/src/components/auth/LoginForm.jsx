import { useState } from 'react';
import Inputs from "../ui/Inputs";
import Button from '@/components/ui/Buttons';
import AuthLayout from './AuthLayout';
import { signin } from '@/services/authServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
const LoginForm = () => {
    const { setIsAuthenticated, setIsError, isError, setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setIsError('');
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
                setIsAuthenticated(true);
                setUser({username: response.data.user.username})
                navigate('/dashboard');
            }
        } catch(err){
            setIsError(err.message);
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
                {isError && <p className="error">{isError}</p>}
                <Button type="submit" variant="success" width='full'>
                    Login
                </Button>   
            </form>
        </AuthLayout>            
    );
}
export default LoginForm;