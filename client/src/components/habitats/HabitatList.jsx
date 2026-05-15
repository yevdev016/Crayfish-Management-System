import HabitatCard from './HabitatCard'
import './HabitatList.css'

const HabitatList = ({ habitats, onEdit, onDelete }) => {
    if (habitats.length === 0) {
        return (
            <div className="habitat-list-empty">
                <p>No habitats yet. Click "+ Add Habitat" to get started.</p>
            </div>
        )
    }

    return (
        <div className="habitat-list">
            {habitats.map(h => (
                <HabitatCard key={h.id} habitat={h} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default HabitatList
