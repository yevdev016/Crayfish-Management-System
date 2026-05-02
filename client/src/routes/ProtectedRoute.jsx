import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({setIsAuthenticated, isAuthenticated}) => {
    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth/check-auth`, {withCredentials: true});
                if(response.status === 200) setIsAuthenticated(true);
            } catch (err) {
                console.log(err.message)
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [isAuthenticated, setIsAuthenticated]);

    if(loading) return <div>Loading...</div>
    if(!isAuthenticated) return <Navigate to="/login"/>
    return <Outlet />
}
export default ProtectedRoute;