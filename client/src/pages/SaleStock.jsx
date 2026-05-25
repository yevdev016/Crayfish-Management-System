import { useState, useMemo } from 'react'
import SalesStockHeader from '@/components/salesStock/SalesStockHeader'
import SalesStockToolbar from '@/components/salesStock/SalesStockToolbar'
import SalesStockTable from '@/components/salesStock/SalesStockTable'
import HarvestForm from '@/components/salesStock/HarvestForm'
import SellModal from '@/components/salesStock/SellModal'
import DeleteConfirm from '@/components/habitats/DeleteConfirm'
import useSaleStock from '@/hooks/useSalesStock'
import useHabitats from '@/hooks/useHabitats'

const SaleStock = () => {
    const { habitats } = useHabitats()
    const habitatNames = useMemo(() => habitats.map(h => ({ id: h.id, name: h.name, species: h.species, stage: h.stage })), [habitats])
    const habitatNameList = useMemo(() => habitatNames.map(h => h.name), [habitatNames])
    const {
        saleStock: entries,
        totalPages,
        currentPage, setCurrentPage,
        search, setSearch,
        habitatFilter, setHabitatFilter,
        addSaleStock: addEntry,
        updateSaleStock: updateEntry,
        deleteSaleStock: deleteEntry,
        sellSaleStock: sellEntry,
        isLoading, fetchError, refresh,
    } = useSaleStock()

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [selling, setSelling] = useState(null)

    const handleAdd = () => { setEditing(null); setShowForm(true) }
    const handleEdit = (e) => { setEditing(e); setShowForm(true) }
    const handleDelete = (e) => setDeleting(e)
    const handleSell = (e) => setSelling(e)

    const handleSave = async (data) => {
        try {
            if (editing) {
                await updateEntry(editing.id, data)
            } else {
                await addEntry(data)
            }
            setShowForm(false)
            setEditing(null)
        } catch (err) {
            console.error('Save failed', err)
        }
    }

    const handleDeleteConfirm = async (id) => {
        try {
            await deleteEntry(id)
            setDeleting(null)
        } catch (err) {
            console.error('Delete failed', err)
        }
    }

    const handleSellConfirm = async (id, customerName) => {
        try {
            await sellEntry(id, customerName)
            setSelling(null)
        } catch (err) {
            console.error('Sell failed', err)
        }
    }

    if (isLoading) {
        return (
            <>
                <SalesStockHeader onAddClick={handleAdd} />
                <div className="sales-stock-empty">Loading entries...</div>
            </>
        )
    }

    if (fetchError) {
        return (
            <>
                <SalesStockHeader onAddClick={handleAdd} />
                <div className="sales-stock-empty">
                    <p>{fetchError}</p>
                    <button className="sales-stock-add-btn" style={{ marginTop: 12 }} onClick={refresh}>Retry</button>
                </div>
                {showForm && (
                    <HarvestForm
                        habitats={habitatNames}
                        entry={editing}
                        onSave={handleSave}
                        onCancel={() => { setShowForm(false); setEditing(null) }}
                    />
                )}
                {selling && (
                    <SellModal
                        entry={selling}
                        onConfirm={handleSellConfirm}
                        onCancel={() => setSelling(null)}
                    />
                )}
                {deleting && (
                    <DeleteConfirm
                        item={{ id: deleting.id, name: `${deleting.habitat} - ${deleting.species}` }}
                        title="Sales Stock Entry"
                        onConfirm={() => handleDeleteConfirm(deleting.id)}
                        onCancel={() => setDeleting(null)}
                    />
                )}
            </>
        )
    }

    return (
        <>
            <SalesStockHeader onAddClick={handleAdd} />
            <SalesStockToolbar
                search={search}
                onSearchChange={setSearch}
                habitatFilter={habitatFilter}
                onFilterChange={setHabitatFilter}
                habitats={habitatNameList}
            />
            <SalesStockTable
                entries={entries}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onEdit={handleEdit}
                onSell={handleSell}
                onDelete={handleDelete}
            />

            {showForm && (
                <HarvestForm
                    habitats={habitatNames}
                    entry={editing}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditing(null) }}
                />
            )}

            {selling && (
                <SellModal
                    entry={selling}
                    onConfirm={handleSellConfirm}
                    onCancel={() => setSelling(null)}
                />
            )}

            {deleting && (
                <DeleteConfirm
                    item={{ id: deleting.id, name: `${deleting.habitat} - ${deleting.species}` }}
                    title="Sales Stock Entry"
                    onConfirm={() => handleDeleteConfirm(deleting.id)}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </>
    )
}

export default SaleStock
