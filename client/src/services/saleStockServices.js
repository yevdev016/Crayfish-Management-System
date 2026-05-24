import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const getSaleStock = async () => {
    try {
        const res = await axios.get(`${API_URL}/sales-stock`, { withCredentials: true })
        return res.data
    } catch (err){
        console.error(err)
        throw err
    }
}

export const addSaleStock = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/sales-stock`, data, { withCredentials: true })
        return res.data
    } catch (err){
        console.error(err)
        throw err
    }
}
export const updateSaleStock = async (id, data) => {
    try {
        const res = await axios.put(`${API_URL}/sales-stock/${id}`, data, {withCredentials: true})
        return res.data
    } catch (err){
        console.error(err)
        throw err
    }
}
export const sellStock = async (id, customerName) => {
    try {
        const res = await axios.patch(`${API_URL}/sales-stock/${id}`, {customer_name: customerName}, {withCredentials: true})
        return res.data
    }catch (err){
        console.error(err)
        throw err
    }
}
export const deleteStock = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/sales-stock/${id}`, {withCredentials: true})
        return res.data
    } catch(err) {
        console.error(err)
        throw err
    }
}