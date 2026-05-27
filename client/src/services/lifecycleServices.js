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

export const updateLifecycle = async (id, data) => {
    try {
        const res = await axios.put(`${API_URL}/lifecycle/${id}`, data, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const deleteLifecycle = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/lifecycle/${id}`, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}
