import StatsCard from './StatsCard'
import './StatsGrid.css'

const HabitatsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
)

const CrayfishIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" />
        <path d="M4 8l2 2 2-2" />
        <path d="M16 8l2 2 2-2" />
        <path d="M6 12a6 6 0 0 0 12 0" />
        <path d="M8 16l-2 4" />
        <path d="M16 16l2 4" />
        <path d="M12 14v4" />
    </svg>
)

const BerriedIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
    </svg>
)

const CraylingsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
        <path d="M8 14a4 4 0 0 0 8 0" />
        <path d="M10 18l-3 3" />
        <path d="M14 18l3 3" />
        <path d="M6 11H2" />
        <path d="M18 11h4" />
        <path d="M5 8H3" />
        <path d="M19 8h2" />
    </svg>
)

const stats = [
    { title: 'Total Habitats', value: '8', icon: HabitatsIcon, color: '#004d75' },
    { title: 'Total Crayfish', value: '1,284', icon: CrayfishIcon, color: '#1974a5' },
    { title: 'Berried Females', value: '24', icon: BerriedIcon, color: '#e67e22' },
    { title: 'Craylings', value: '156', icon: CraylingsIcon, color: '#27ae60' },
]

const StatsGrid = () => {
    return (
        <div className="stats-grid">
            {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
            ))}
        </div>
    )
}

export default StatsGrid
