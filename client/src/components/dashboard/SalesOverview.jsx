import { useState, useEffect } from 'react'
import { getSaleStock } from '@/services/saleStockServices'
import './SalesOverview.css'

const statusBadge = {
    available: { bg: '#e8f5e9', color: '#2e7d32', label: 'Available' },
    partial: { bg: '#fff3e0', color: '#e65100', label: 'Partial' },
    sold: { bg: '#f5f5f5', color: '#888', label: 'Sold' },
}

const SalesOverview = () => {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSaleStock()
            .then(setEntries)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="sales-overview">
                <h2 className="section-title">Sales Overview</h2>
                <p className="sales-empty">Loading...</p>
            </div>
        )
    }

    if (entries.length === 0) {
        return (
            <div className="sales-overview">
                <h2 className="section-title">Sales Overview</h2>
                <p className="sales-empty">No stock entries yet.</p>
            </div>
        )
    }

    const recent = entries.slice(0, 6)

    return (
        <div className="sales-overview">
            <h2 className="section-title">Sales Overview</h2>
            <div className="sales-table">
                <div className="sales-table-header">
                    <span>Habitat</span>
                    <span>Species</span>
                    <span>Count</span>
                    <span>Available</span>
                    <span>Price</span>
                    <span>Status</span>
                </div>
                {recent.map(entry => {
                    const st = statusBadge[entry.status] || { bg: '#f5f5f5', color: '#666', label: entry.status }
                    return (
                        <div key={entry.id} className="sales-table-row">
                            <span className="sales-col-habitat">{entry.habitat}</span>
                            <span className="sales-col-species">{entry.species}</span>
                            <span className="sales-col-count">{entry.count}</span>
                            <span className="sales-col-avail">{entry.available}</span>
                            <span className="sales-col-price">{(entry.price ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="sales-col-status">
                                <span className="sales-status-badge" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SalesOverview
