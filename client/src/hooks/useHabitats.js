import { useState, useEffect } from 'react'
import * as habitatService from '../services/habitatServices'

const useHabitats = () => {
    const [ habitats, setHabitats ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchHabitats = async () => {
            try {
                const data = await habitatService.getHabitats();
                setHabitats(data);
            } catch(err){
                console.error(err)
            } finally {
                setIsLoading(false);
            }
        }
        fetchHabitats();
    }, []);
    const addHabitat = async(data) => {
        const habitat = await habitatService.createHabitat(data);
        setHabitats(prevData => [...prevData, habitat]);
    }

    const updateHabitat = async(id, data) => {
        const habitat = await habitatService.updateHabitat(id, data);
        setHabitats(prevData => prevData.map(h => h.id === id ? habitat : h));
    }

    const deleteHabitat = async(id) => {
        await habitatService.deleteHabitat(id);
        setHabitats(prevData => prevData.filter(h => h.id !== id));
    }

    return { habitats, addHabitat, updateHabitat, deleteHabitat, isLoading }
}

export default useHabitats
