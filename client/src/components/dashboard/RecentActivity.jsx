import './RecentActivity.css'

const AddIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
)

const EditIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
)

const TrashIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
)

const ReportIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
)

const activities = [
    { action: 'Added 50 crayfish to Pond Alpha', type: 'add', time: '2 hours ago' },
    { action: 'Updated water parameters in Tank Beta', type: 'edit', time: '4 hours ago' },
    { action: 'Removed 12 adults from Pond Gamma', type: 'delete', time: '1 day ago' },
    { action: 'Generated monthly population report', type: 'report', time: '2 days ago' },
    { action: 'Marked 8 females as berried in Tank Delta', type: 'add', time: '3 days ago' },
]

const iconMap = { add: AddIcon, edit: EditIcon, delete: TrashIcon, report: ReportIcon }
const colorMap = { add: '#27ae60', edit: '#1565c0', delete: '#c62828', report: '#e67e22' }

const RecentActivity = () => {
    return (
        <div className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
                {activities.map((a, i) => {
                    const Icon = iconMap[a.type]
                    return (
                        <div key={i} className="activity-item">
                            <div className="activity-icon" style={{ backgroundColor: colorMap[a.type] + '15', color: colorMap[a.type] }}>
                                {Icon}
                            </div>
                            <div className="activity-info">
                                <p className="activity-action">{a.action}</p>
                                <span className="activity-time">{a.time}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentActivity
