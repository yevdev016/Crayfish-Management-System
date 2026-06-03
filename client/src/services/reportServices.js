import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export const generateReport = async(type) =>{
    try{
        const res = await axios.post(`${API_URL}/reports/generate`, { type }, {withCredentials: true});
        return res.data;
    }catch(err){
        const msg = err.response?.data?.message || 'Failed to generate report'
        throw new Error(msg)    }
}

export const getReportHistory = async () => {
  const res = await axios.get(`${API_URL}/reports/history`, { withCredentials: true })
  return res.data
}