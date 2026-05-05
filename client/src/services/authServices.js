import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData, {
            withCredentials: true
        });
        return response;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || 'Error occurred during signup');
        } else if (err.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};
export const signin = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signin`, userData, {
            withCredentials: true
        });
        return response;
    } catch(err) {
        if (err.response) {
            throw new Error(err.response.data.message || 'Error occurred during signin');
        } else if (err.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}
export const signout = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/signout`,{}, {
            withCredentials: true
        });
        console.log(response.data)
        return response.data
    } catch (err){
        console.log("Error logging out", err)
        throw err
    }
}

