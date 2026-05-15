import { useState } from 'react'
import './TransitionForm.css'

const stages = ['Berried', 'Crayling', 'Juvenile', 'Adult', 'Breeder']
const today = () => new Date().toISOString().split('T')[0]

const TransitionForm = ({ habitats, onSave, onCancel }) => {
    const [habitat, setHabitat] = useState(habitats[0] || '')
    const [fromStage, setFromStage] = useState(stages[0])
    const [toStage, setToStage] = useState(stages[1])
    const [count, setCount] = useState('')
    const [date, setDate] = useState(today())

    const isSameStage = fromStage === toStage

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!habitat || isSameStage || !count) return
        onSave({ habitat, fromStage, toStage, count: Number(count), date })
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">Record Stage Transition</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Habitat</label>
                        <select value={habitat} onChange={e => setHabitat(e.target.value)} required>
                            {habitats.map(h => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>From Stage</label>
                            <select value={fromStage} onChange={e => setFromStage(e.target.value)}>
                                {stages.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-arrow-symbol">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </div>
                        <div className="form-group">
                            <label>To Stage</label>
                            <select value={toStage} onChange={e => setToStage(e.target.value)}>
                                {stages.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {isSameStage && (
                        <p className="form-warning">From and To stages must be different.</p>
                    )}
                    <div className="form-group">
                        <label>Count</label>
                        <input type="number" value={count} onChange={e => setCount(e.target.value)} placeholder="e.g. 45" min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="modal-btn save" disabled={isSameStage}>Record Transition</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransitionForm
