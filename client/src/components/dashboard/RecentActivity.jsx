import { useState, useEffect, useMemo } from 'react'
import { getActivities } from '@/services/activityServices'
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

const SellIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const HarvestIcon = (
    <svg viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
)

const iconMap = { add: AddIcon, edit: EditIcon, delete: TrashIcon, report: ReportIcon, sell: SellIcon, harvest: HarvestIcon }
const colorMap = { add: '#27ae60', edit: '#1565c0', delete: '#c62828', report: '#e67e22', sell: '#059669', harvest: '#7c3aed' }

const inferType = (action) => {
    const lower = action.toLowerCase()
    if (lower.includes('created') || lower.includes('added') || lower.includes('add') || lower.includes('record')) return 'add'
    if (lower.includes('updated') || lower.includes('edit')) return 'edit'
    if (lower.includes('deleted') || lower.includes('remove') || lower.includes('delete')) return 'delete'
    if (lower.includes('sold') || lower.includes('sale')) return 'sell'
    if (lower.includes('harvest') || lower.includes('harvested')) return 'harvest'
    if (lower.includes('report') || lower.includes('generated')) return 'report'
    return 'add'
}

const timeAgo = (dateStr) => {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.max(0, Math.floor((now - then) / 1000))
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
    return new Date(dateStr).toLocaleDateString()
}

const RecentActivity = () => {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getActivities()
            .then(setActivities)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const list = useMemo(() => activities.slice(0, 8), [activities])

    if (loading) {
        return (
            <div className="recent-activity">
                <h2 className="section-title">Recent Activity</h2>
                <p className="activity-empty">Loading...</p>
            </div>
        )
    }

    return (
        <div className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            {list.length === 0 ? (
                <p className="activity-empty">No activity yet.</p>
            ) : (
                <div className="activity-list">
                    {list.map((a) => {
                        const type = inferType(a.action)
                        const Icon = iconMap[type] || AddIcon
                        return (
                            <div key={a.id} className="activity-item">
                                <div className="activity-icon" style={{ backgroundColor: (colorMap[type] || '#94a3b8') + '15', color: colorMap[type] || '#94a3b8' }}>
                                    {Icon}
                                </div>
                                <div className="activity-info">
                                    <p className="activity-action">{a.action}</p>
                                    <span className="activity-time">{timeAgo(a.created_at)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default RecentActivity
