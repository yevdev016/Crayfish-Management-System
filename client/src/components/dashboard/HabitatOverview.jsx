import './HabitatOverview.css'

const habitats = [
    { name: 'Pond Alpha', species: 'Red Swamp Crayfish', stage: 'Adult', count: 120 },
    { name: 'Tank Beta', species: 'Signal Crayfish', stage: 'Juvenile', count: 45 },
    { name: 'Pond Gamma', species: 'Marbled Crayfish', stage: 'Crayling', count: 78 },
    { name: 'Tank Delta', species: 'Red Swamp Crayfish', stage: 'Berried', count: 12 },
]

const PondIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M4 16l-2 4" />
        <path d="M22 16l2 4" />
        <path d="M6 12l-2 4" />
        <path d="M18 12l2 4" />
        <path d="M8 8l-2 4" />
        <path d="M16 8l2 4" />
        <path d="M10 4l-2 4" />
        <path d="M14 4l2 4" />
        <path d="M12 2v2" />
    </svg>
)

const HabitatOverview = () => {
    return (
        <div className="habitat-overview">
            <h2 className="section-title">Habitat Overview</h2>
            <div className="habitat-table">
                <div className="habitat-table-header">
                    <span className="col-habitat">Habitat</span>
                    <span className="col-species">Species</span>
                    <span className="col-stage">Stage</span>
                    <span className="col-count">Count</span>
                </div>
                {habitats.map((h) => (
                    <div key={h.name} className="habitat-table-row">
                        <span className="col-habitat">
                            <span className="habitat-icon">{PondIcon}</span>
                            <span>{h.name}</span>
                        </span>
                        <span className="col-species">{h.species}</span>
                        <span className="col-stage">
                            <span className={`stage-badge stage-${h.stage.toLowerCase()}`}>{h.stage}</span>
                        </span>
                        <span className="col-count">{h.count}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HabitatOverview
