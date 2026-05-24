import SalesStockRow from './SalesStockRow'
import './SalesStockTable.css'

const SalesStockTable = ({ entries, totalPages, currentPage, onPageChange, onEdit, onSell, onDelete }) => {
    if (entries.length === 0) {
        return (
            <div className="sales-stock-empty">
                <p>No entries found. Try adjusting your search or filters.</p>
            </div>
        )
    }

    const getPageNumbers = () => {
        const pages = []
        const start = Math.max(1, currentPage - 2)
        const end = Math.min(totalPages, currentPage + 2)
        for (let i = start; i <= end; i++) pages.push(i)
        return pages
    }

    return (
        <div className="sales-stock-table-wrapper">
            <div className="sales-stock-table">
                <div className="sales-stock-table-header">
                    <span>Habitat</span>
                    <span>Species</span>
                    <span>Stage</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Status</span>
                    <span>Sold Date</span>
                    <span>Actions</span>
                </div>
                {entries.map(e => (
                    <SalesStockRow key={e.id} entry={e} onEdit={onEdit} onSell={onSell} onDelete={onDelete} />
                ))}
            </div>
            <div className="sales-stock-pagination">
                <button className="page-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
                {getPageNumbers().map(p => (
                    <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
                ))}
                <button className="page-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    )
}

export default SalesStockTable
