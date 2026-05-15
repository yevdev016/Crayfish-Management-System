import './StageCard.css'

const StageCard = ({ name, count, icon, color, isLast }) => {
    return (
        <div className="stage-card-wrapper">
            <div className="stage-card" style={{ borderTopColor: color }}>
                <div className="stage-card-icon" style={{ backgroundColor: color + '15', color }}>
                    {icon}
                </div>
                <span className="stage-card-name">{name}</span>
                <span className="stage-card-count">{count}</span>
            </div>
            {!isLast && (
                <div className="stage-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            )}
        </div>
    )
}

export default StageCard
