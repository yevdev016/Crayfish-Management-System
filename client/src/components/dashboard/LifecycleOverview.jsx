import './LifecycleOverview.css'

const BerriedIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
    </svg>
)

const CraylingIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
        <path d="M8 14a4 4 0 0 0 8 0" />
        <path d="M10 18l-3 3" />
        <path d="M14 18l3 3" />
    </svg>
)

const JuvenileIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const AdultIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

const stages = [
    { label: 'Berried', value: 24, icon: BerriedIcon, color: '#e67e22' },
    { label: 'Craylings', value: 156, icon: CraylingIcon, color: '#c62828' },
    { label: 'Juveniles', value: 89, icon: JuvenileIcon, color: '#1565c0' },
    { label: 'Adults', value: 120, icon: AdultIcon, color: '#2e7d32' },
]

const LifecycleOverview = () => {
    return (
        <div className="lifecycle-overview">
            <h2 className="section-title">Lifecycle Overview</h2>
            <div className="lifecycle-list">
                {stages.map((s) => (
                    <div key={s.label} className="lifecycle-item">
                        <div className="lifecycle-icon" style={{ backgroundColor: s.color + '15', color: s.color }}>
                            {s.icon}
                        </div>
                        <div className="lifecycle-info">
                            <span className="lifecycle-value">{s.value}</span>
                            <span className="lifecycle-label">{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LifecycleOverview
