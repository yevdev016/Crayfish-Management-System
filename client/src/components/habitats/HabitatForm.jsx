import { useState } from 'react'
import './HabitatForm.css'

const HabitatForm = ({ habitat, onSave, onCancel }) => {
    const isEdit = !!habitat
    const [name, setName] = useState(habitat?.name || '')
    const [species, setSpecies] = useState(habitat?.species || '')
    const [count, setCount] = useState(habitat?.count || '')
    const [stage, setStage] = useState(habitat?.stage || 'Adult')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(habitat?.image || null)

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim() || !species.trim() || !count) return
        onSave({ name: name.trim(), species: species.trim(), count: Number(count), stage, image })
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">{isEdit ? 'Edit Habitat' : 'Add Habitat'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Habitat Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Pond Alpha" required />
                    </div>
                    <div className="form-group">
                        <label>Species</label>
                        <input type="text" value={species} onChange={e => setSpecies(e.target.value)} placeholder="e.g. Red Swamp Crayfish" required />
                    </div>
                    <div className="form-group">
                        <label>Growth Stage</label>
                        <select value={stage} onChange={e => setStage(e.target.value)} className="form-select">
                            <option value="Berried">Berried</option>
                            <option value="Crayling">Crayling</option>
                            <option value="Juvenile">Juvenile</option>
                            <option value="Adult">Adult</option>
                            <option value="Breeder">Breeder</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Crayfish Count</label>
                        <input type="number" value={count} onChange={e => setCount(e.target.value)} placeholder="e.g. 120" min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} />
                        {preview && <img src={preview} alt="Preview" className="form-preview" />}
                    </div>
                    <div className="form-actions">
                        <button type="button" className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="modal-btn save">{isEdit ? 'Save Changes' : 'Add Habitat'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HabitatForm
