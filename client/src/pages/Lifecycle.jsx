import { useState } from 'react'
import LifecycleHeader from '@/components/lifecycle/LifecycleHeader'
import LifecycleFlow from '@/components/lifecycle/LifecycleFlow'
import TransitionForm from '@/components/lifecycle/TransitionForm'
import useLifecycle from '@/hooks/useLifecycle'
import useHabitats from '@/hooks/useHabitats'
import './Lifecycle.css'

const Lifecycle = () => {
    const { habitats } = useHabitats()
    const { stageTotals, transitions, addTransition } = useLifecycle(habitats)
    const [showForm, setShowForm] = useState(false)

    const habitatNames = habitats.map(h => h.name)

    const handleSave = async (data) => {
        const found = habitats.find(h => h.name === data.habitat)
        if (!found) {
            alert('Selected habitat not found. Please refresh and try again.')
            return
        }
        await addTransition({
            habitat_id: found.id,
            from_stage: data.fromStage,
            to_stage: data.toStage,
            count: data.count,
            date: data.date,
        })
        setShowForm(false)
    }

    return (
        <>
            <LifecycleHeader onRecordClick={() => setShowForm(true)} />

            <LifecycleFlow stageTotals={stageTotals} />

            <div className="lifecycle-history">
                <div className="lifecycle-history-header">
                    <h2>Transition History</h2>
                </div>
                {transitions.length === 0 ? (
                    <p className="lifecycle-empty">No transitions recorded yet.</p>
                ) : (
                    <div className="lifecycle-table">
                        <div className="lifecycle-table-header">
                            <span>Habitat</span>
                            <span>From</span>
                            <span></span>
                            <span>To</span>
                            <span>Count</span>
                            <span>Date</span>
                        </div>
                        {transitions.map(t => (
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
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <TransitionForm
                    habitats={habitatNames}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </>
    )
}

export default Lifecycle
