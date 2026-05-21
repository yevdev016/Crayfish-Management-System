import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export const getHabitats = async () => {
    try {
        const res = await axios.get(`${API_URL}/habitats`, { withCredentials: true });
        return res.data;
    } catch(err) {
        console.error(err)
        throw err
    }
    
}
export const createHabitat = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/habitats`, data, { withCredentials: true });
        return res.data;
    } catch(err) {
        console.error(err)
        throw err
    }
 
}

export const updateHabitat = async (id, data) => {
    try {
        const res = await axios.put(`${API_URL}/habitats/${id}`, data, { withCredentials: true });
        return res.data;
    } catch(err) {
        console.error(err)
        throw err
    }
}
export const deleteHabitat = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/habitats/${id}`, { withCredentials: true });
        return res.data;
    } catch(err) {
        console.error(err)
        throw err
    }
}