import { useState, useEffect, useMemo } from "react";
import * as saleStockServices from '@/services/saleStockServices'

const ITEM_PER_PAGE = 10;

const useSaleStock = () => {
    const [ saleStock, setSaleStock ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ habitatFilter, setHabitatFilter ] = useState('All');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchError, setFetchError ] = useState(null);

    useEffect(() => {
        const getSalesStock = async () => {
            setIsLoading(true);
            setFetchError(null);
            try {
                const data = await saleStockServices.getSaleStock();
                setSaleStock(data);
            } catch(err){
                setFetchError(err.message || 'Failed to load entries');
                setSaleStock([]);
            } finally {
                setIsLoading(false)
            }
        }
        getSalesStock()
    }, []);
    const filtered = useMemo(() => {
        let result = saleStock;
        if(search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(e => e.species.toLowerCase().includes(q))
        }
        if (habitatFilter !== 'All') {
            result = result.filter(e => e.habitat === habitatFilter)
        }
        return result
    }, [saleStock, search, habitatFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEM_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = useMemo(() => {
        const start = (safePage - 1) * ITEM_PER_PAGE
        return filtered.slice(start, start + ITEM_PER_PAGE)
    }, [filtered, safePage])
    const occupied = useMemo(() => saleStock.map(e => e.habitat), [saleStock]);

    const addSaleStock = async (data)=> {
        const saleStock = await saleStockServices.addSaleStock(data);
        setSaleStock(prevData => [saleStock, ...prevData]);
        setCurrentPage(1);
    }
    const updateSaleStock = async (id, data) => {
        const updatedSaleStock = await saleStockServices.updateSaleStock(id, data);
        setSaleStock(prevData => prevData.map(s => s.id === id ? updatedSaleStock : s));
    }
    const deleteSaleStock = async (id) => {
        await saleStockServices.deleteStock(id);
        setSaleStock(prevData => prevData.filter(s => s.id !== id))
    }
    const sellSaleStock = async (id, customerName) => {
        const sellStock = await saleStockServices.sellStock(id, customerName);
        setSaleStock(prevData => prevData.map(s => s.id === id ? sellStock : s));
    }
    return {
        saleStock: paginated,
        allSaleStock: saleStock,
        totalPages,
        currentPage: safePage,
        search, setSearch,
        habitatFilter, setHabitatFilter,
        addSaleStock, updateSaleStock, deleteSaleStock, sellSaleStock,
        occupiedHabitats: occupied,
        setCurrentPage,
        isLoading,
        fetchError,
        refresh: async () => {
            try {
                const data = await saleStockServices.getSaleStock();
                setSaleStock(data);
            } catch(err) {
                setFetchError(err.message || 'Failed to load entries');
            }
        },
    }

}
export default useSaleStock