import { useState } from 'react'
import './HabitatForm.css'

const HabitatForm = ({ habitat, onSave, onCancel }) => {
    const isEdit = !!habitat
    const [ habitatData, setHabitatData ] = useState({
        name: habitat?.name || '',
        species: habitat?.species || '',
        count: habitat?.count || '',
        stage: habitat?.stage,
        image: null,
        preview: habitat?.image || null
    });
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setHabitatData(prev => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(file)
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!habitatData.name.trim() || !habitatData.species.trim() || !habitatData.count) return
        onSave({ 
            name: habitatData.name.trim(), 
            species: habitatData.species.trim(), 
            count: Number(habitatData.count), 
            stage: habitatData.stage || 'Adult', 
            image: habitatData.image 
        })
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">{isEdit ? 'Edit Habitat' : 'Add Habitat'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Habitat Name</label>
                        <input 
                        type="text" 
                        value={habitatData.name} 
                        onChange={e => setHabitatData(prev => ({...prev, name: e.target.value}))} 
                        placeholder="e.g. Pond Alpha" 
                        required />
                    </div>
                    <div className="form-group">
                        <label>Species</label>
                        <input 
                        type="text" 
                        value={habitatData.species} 
                        onChange={e => setHabitatData(prev => ({...prev, species: e.target.value}))} 
                        placeholder="e.g. Red Swamp Crayfish" 
                        required />
                    </div>
                    <div className="form-group">
                        <label>Growth Stage</label>
                        <select 
                        value={habitatData.stage} 
                        onChange={e => setHabitatData(prev => ({...prev, stage: e.target.value}))} 
                        className="form-select">
                            <option value="Hatchling">Hatchling</option>
                            <option value="Berried">Berried</option>
                            <option value="Crayling">Crayling</option>
                            <option value="Juvenile">Juvenile</option>
                            <option value="Adult">Adult</option>
                            <option value="Breeder">Breeder</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Crayfish Count</label>
                        <input type="number" 
                        value={habitatData.count} 
                        onChange={e => setHabitatData(prev => ({...prev, count: e.target.value}))} 
                        placeholder="e.g. 120" 
                        min="0" 
                        required />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} />
                        {habitatData.preview && <img src={habitatData.preview} alt="Preview" className="form-preview" />}
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
