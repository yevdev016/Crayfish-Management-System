import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export const getActivities = async () => {
    const res = await axios.get(`${API_URL}/activities`, { withCredentials: true })
    return res.data
}
