import './StatsCard.css'

const StatsCard = ({ title, value, icon, color = '#004d75' }) => {
    return (
        <div className="stats-card" style={{ borderLeftColor: color }}>
            <div className="stats-card-icon" style={{ backgroundColor: color + '15', color }}>
                {icon}
            </div>
            <div className="stats-card-info">
                <span className="stats-card-value">{value}</span>
                <span className="stats-card-title">{title}</span>
            </div>
        </div>
    )
}

export default StatsCard
