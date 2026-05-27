import { useState } from 'react'
import './SellModal.css'

const SellModal = ({ entry, onConfirm, onCancel }) => {
    const [customerName, setCustomerName] = useState('')
    const [qty, setQty] = useState(entry.available)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!customerName.trim() || !qty) return
        if (qty > entry.available) {
            setError('Quantity exceeds available stock')
            return
        }
        try {
            await onConfirm(entry.id, qty, customerName.trim())
        } catch (err) {
            setError(err?.message || 'Sale failed. Please try again.')
        }
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="sell-modal" onClick={e => e.stopPropagation()}>
                <h2 className="sell-modal-title">Mark as Sold</h2>
                <p className="sell-modal-message">
                    Confirm sale of <strong>{entry.species}</strong> from <strong>{entry.habitat}</strong>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Quantity to Sell</label>
                        <input
                            type="number"
                            value={qty}
                            onChange={e => setQty(Number(e.target.value))}
                            min={1}
                            max={entry.available}
                            required
                        />
                        <small>Available: {entry.available} / {entry.count}</small>
                    </div>
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
                    {error && <p className="sell-modal-error">{error}</p>}
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
