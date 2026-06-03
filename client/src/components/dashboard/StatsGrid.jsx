import { useState, useEffect } from 'react'
import StatsCard from './StatsCard'
import { getHabitats } from '@/services/habitatServices'
import { getSaleStock } from '@/services/saleStockServices'
import './StatsGrid.css'

const HabitatsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
)

const CrayfishIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" />
        <path d="M4 8l2 2 2-2" />
        <path d="M16 8l2 2 2-2" />
        <path d="M6 12a6 6 0 0 0 12 0" />
        <path d="M8 16l-2 4" />
        <path d="M16 16l2 4" />
        <path d="M12 14v4" />
    </svg>
)

const BerriedIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
    </svg>
)

const CraylingsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
        <path d="M8 14a4 4 0 0 0 8 0" />
        <path d="M10 18l-3 3" />
        <path d="M14 18l3 3" />
        <path d="M6 11H2" />
        <path d="M18 11h4" />
        <path d="M5 8H3" />
        <path d="M19 8h2" />
    </svg>
)

const RevenueIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
)

const SoldIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const BoxIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
)

const TrendingIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
)

const StatsGrid = ({ view }) => {
    const [habitats, setHabitats] = useState([])
    const [saleStock, setSaleStock] = useState([])

    useEffect(() => {
        getHabitats().then(setHabitats).catch(() => {})
        getSaleStock().then(setSaleStock).catch(() => {})
    }, [])

    const totalCrayfish = habitats.reduce((s, h) => s + (h.count || 0), 0)
    const berried = habitats.filter(h => h.stage === 'Berried').reduce((s, h) => s + (h.count || 0), 0)
    const craylings = habitats.filter(h => h.stage === 'Crayling').reduce((s, h) => s + (h.count || 0), 0)

    const totalRevenue = saleStock.reduce((s, e) => {
        const qty = (e.count || 0) - (e.available || 0)
        return s + qty * (e.price || 0)
    }, 0)
    const itemsSold = saleStock.reduce((s, e) => s + Math.max(0, (e.count || 0) - (e.available || 0)), 0)
    const activeEntries = saleStock.filter(e => e.status !== 'sold').length
    const totalEntries = saleStock.length

    const habitatStats = [
        { title: 'Total Habitats', value: habitats.length, icon: HabitatsIcon, color: '#004d75' },
        { title: 'Total Crayfish', value: totalCrayfish.toLocaleString(), icon: CrayfishIcon, color: '#1974a5' },
        { title: 'Berried Females', value: berried, icon: BerriedIcon, color: '#e67e22' },
        { title: 'Craylings', value: craylings, icon: CraylingsIcon, color: '#27ae60' },
    ]

    const saleStats = [
        { title: 'Total Revenue', value: totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), icon: RevenueIcon, color: '#059669' },
        { title: 'Items Sold', value: itemsSold, icon: SoldIcon, color: '#2563eb' },
        { title: 'Active Stock', value: activeEntries, icon: BoxIcon, color: '#d97706' },
        { title: 'Stock Entries', value: totalEntries, icon: TrendingIcon, color: '#7c3aed' },
    ]

    const stats = view === 'sales' ? saleStats : habitatStats

    return (
        <div className="stats-grid">
            {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
            ))}
        </div>
    )
}

export default StatsGrid
