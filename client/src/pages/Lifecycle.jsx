import { useState } from 'react'
import LifecycleHeader from '@/components/lifecycle/LifecycleHeader'
import LifecycleFlow from '@/components/lifecycle/LifecycleFlow'
import TransitionForm from '@/components/lifecycle/TransitionForm'
import useLifecycle from '@/hooks/useLifecycle'
import useHabitats from '@/hooks/useHabitats'
import './Lifecycle.css'

const Lifecycle = () => {
    const { habitats } = useHabitats()
    const { stageTotals, transitions, addTransition, updateTransition, deleteTransition } = useLifecycle(habitats)
    const [showForm, setShowForm] = useState(false)
    const [editingTransition, setEditingTransition] = useState(null)
    const [search, setSearch] = useState('')

    const habitatNames = habitats.map(h => h.name)
    const habitatStageMap = Object.fromEntries(habitats.map(h => [h.name, h.stage]))

    const handleSave = async (data) => {
        const found = habitats.find(h => h.name === data.habitat)
        if (!found) {
            alert('Selected habitat not found. Please refresh and try again.')
            return
        }
        if (editingTransition) {
            await updateTransition(editingTransition.id, { count: data.count, date: data.date })
        } else {
            await addTransition({
                habitat_id: found.id,
                from_stage: data.fromStage,
                to_stage: data.toStage,
                count: data.count,
                date: data.date,
            })
        }
        setShowForm(false)
        setEditingTransition(null)
    }

    const handleEdit = (t) => {
        setEditingTransition(t)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this transition record?')) {
            await deleteTransition(id)
        }
    }

    const filtered = transitions.filter(t => {
        if (!search) return true
        const q = search.toLowerCase()
        return t.habitat?.toLowerCase().includes(q)
            || t.from_stage?.toLowerCase().includes(q)
            || t.to_stage?.toLowerCase().includes(q)
    })

    return (
        <>
            <LifecycleHeader onRecordClick={() => { setEditingTransition(null); setShowForm(true) }} />

            <LifecycleFlow stageTotals={stageTotals} />

            <div className="lifecycle-history">
                <div className="lifecycle-history-header">
                    <h2>Transition History</h2>
                    <input
                        type="text"
                        className="lifecycle-search"
                        placeholder="Search transitions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                {transitions.length === 0 ? (
                    <p className="lifecycle-empty">No transitions recorded yet.</p>
                ) : filtered.length === 0 ? (
                    <p className="lifecycle-empty">No transitions match your search.</p>
                ) : (
                    <div className="lifecycle-table">
                        <div className="lifecycle-table-header">
                            <span>Habitat</span>
                            <span>From</span>
                            <span></span>
                            <span>To</span>
                            <span>Count</span>
                            <span>Date</span>
                            <span>Actions</span>
                        </div>
                        {filtered.map(t => (
                            <div key={t.id} className="lifecycle-table-row">
                                <span>{t.habitat}</span>
                                <span className="from-stage">{t.from_stage}</span>
                                <span className="arrow-cell">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                                <span className="to-stage">{t.to_stage}</span>
                                <span className="count-cell">{t.count}</span>
                                <span className="date-cell">{t.date}</span>
                                <span className="actions-cell">
                                    <button className="lifecycle-action-btn edit" onClick={() => handleEdit(t)} title="Edit count/date">Edit</button>
                                    <button className="lifecycle-action-btn delete" onClick={() => handleDelete(t.id)} title="Delete transition">Delete</button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <TransitionForm
                    habitats={habitatNames}
                    habitatStageMap={habitatStageMap}
                    transition={editingTransition}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingTransition(null) }}
                />
            )}
        </>
    )
}

export default Lifecycle
