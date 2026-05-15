import InventoryRow from './InventoryRow'
import './InventoryTable.css'

const InventoryTable = ({ entries, totalPages, currentPage, onPageChange, onEdit, onDelete }) => {
    if (entries.length === 0) {
        return (
            <div className="inventory-empty">
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
        <div className="inventory-table-wrapper">
            <div className="inventory-table">
                <div className="inventory-table-header">
                    <span>Habitat</span>
                    <span>Species</span>
                    <span>Stage</span>
                    <span>Count</span>
                    <span>Actions</span>
                </div>
                {entries.map(e => (
                    <InventoryRow key={e.id} entry={e} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
            <div className="inventory-pagination">
                <button className="page-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
                {getPageNumbers().map(p => (
                    <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
                ))}
                <button className="page-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    )
}

export default InventoryTable
