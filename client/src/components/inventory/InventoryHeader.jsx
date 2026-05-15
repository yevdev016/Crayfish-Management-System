import './InventoryHeader.css'

const InventoryHeader = ({ onAddClick }) => {
    return (
        <div className="inventory-header">
            <h1 className="inventory-title">Inventory</h1>
            <button className="inventory-add-btn" onClick={onAddClick}>+ Record Batch</button>
        </div>
    )
}

export default InventoryHeader
