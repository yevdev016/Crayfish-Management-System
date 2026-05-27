import useHabitats from '@/hooks/useHabitats'
import useLifecycle from '@/hooks/useLifecycle'
import './LifecycleOverview.css'

const icons = {
    Berried: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <circle cx="8" cy="8" r="2" />
            <circle cx="16" cy="8" r="2" />
            <circle cx="8" cy="16" r="2" />
            <circle cx="16" cy="16" r="2" />
        </svg>
    ),
    Crayling: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
            <path d="M8 14a4 4 0 0 0 8 0" />
            <path d="M10 18l-3 3" />
            <path d="M14 18l3 3" />
        </svg>
    ),
    Juvenile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Adult: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Breeder: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="14" r="2" />
            <path d="M19 8c.5 1.5.5 3 0 4" />
            <path d="M22 7c1 2 1 5 0 7" />
        </svg>
    ),
}

const stageMeta = [
    { key: 'Berried', label: 'Berried', color: '#e65100' },
    { key: 'Crayling', label: 'Craylings', color: '#c62828' },
    { key: 'Juvenile', label: 'Juveniles', color: '#1565c0' },
    { key: 'Adult', label: 'Adults', color: '#2e7d32' },
    { key: 'Breeder', label: 'Breeders', color: '#7b1fa2' },
]

const LifecycleOverview = () => {
    const { habitats } = useHabitats()
    const { stageTotals } = useLifecycle(habitats)

    return (
        <div className="lifecycle-overview">
            <h2 className="section-title">Lifecycle Overview</h2>
            <div className="lifecycle-list">
                {stageMeta.map((s) => (
                    <div key={s.key} className="lifecycle-item">
                        <div className="lifecycle-icon" style={{ backgroundColor: s.color + '15', color: s.color }}>
                            {icons[s.key]}
                        </div>
                        <div className="lifecycle-info">
                            <span className="lifecycle-value">{stageTotals[s.key] || 0}</span>
                            <span className="lifecycle-label">{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LifecycleOverview
