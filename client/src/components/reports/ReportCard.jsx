import './ReportCard.css'

const icons = {
    habitat: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    inventory: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    lifecycle: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    activity: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    ),
}

const descriptions = {
    habitat: 'Summary of all habitats including species, growth stage, and population count.',
    inventory: 'Complete inventory breakdown grouped by habitat with stage counts.',
    lifecycle: 'Overview of crayfish lifecycle stages and recent stage transitions.',
    activity: 'Log of recent actions and changes made across the system.',
}

const ReportCard = ({ type, onGenerate, loading }) => {
    return (
        <div className="report-card">
            <div className="report-card-icon">{icons[type]}</div>
            <div className="report-card-info">
                <h3 className="report-card-title">{type.charAt(0).toUpperCase() + type.slice(1)} Report</h3>
                <p className="report-card-desc">{descriptions[type]}</p>
            </div>
            <button className="report-card-btn" onClick={onGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Report'}
            </button>
        </div>
    )
}

export default ReportCard
