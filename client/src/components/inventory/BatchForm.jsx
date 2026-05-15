import { useState } from 'react'
import './BatchForm.css'

const stages = ['Berried', 'Crayling', 'Juvenile', 'Adult', 'Breeder']

const BatchForm = ({ habitats, entry, occupiedHabitats, onSave, onCancel }) => {
    const isEdit = !!entry
    const [habitat, setHabitat] = useState(entry?.habitat || (habitats[0] || ''))
    const [species, setSpecies] = useState(entry?.species || '')
    const [stage, setStage] = useState(entry?.stage || 'Adult')
    const [count, setCount] = useState(entry?.count ?? '')

    const isOccupied = !isEdit && occupiedHabitats.includes(habitat)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!habitat || !species.trim() || !count) return
        onSave({ habitat, species: species.trim(), stage, count: Number(count) })
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">{isEdit ? 'Edit Entry' : 'Record Batch'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Habitat</label>
                        <select value={habitat} onChange={e => setHabitat(e.target.value)} required>
                            {habitats.map(h => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                        {isOccupied && (
                            <p className="form-warning">This habitat already has a recorded batch.</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Species</label>
                        <input type="text" value={species} onChange={e => setSpecies(e.target.value)} placeholder="e.g. Red Swamp Crayfish" required />
                    </div>
                    <div className="form-group">
                        <label>Growth Stage</label>
                        <select value={stage} onChange={e => setStage(e.target.value)}>
                            {stages.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Count</label>
                        <input type="number" value={count} onChange={e => setCount(e.target.value)} placeholder="e.g. 284" min="0" required />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="modal-btn save" disabled={isOccupied && !isEdit}>{isEdit ? 'Save Changes' : 'Record Batch'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BatchForm
