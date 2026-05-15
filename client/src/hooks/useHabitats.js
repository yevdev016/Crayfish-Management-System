import { useState } from 'react'

const mockHabitats = [
    { id: 1, name: 'Pond Alpha', image: null, species: 'Red Swamp Crayfish', count: 120, stage: 'Adult' },
    { id: 2, name: 'Tank Beta', image: null, species: 'Signal Crayfish', count: 45, stage: 'Juvenile' },
    { id: 3, name: 'Pond Gamma', image: null, species: 'Marbled Crayfish', count: 78, stage: 'Crayling' },
    { id: 4, name: 'Tank Delta', image: null, species: 'Red Swamp Crayfish', count: 12, stage: 'Berried' },
]

const useHabitats = () => {
    const [habitats, setHabitats] = useState(mockHabitats)

    const addHabitat = (habitat) => {
        setHabitats(prev => [...prev, { ...habitat, id: Date.now() }])
    }

    const updateHabitat = (id, data) => {
        setHabitats(prev => prev.map(h => h.id === id ? { ...h, ...data } : h))
    }

    const deleteHabitat = (id) => {
        setHabitats(prev => prev.filter(h => h.id !== id))
    }

    return { habitats, addHabitat, updateHabitat, deleteHabitat }
}

export default useHabitats
