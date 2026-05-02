import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authServices';
import Inputs from "../ui/Inputs";
import Button from '../ui/Buttons';
import AuthLayout from './AuthLayout';
const RegisterForm = () => {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [formData, setFormData] = useState({
        username: "",
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
        if(!formData.username || !formData.email || !formData.password){
            setError('All fields are required');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await signup(formData);
            if(response.status === 201){
                navigate('/dashboard');
                console.log('Registration Successful');
            } 
        } catch(err) {
            setError("This email already exist. Try logging in", err);
            
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
                {error && <p className="error">{error}</p>}
                <Button type="submit" variant="success" width='full' loading={loading}>
                    Register
                </Button>
            </form>
        </AuthLayout>
                
    );
}
export default RegisterForm;