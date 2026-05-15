import { useState, useMemo } from 'react'

const mockEntries = [
    { id: 1, habitat: 'Pond Alpha', species: 'Red Swamp Crayfish', stage: 'Adult', count: 284 },
    { id: 2, habitat: 'Tank Beta', species: 'Signal Crayfish', stage: 'Juvenile', count: 156 },
    { id: 3, habitat: 'Pond Gamma', species: 'Marbled Crayfish', stage: 'Crayling', count: 123 },
    { id: 4, habitat: 'Tank Delta', species: 'Red Swamp Crayfish', stage: 'Berried', count: 101 },
    { id: 5, habitat: 'Pond Alpha', species: 'Signal Crayfish', stage: 'Breeder', count: 63 },
]

const ITEMS_PER_PAGE = 10

const useInventory = () => {
    const [entries, setEntries] = useState(mockEntries)
    const [search, setSearch] = useState('')
    const [habitatFilter, setHabitatFilter] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(() => {
        let result = entries
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(e => e.species.toLowerCase().includes(q))
        }
        if (habitatFilter !== 'All') {
            result = result.filter(e => e.habitat === habitatFilter)
        }
        return result
    }, [entries, search, habitatFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)

    const paginated = useMemo(() => {
        const start = (safePage - 1) * ITEMS_PER_PAGE
        return filtered.slice(start, start + ITEMS_PER_PAGE)
    }, [filtered, safePage])

    const occupied = entries.map(e => e.habitat)

    const addEntry = (data) => {
        setEntries(prev => [...prev, { ...data, id: Date.now() }])
        setCurrentPage(1)
    }

    const updateEntry = (id, data) => {
        setEntries(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
    }

    const deleteEntry = (id) => {
        setEntries(prev => prev.filter(e => e.id !== id))
    }

    return {
        entries: paginated,
        totalPages,
        currentPage: safePage,
        search, setSearch,
        habitatFilter, setHabitatFilter,
        addEntry, updateEntry, deleteEntry,
        occupiedHabitats: occupied,
        setCurrentPage,
    }
}

export default useInventory
