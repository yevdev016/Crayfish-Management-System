import { useState } from 'react'
import HabitatsHeader from '@/components/habitats/HabitatsHeader'
import HabitatList from '@/components/habitats/HabitatList'
import HabitatForm from '@/components/habitats/HabitatForm'
import DeleteConfirm from '@/components/habitats/DeleteConfirm'
import useHabitats from '@/hooks/useHabitats'

const Habitats = () => {
    const { habitats, addHabitat, updateHabitat, deleteHabitat } = useHabitats()
    const [showForm, setShowForm] = useState(false)
    const [editingHabitat, setEditingHabitat] = useState(null)
    const [deletingHabitat, setDeletingHabitat] = useState(null)

    const handleAdd = () => {
        setEditingHabitat(null)
        setShowForm(true)
    }

    const handleEdit = (habitat) => {
        setEditingHabitat(habitat)
        setShowForm(true)
    }

    const handleSave = (data) => {
        if (editingHabitat) {
            updateHabitat(editingHabitat.id, data)
        } else {
            addHabitat(data)
        }
        setShowForm(false)
        setEditingHabitat(null)
    }

    const handleDelete = (habitat) => {
        setDeletingHabitat(habitat)
    }

    const handleDeleteConfirm = (id) => {
        deleteHabitat(id)
        setDeletingHabitat(null)
    }

    return (
        <>
            <HabitatsHeader onAddClick={handleAdd} />
            <HabitatList habitats={habitats} onEdit={handleEdit} onDelete={handleDelete} />

            {showForm && (
                <HabitatForm
                    habitat={editingHabitat}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingHabitat(null) }}
                />
            )}

            {deletingHabitat && (
                <DeleteConfirm
                    item={deletingHabitat}
                    title="Habitat"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingHabitat(null)}
                />
            )}
        </>
    )
}

export default Habitats
