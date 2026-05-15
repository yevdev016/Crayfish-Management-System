import './DeleteConfirm.css'

const DeleteConfirm = ({ item, title, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="delete-modal" onClick={e => e.stopPropagation()}>
                <div className="delete-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </div>
                <h3 className="delete-title">Delete {title || 'Item'}</h3>
                <p className="delete-message">Are you sure you want to delete <strong>{item?.name}</strong>? This action cannot be undone.</p>
                <div className="delete-actions">
                    <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                    <button className="modal-btn delete-btn" onClick={() => onConfirm(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm
