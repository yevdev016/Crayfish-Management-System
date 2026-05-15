import './HabitatCard.css'

const PlaceholderIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
)

const stageColors = {
    Berried: { bg: '#fff3e0', color: '#e65100' },
    Crayling: { bg: '#fce4ec', color: '#c62828' },
    Juvenile: { bg: '#e3f2fd', color: '#1565c0' },
    Adult: { bg: '#e8f5e9', color: '#2e7d32' },
    Breeder: { bg: '#f3e5f5', color: '#7b1fa2' },
}

const HabitatCard = ({ habitat, onEdit, onDelete }) => {
    const { name, image, species, count, stage } = habitat
    const stageStyle = stageColors[stage] || { bg: '#f5f5f5', color: '#666' }

    return (
        <div className="habitat-card">
            <div className="habitat-card-image">
                {image ? (
                    <img src={URL.createObjectURL(image)} alt={name} />
                ) : (
                    <div className="habitat-card-placeholder">
                        {PlaceholderIcon}
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div className="habitat-card-body">
                <h3 className="habitat-card-name">{name}</h3>
                <p className="habitat-card-species">{species}</p>
                <div className="habitat-card-meta">
                    <span className="habitat-card-stage" style={{ backgroundColor: stageStyle.bg, color: stageStyle.color }}>{stage}</span>
                    <p className="habitat-card-count">{count}</p>
                </div>
            </div>
            <div className="habitat-card-actions">
                <button className="habitat-card-btn edit" onClick={() => onEdit(habitat)}>Edit</button>
                <button className="habitat-card-btn delete" onClick={() => onDelete(habitat)}>Delete</button>
            </div>
        </div>
    )
}

export default HabitatCard
