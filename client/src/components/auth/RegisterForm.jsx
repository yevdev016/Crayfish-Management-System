import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authServices';
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';
const RegisterForm = () => {
    const { setIsAuthenticated, setIsError, isError } = useAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
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
        if(!formData.username || !formData.email || !formData.password){
            setIsError('All fields are required');
            return;
        }
        setLoading(true);
        setIsError('');

        try {
            const response = await signup(formData);
            if(response.status === 201){
                setIsAuthenticated(true);
                navigate('/dashboard');
                console.log('Registration Successful');
            } 
        } catch(err) {
            setIsError(err.message);
            
        } finally{
            setLoading(false);
        }
    };
    return(
        <AuthLayout>
            <form onSubmit={handleSubmit}>
        
                <Inputs 
                label="Username" 
                id="username" 
                type="text" 
                onChange={handleChange} 
                value={formData.username}
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
                {isError && <p className="error">{isError}</p>}
                <Button type="submit" variant="success" width='full' loading={loading}>
                    Register
                </Button>
            </form>
        </AuthLayout>
                
    );
}
export default RegisterForm;