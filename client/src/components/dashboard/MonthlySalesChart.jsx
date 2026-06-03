import { useState, useEffect, useMemo } from 'react'
import { getSaleStock } from '@/services/saleStockServices'
import './MonthlySalesChart.css'

const MonthlySalesChart = () => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        getSaleStock()
            .then(setEntries)
            .catch(() => {})
    }, [])

    const chartData = useMemo(() => {
        const map = {}
        for (const e of entries) {
            if (!e.sold_date) continue
            const qtySold = (e.count || 0) - (e.available || 0)
            if (qtySold <= 0) continue
            const d = new Date(e.sold_date)
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
            const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            const revenue = qtySold * (e.price || 0)
            if (!map[key]) map[key] = { label, revenue: 0, quantity: 0 }
            map[key].revenue += revenue
            map[key].quantity += qtySold
        }
        return Object.values(map).sort((a, b) => a.label.localeCompare(b.label))
    }, [entries])

    const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1)

    const totalRevenue = chartData.reduce((s, d) => s + d.revenue, 0)
    const totalQuantity = chartData.reduce((s, d) => s + d.quantity, 0)

    const formatPeso = (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return (
        <div className="monthly-sales">
            <h2 className="section-title">Monthly Sales</h2>

            {chartData.length === 0 ? (
                <p className="sales-chart-empty">No sales data yet.</p>
            ) : (
                <>
                    <div className="sales-summary-row">
                        <div className="sales-summary-item">
                            <span className="sales-summary-value">{formatPeso(totalRevenue)}</span>
                            <span className="sales-summary-label">Total Revenue</span>
                        </div>
                        <div className="sales-summary-item">
                            <span className="sales-summary-value">{totalQuantity}</span>
                            <span className="sales-summary-label">Items Sold</span>
                        </div>
                        <div className="sales-summary-item">
                            <span className="sales-summary-value">{chartData.length}</span>
                            <span className="sales-summary-label">Months Active</span>
                        </div>
                    </div>

                    <div className="chart-bars">
                        {chartData.map(d => (
                            <div key={d.label} className="chart-bar-col">
                                <div className="chart-bar-wrapper">
                                    <div
                                        className="chart-bar-fill"
                                        style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                                        title={`${d.label}: ${d.quantity} sold — ${formatPeso(d.revenue)} Pesos`}
                                    />
                                </div>
                                <span className="chart-bar-label">{d.label.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MonthlySalesChart
