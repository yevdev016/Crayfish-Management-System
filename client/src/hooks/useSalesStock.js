import { useState, useMemo } from 'react'

const ITEMS_PER_PAGE = 10

const useSalesStock = () => {
    const [entries, setEntries] = useState([])
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
        setEntries(prev => [{ ...data, id: Date.now(), status: data.stage === 'Hatchling' ? 'growing' : 'available' }, ...prev])
        setCurrentPage(1)
    }

    const updateEntry = (id, data) => {
        setEntries(prev => prev.map(e => e.id === id ? { ...e, ...data, status: data.stage === 'Hatchling' ? 'growing' : 'available' } : e))
    }

    const deleteEntry = (id) => {
        setEntries(prev => prev.filter(e => e.id !== id))
    }

    const sellEntry = (id, customerName) => {
        setEntries(prev => prev.map(e =>
            e.id === id
                ? { ...e, status: 'sold', customer_name: customerName, sold_date: new Date().toISOString().split('T')[0] }
                : e
        ))
    }

    return {
        entries: paginated,
        allEntries: entries,
        totalPages,
        currentPage: safePage,
        search, setSearch,
        habitatFilter, setHabitatFilter,
        addEntry, updateEntry, deleteEntry, sellEntry,
        occupiedHabitats: occupied,
        setCurrentPage,
        isLoading: false,
        fetchError: null,
        refresh: () => {},
    }
}

export default useSalesStock
