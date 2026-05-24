import { useState } from 'react'
import './HarvestForm.css'

const HarvestForm = ({ habitats, entry, onSave, onCancel }) => {
    const isEdit = !!entry
    const [selectedHabitat, setSelectedHabitat] = useState(typeof entry?.habitat === 'string' ? entry.habitat : (habitats[0]?.name || ''))
    const [harvestData, setHarvestData] = useState({
        count: entry?.count ?? '',
        price: entry?.price ?? '',
        notes: entry?.notes || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedHabitat || !harvestData.count) return
            const found = habitats.find(h => h.name === selectedHabitat)
            onSave({
                habitat: selectedHabitat,
                species: found?.species || 'Unknown',
                stage: found?.stage || 'Adult',
                count: Number(harvestData.count),
                price: harvestData.price ? Number(harvestData.price) : 0,
                notes: harvestData.notes.trim() || null,
            })
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">{isEdit ? 'Edit Entry' : 'Harvest Stock'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Habitat</label>
                        <select value={selectedHabitat} onChange={e => setSelectedHabitat(e.target.value)} required>
                            {habitats.map(h => (
                                <option key={typeof h === 'string' ? h : h.name} value={typeof h === 'string' ? h : h.name}>
                                    {typeof h === 'string' ? h : h.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" value={harvestData.count} onChange={e => setHarvestData(prevData => ({...prevData, count: e.target.value}))} placeholder="e.g. 50" min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Price (₱)</label>
                        <input type="number" value={harvestData.price} onChange={e => setHarvestData(prevData => ({...prevData, price: e.target.value}))} placeholder="e.g. 150.00" min="0" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea value={harvestData.notes} onChange={e => setHarvestData(prevData => ({...prevData, notes: e.target.value}))} placeholder="Optional notes..." rows="3" />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="modal-btn save">{isEdit ? 'Save Changes' : 'Harvest'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HarvestForm
