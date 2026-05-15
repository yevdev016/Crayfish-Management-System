import './InventoryRow.css'

const stageColors = {
    Berried: { bg: '#fff3e0', color: '#e65100' },
    Crayling: { bg: '#fce4ec', color: '#c62828' },
    Juvenile: { bg: '#e3f2fd', color: '#1565c0' },
    Adult: { bg: '#e8f5e9', color: '#2e7d32' },
    Breeder: { bg: '#f3e5f5', color: '#7b1fa2' },
}

const InventoryRow = ({ entry, onEdit, onDelete }) => {
    const s = stageColors[entry.stage] || { bg: '#f5f5f5', color: '#666' }

    return (
        <div className="inventory-row">
            <span className="row-habitat">{entry.habitat}</span>
            <span className="row-species">{entry.species}</span>
            <span className="row-stage">
                <span className="row-badge" style={{ backgroundColor: s.bg, color: s.color }}>{entry.stage}</span>
            </span>
            <span className="row-count">{entry.count}</span>
            <span className="row-actions">
                <button className="row-btn edit" onClick={() => onEdit(entry)}>Edit</button>
                <button className="row-btn delete" onClick={() => onDelete(entry)}>Delete</button>
            </span>
        </div>
    )
}

export default InventoryRow
