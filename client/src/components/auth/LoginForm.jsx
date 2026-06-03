import { useState, useRef, useEffect } from 'react';
import Inputs from "../ui/Inputs";
import Button from '@/components/ui/Buttons';
import AuthLayout from './AuthLayout';
import { signin, verifyOtp, resendOtp } from '@/services/authServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const OtpForm = ({ email, onVerified, onCancel }) => {
    const { setIsError, isError } = useAuth()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [resendTimer, setResendTimer] = useState(60)
    const otpRefs = useRef([])

    useEffect(() => {
        if (resendTimer > 0) {
            const id = setInterval(() => setResendTimer(t => t - 1), 1000)
            return () => clearInterval(id)
        }
    }, [resendTimer])

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 5) otpRefs.current[index + 1].focus()
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1].focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const code = otp.join('')
        if (code.length !== 6) { setIsError('Please enter the full 6-digit code'); return }
        setLoading(true)
        setIsError('')
        try {
            await verifyOtp(email, code)
            onVerified()
        } catch (err) {
            setIsError(err.message)
        } finally { setLoading(false) }
    }

    const handleResend = async () => {
        if (resendTimer > 0) return
        try { await resendOtp(email); setResendTimer(60); setIsError('') }
        catch (err) { setIsError(err.message) }
    }

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: 8, color: '#1e293b' }}>Verify Your Email</h2>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
                Enter the code sent to <strong>{email}</strong>
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
                {otp.map((digit, i) => (
                    <input key={i} ref={el => otpRefs.current[i] = el} type="text" inputMode="numeric"
                        maxLength={1} value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        style={{ width: 48, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 700, border: '2px solid #e2e8f0', borderRadius: 10, outline: 'none', ...(digit ? { borderColor: '#2563eb' } : {}) }}
                    />
                ))}
            </div>
            {isError && <p className="error" style={{ marginBottom: 16 }}>{isError}</p>}
            <Button type="submit" variant="success" width='full' loading={loading}>Verify Email</Button>
            <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>
                {resendTimer > 0
                    ? `Resend code in ${resendTimer}s`
                    : <span onClick={handleResend} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Resend code</span>
                }
            </p>
            <p style={{ marginTop: 8 }}>
                <span onClick={onCancel} style={{ color: '#64748b', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                    Back to login
                </span>
            </p>
        </form>
    )
}

const LoginForm = () => {
    const { setIsAuthenticated, setIsError, isError, setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [verifyEmail, setVerifyEmail] = useState('')

    const handleChange = (e) => {
        setIsError('');
        const {value, name} = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
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
            if (err.response?.status === 403 && err.response?.data?.email) {
                setVerifyEmail(err.response.data.email)
            } else {
                setIsError(err.message);
            }
        }
    }

    const handleVerified = async () => {
        try {
            const response = await signin(formData);
            if (response.status === 200) {
                setIsAuthenticated(true)
                setUser({ username: response.data.user.username })
                navigate('/dashboard')
            }
        } catch (err) {
            setIsError(err.message)
        }
    }

    if (verifyEmail) {
        return (
            <AuthLayout isLogin={true}>
                <OtpForm email={verifyEmail} onVerified={handleVerified} onCancel={() => setVerifyEmail('')} />
            </AuthLayout>
        )
    }

    return(
        <AuthLayout isLogin={true}>
            <form onSubmit={handleSubmit}>
                <Inputs label="email" id="email" type="email" onChange={handleChange} value={formData.email} />
                <Inputs label="Password" id="password" type="password" onChange={handleChange} value={formData.password} />
                {isError && <p className="error">{isError}</p>}
                <Button type="submit" variant="success" width='full'>Login</Button>   
            </form>
        </AuthLayout>            
    );
}
export default LoginForm;