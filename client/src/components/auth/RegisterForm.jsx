import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup, verifyOtp, resendOtp } from '@/services/authServices';
import Inputs from "../ui/Inputs";
import Button from '@/components/ui/Buttons';
import AuthLayout from './AuthLayout';
import { useAuth } from '@/context/AuthContext';

const RegisterForm = () => {
    const { setIsAuthenticated, setIsError, isError, setUser } = useAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ step, setStep ] = useState('register')
    const [ email, setEmail ] = useState('')
    const [ otp, setOtp ] = useState(['', '', '', '', '', ''])
    const [ resendTimer, setResendTimer ] = useState(0)
    const otpRefs = useRef([])
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (resendTimer > 0) {
            const id = setInterval(() => setResendTimer(t => t - 1), 1000)
            return () => clearInterval(id)
        }
    }, [resendTimer])

    const handleChange = (e) => {
        setIsError('');
        const {value, name} = e.target;
        setFormData(prevData => ({
            ...prevData, 
            [name]: value})
        );
    }

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 5) {
            otpRefs.current[index + 1].focus()
        }
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus()
        }
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
                setEmail(formData.email)
                setStep('otp')
                setResendTimer(60)
            } 
        } catch(err) {
            setIsError(err.message);
        } finally{
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        const code = otp.join('')
        if (code.length !== 6) {
            setIsError('Please enter the full -digit code')
            return
        }
        setLoading(true)
        setIsError('')
        try {
            const response = await verifyOtp(email, code)
            if (response.status === 200) {
                setIsAuthenticated(true)
                setUser({ username: response.data.user.username })
                navigate('/dashboard')
            }
        } catch (err) {
            setIsError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (resendTimer > 0) return
        try {
            await resendOtp(email)
            setResendTimer(60)
            setIsError('')
        } catch (err) {
            setIsError(err.message)
        }
    }

    if (step === 'otp') {
        return (
            <AuthLayout>
                <form onSubmit={handleOtpSubmit} style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: 8, color: '#1e293b' }}>Check Your Email</h2>
                    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
                        Enter the code sent to <strong>{email}</strong>
                    </p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => otpRefs.current[i] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleOtpChange(i, e.target.value)}
                                onKeyDown={e => handleOtpKeyDown(i, e)}
                                style={{
                                    width: 48, height: 56, textAlign: 'center', fontSize: 22,
                                    fontWeight: 700, border: '2px solid #e2e8f0',
                                    borderRadius: 10, outline: 'none',
                                    ...(digit ? { borderColor: '#2563eb' } : {})
                                }}
                            />
                        ))}
                    </div>
                    {isError && <p className="error" style={{ marginBottom: 16 }}>{isError}</p>}
                    <Button type="submit" variant="success" width='full' loading={loading}>
                        Verify Email
                    </Button>
                    <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>
                        {resendTimer > 0 ? (
                            `Resend code in ${resendTimer}s`
                        ) : (
                            <span
                                onClick={handleResend}
                                style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                            >
                                Resend code
                            </span>
                        )}
                    </p>
                </form>
            </AuthLayout>
        )
    }

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