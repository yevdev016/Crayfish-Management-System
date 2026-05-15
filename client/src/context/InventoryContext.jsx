import { createContext, useContext } from 'react'
import useInventory from '@/hooks/useInventory'

const InventoryContext = createContext()

export const InventoryProvider = ({ children }) => {
    const inventory = useInventory()
    return (
        <InventoryContext.Provider value={inventory}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventoryData = () => {
    const ctx = useContext(InventoryContext)
    if (!ctx) throw new Error('useInventoryData must be used within InventoryProvider')
    return ctx
}
