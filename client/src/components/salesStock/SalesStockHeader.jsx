import './SalesStockHeader.css'

const SalesStockHeader = ({ onAddClick }) => {
    return (
        <div className="sales-stock-header">
            <h1 className="sales-stock-title">Sales Stock</h1>
            <button className="sales-stock-add-btn" onClick={onAddClick}>+ Harvest Stock</button>
        </div>
    )
}

export default SalesStockHeader
