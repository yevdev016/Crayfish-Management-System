import './HabitatsHeader.css'

const HabitatsHeader = ({ onAddClick }) => {
    return (
        <div className="habitats-header">
            <h1 className="habitats-title">Habitats</h1>
            <button className="habitats-add-btn" onClick={onAddClick}>+ Add Habitat</button>
        </div>
    )
}

export default HabitatsHeader
