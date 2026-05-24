import './SalesStockToolbar.css'

const SalesStockToolbar = ({ search, onSearchChange, habitatFilter, onFilterChange, habitats }) => {
    return (
        <div className="sales-stock-toolbar">
            <div className="toolbar-search">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Search species..."
                    value={search}
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>
            <div className="toolbar-filter">
                <label>Habitat:</label>
                <select value={habitatFilter} onChange={e => onFilterChange(e.target.value)}>
                    <option value="All">All</option>
                    {habitats.map(h => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SalesStockToolbar
