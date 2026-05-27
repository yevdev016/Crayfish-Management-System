import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const getLifecycle = async () => {
    try {
        const res = await axios.get(`${API_URL}/lifecycle`, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const addLifecycle = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/lifecycle`, data, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}
