import { useState, useMemo } from 'react'
import InventoryHeader from '@/components/inventory/InventoryHeader'
import InventoryToolbar from '@/components/inventory/InventoryToolbar'
import InventoryTable from '@/components/inventory/InventoryTable'
import BatchForm from '@/components/inventory/BatchForm'
import DeleteConfirm from '@/components/habitats/DeleteConfirm'
import { useInventoryData } from '@/context/InventoryContext'
import useHabitats from '@/hooks/useHabitats'

const Inventory = () => {
    const { habitats } = useHabitats()
    const habitatNames = useMemo(() => habitats.map(h => h.name), [habitats])
    const {
        entries, totalPages, currentPage, setCurrentPage,
        search, setSearch, habitatFilter, setHabitatFilter,
        addEntry, updateEntry, deleteEntry, occupiedHabitats,
    } = useInventoryData()

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const handleAdd = () => { setEditing(null); setShowForm(true) }
    const handleEdit = (e) => { setEditing(e); setShowForm(true) }
    const handleDelete = (e) => setDeleting(e)

    const handleSave = (data) => {
        if (editing) updateEntry(editing.id, data)
        else addEntry(data)
        setShowForm(false)
        setEditing(null)
    }

    const handleDeleteConfirm = (id) => {
        deleteEntry(id)
        setDeleting(null)
    }

    return (
        <>
            <InventoryHeader onAddClick={handleAdd} />
            <InventoryToolbar
                search={search}
                onSearchChange={setSearch}
                habitatFilter={habitatFilter}
                onFilterChange={setHabitatFilter}
                habitats={habitatNames}
            />
            <InventoryTable
                entries={entries}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <BatchForm
                    habitats={habitatNames}
                    entry={editing}
                    occupiedHabitats={occupiedHabitats}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditing(null) }}
                />
            )}

            {deleting && (
                <DeleteConfirm
                    item={{ id: deleting.id, name: deleting.habitat }}
                    title="Inventory Entry"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </>
    )
}

export default Inventory
