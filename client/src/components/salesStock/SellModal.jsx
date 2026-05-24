import { useState } from 'react'
import './SellModal.css'

const SellModal = ({ entry, onConfirm, onCancel }) => {
    const [customerName, setCustomerName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!customerName.trim()) return
        onConfirm(entry.id, customerName.trim())
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="sell-modal" onClick={e => e.stopPropagation()}>
                <h2 className="sell-modal-title">Mark as Sold</h2>
                <p className="sell-modal-message">
                    Confirm sale of <strong>{entry.count}</strong> <strong>{entry.species}</strong> from <strong>{entry.habitat}</strong>?
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            placeholder="e.g. Juan Dela Cruz"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="modal-btn sell-confirm">Confirm Sale</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellModal
