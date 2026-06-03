import useHabitats from '@/hooks/useHabitats'
import './HabitatOverview.css'

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
    const { habitats, isLoading } = useHabitats()

    if (isLoading) {
        return (
            <div className="habitat-overview">
                <h2 className="section-title">Habitat Overview</h2>
                <p className="habitat-empty">Loading...</p>
            </div>
        )
    }

    return (
        <div className="habitat-overview">
            <h2 className="section-title">Habitat Overview</h2>
            {habitats.length === 0 ? (
                <p className="habitat-empty">No habitats created yet.</p>
            ) : (
                <div className="habitat-table">
                    <div className="habitat-table-header">
                        <span className="col-habitat">Habitat</span>
                        <span className="col-species">Species</span>
                        <span className="col-stage">Stage</span>
                        <span className="col-count">Count</span>
                    </div>
                    {habitats.map((h) => (
                        <div key={h.id} className="habitat-table-row">
                            <span className="col-habitat">
                                <span className="habitat-icon">{PondIcon}</span>
                                <span>{h.name}</span>
                            </span>
                            <span className="col-species">{h.species}</span>
                            <span className="col-stage">
                                <span className={`stage-badge stage-${h.stage?.toLowerCase()}`}>{h.stage}</span>
                            </span>
                            <span className="col-count">{h.count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default HabitatOverview
