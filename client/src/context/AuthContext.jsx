import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ user, setUser ] = useState(null);
    const [isError, setIsError] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth/check-auth`, {
                    withCredentials: true,
                });
                const user = response.data.username;
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser({username: user.charAt(0).toUpperCase() + user.slice(1)});
                }
            } catch (err) {
                console.log(err);
                setIsAuthenticated(false);
                setUser(null);
                setIsError('');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, isError, setIsError, setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
   return useContext(AuthContext)
};