import { useState, useMemo } from 'react'

const stages = ['Berried', 'Crayling', 'Juvenile', 'Adult', 'Breeder']

const mockTransitions = [
    { id: 1, habitat: 'Pond Alpha', fromStage: 'Juvenile', toStage: 'Adult', count: 45, date: '2026-05-10' },
    { id: 2, habitat: 'Tank Beta', fromStage: 'Crayling', toStage: 'Juvenile', count: 30, date: '2026-05-12' },
    { id: 3, habitat: 'Pond Gamma', fromStage: 'Adult', toStage: 'Breeder', count: 15, date: '2026-05-14' },
    { id: 4, habitat: 'Tank Delta', fromStage: 'Berried', toStage: 'Crayling', count: 56, date: '2026-05-16' },
]

const useLifecycle = (inventoryEntries) => {
    const [transitions, setTransitions] = useState(mockTransitions)

    const stageTotals = useMemo(() => {
        const totals = { Berried: 0, Crayling: 0, Juvenile: 0, Adult: 0, Breeder: 0 }
        if (inventoryEntries) {
            inventoryEntries.forEach(e => {
                if (totals.hasOwnProperty(e.stage)) {
                    totals[e.stage] += e.count
                }
            })
        }
        return totals
    }, [inventoryEntries])

    const addTransition = (data) => {
        setTransitions(prev => [...prev, { ...data, id: Date.now() }])
    }

    return { stageTotals, transitions, addTransition, stages }
}

export default useLifecycle
