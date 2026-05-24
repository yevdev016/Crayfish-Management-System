import './SalesStockRow.css'

const stageColors = {
    Hatchling: { bg: '#fce4ec', color: '#c62828' },
    Crayling: { bg: '#fff3e0', color: '#e65100' },
    Juvenile: { bg: '#e3f2fd', color: '#1565c0' },
    Adult: { bg: '#e8f5e9', color: '#2e7d32' },
    Breeder: { bg: '#f3e5f5', color: '#7b1fa2' },
}

const statusStyles = {
    growing: { bg: '#fff8e1', color: '#f57f17', label: 'Growing' },
    available: { bg: '#e8f5e9', color: '#2e7d32', label: 'Available' },
    sold: { bg: '#f5f5f5', color: '#888', label: 'Sold' },
}

const SalesStockRow = ({ entry, onEdit, onSell, onDelete }) => {
    const s = stageColors[entry.stage] || { bg: '#f5f5f5', color: '#666' }
    const st = statusStyles[entry.status] || { bg: '#f5f5f5', color: '#666', label: entry.status }
    const formattedPrice = entry.price != null ? `₱${Number(entry.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'
    const isSellable = entry.status !== 'sold'

    return (
        <div className="sales-stock-row">
            <span className="row-habitat">{entry.habitat}</span>
            <span className="row-species">{entry.species}</span>
            <span className="row-stage">
                <span className="row-badge" style={{ backgroundColor: s.bg, color: s.color }}>{entry.stage}</span>
            </span>
            <span className="row-count">{entry.count}</span>
            <span className="row-price">{formattedPrice}</span>
            <span className="row-status">
                <span className="row-status-badge" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
            </span>
            <span className="row-sold-date">{entry.sold_date || '—'}</span>
            <span className="row-actions">
                <button className="row-btn edit" onClick={() => onEdit(entry)}>Edit</button>
                {isSellable && (
                    <button className="row-btn sell" onClick={() => onSell(entry)}>Sell</button>
                )}
                <button className="row-btn delete" onClick={() => onDelete(entry)}>Delete</button>
            </span>
        </div>
    )
}

export default SalesStockRow
