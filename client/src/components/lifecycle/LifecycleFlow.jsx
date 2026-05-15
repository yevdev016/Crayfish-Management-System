import StageCard from './StageCard'
import './LifecycleFlow.css'

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

const BreederIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="14" r="2" />
        <path d="M19 8c.5 1.5.5 3 0 4" />
        <path d="M22 7c1 2 1 5 0 7" />
    </svg>
)

const stages = [
    { name: 'Berried', icon: BerriedIcon, color: '#e65100' },
    { name: 'Crayling', icon: CraylingIcon, color: '#c62828' },
    { name: 'Juvenile', icon: JuvenileIcon, color: '#1565c0' },
    { name: 'Adult', icon: AdultIcon, color: '#2e7d32' },
    { name: 'Breeder', icon: BreederIcon, color: '#7b1fa2' },
]

const LifecycleFlow = ({ stageTotals }) => {
    return (
        <div className="lifecycle-flow">
            {stages.map((s, i) => (
                <StageCard
                    key={s.name}
                    name={s.name}
                    count={stageTotals?.[s.name] ?? 0}
                    icon={s.icon}
                    color={s.color}
                    isLast={i === stages.length - 1}
                />
            ))}
        </div>
    )
}

export default LifecycleFlow
