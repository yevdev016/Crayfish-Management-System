import { useState, useEffect, useMemo } from 'react'
import * as lifecycleServices from '@/services/lifecycleServices'

const stages = ['Berried', 'Crayling', 'Juvenile', 'Adult', 'Breeder']

const useLifecycle = (habitats) => {
    const [transitions, setTransitions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await lifecycleServices.getLifecycle()
                setTransitions(data)
            } catch (err) {
                console.error('Failed to load lifecycle transitions', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetch()
    }, [])

    const stageTotals = useMemo(() => {
        const totals = { Berried: 0, Crayling: 0, Juvenile: 0, Adult: 0, Breeder: 0 }
        if (habitats) {
            habitats.forEach(h => {
                if (totals.hasOwnProperty(h.stage)) {
                    totals[h.stage] += h.count
                }
            })
        }
        return totals
    }, [habitats])

    const addTransition = async (data) => {
        const transition = await lifecycleServices.addLifecycle(data)
        setTransitions(prev => [transition, ...prev])
    }

    const updateTransition = async (id, data) => {
        const updated = await lifecycleServices.updateLifecycle(id, data)
        setTransitions(prev => prev.map(t => t.id === id ? updated : t))
    }

    const deleteTransition = async (id) => {
        await lifecycleServices.deleteLifecycle(id)
        setTransitions(prev => prev.filter(t => t.id !== id))
    }

    return { stageTotals, transitions, addTransition, updateTransition, deleteTransition, stages, isLoading }
}

export default useLifecycle
