import { useState } from 'react'
import jsPDF from 'jspdf'
import ReportsHeader from '@/components/reports/ReportsHeader'
import ReportCard from '@/components/reports/ReportCard'
import useHabitats from '@/hooks/useHabitats'
import { useInventoryData } from '@/context/InventoryContext'
import useLifecycle from '@/hooks/useLifecycle'
import './Reports.css'

const activities = [
    { action: 'Added 50 crayfish to Pond Alpha', time: '2 hours ago' },
    { action: 'Updated water parameters in Tank Beta', time: '4 hours ago' },
    { action: 'Removed 12 adults from Pond Gamma', time: '1 day ago' },
    { action: 'Generated monthly population report', time: '2 days ago' },
    { action: 'Marked 8 females as berried in Tank Delta', time: '3 days ago' },
]

const stageColors = {
    Berried: '#e65100', Crayling: '#c62828',
    Juvenile: '#1565c0', Adult: '#2e7d32', Breeder: '#7b1fa2',
}

const Reports = () => {
    const { habitats } = useHabitats()
    const { entries } = useInventoryData()
    const { stageTotals, transitions } = useLifecycle(entries)
    const [generated, setGenerated] = useState([])
    const [loading, setLoading] = useState(null)

    const addLine = (doc, text, x, y, size = 11, bold = false) => {
        doc.setFontSize(size)
        doc.setFont('helvetica', bold ? 'bold' : 'normal')
        doc.text(text, x, y)
    }

    const generateHabitatReport = () => {
        const doc = new jsPDF()
        let y = 20
        addLine(doc, 'Habitat Report', 14, y, 18, true); y += 10
        addLine(doc, `Generated: ${new Date().toLocaleDateString()}`, 14, y, 10); y += 10
        doc.line(14, y, 196, y); y += 8
        addLine(doc, 'Habitat', 14, y, 10, true)
        addLine(doc, 'Species', 70, y, 10, true)
        addLine(doc, 'Stage', 130, y, 10, true)
        addLine(doc, 'Count', 175, y, 10, true)
        y += 6; doc.line(14, y, 196, y); y += 6
        habitats.forEach(h => {
            if (y > 270) { doc.addPage(); y = 20 }
            addLine(doc, h.name, 14, y)
            addLine(doc, h.species, 70, y)
            doc.setTextColor(stageColors[h.stage] || '#333')
            addLine(doc, h.stage, 130, y)
            doc.setTextColor('#004d75')
            addLine(doc, String(h.count), 175, y)
            doc.setTextColor('#000')
            y += 8
        })
        doc.setFontSize(10)
        doc.setTextColor('#aaa')
        doc.text('Crayfish Management System', 105, 290, { align: 'center' })
        doc.save('habitat_report.pdf')
        setGenerated(prev => [...prev, { name: 'Habitat Report', file: 'habitat_report.pdf', date: new Date().toLocaleString() }])
    }

    const generateInventoryReport = () => {
        const doc = new jsPDF()
        let y = 20
        addLine(doc, 'Inventory Report', 14, y, 18, true); y += 10
        addLine(doc, `Generated: ${new Date().toLocaleDateString()}`, 14, y, 10); y += 10
        doc.line(14, y, 196, y); y += 8
        addLine(doc, 'Habitat', 14, y, 10, true)
        addLine(doc, 'Species', 70, y, 10, true)
        addLine(doc, 'Stage', 130, y, 10, true)
        addLine(doc, 'Count', 175, y, 10, true)
        y += 6; doc.line(14, y, 196, y); y += 6
        entries.forEach(e => {
            if (y > 270) { doc.addPage(); y = 20 }
            addLine(doc, e.habitat, 14, y)
            addLine(doc, e.species, 70, y)
            doc.setTextColor(stageColors[e.stage] || '#333')
            addLine(doc, e.stage, 130, y)
            doc.setTextColor('#004d75')
            addLine(doc, String(e.count), 175, y)
            doc.setTextColor('#000')
            y += 8
        })
        doc.setFontSize(10)
        doc.setTextColor('#aaa')
        doc.text('Crayfish Management System', 105, 290, { align: 'center' })
        doc.save('inventory_report.pdf')
        setGenerated(prev => [...prev, { name: 'Inventory Report', file: 'inventory_report.pdf', date: new Date().toLocaleString() }])
    }

    const generateLifecycleReport = () => {
        const doc = new jsPDF()
        let y = 20
        addLine(doc, 'Lifecycle Report', 14, y, 18, true); y += 10
        addLine(doc, `Generated: ${new Date().toLocaleDateString()}`, 14, y, 10); y += 10
        doc.line(14, y, 196, y); y += 10
        addLine(doc, 'Stage Summary', 14, y, 14, true); y += 8
        Object.entries(stageTotals).forEach(([stage, count]) => {
            addLine(doc, `${stage}: ${count}`, 20, y)
            y += 7
        })
        y += 8
        if (transitions.length > 0) {
            addLine(doc, 'Recent Transitions', 14, y, 14, true); y += 8
            addLine(doc, 'Habitat', 14, y, 10, true)
            addLine(doc, 'From', 70, y, 10, true)
            addLine(doc, 'To', 110, y, 10, true)
            addLine(doc, 'Count', 150, y, 10, true)
            addLine(doc, 'Date', 175, y, 10, true)
            y += 6; doc.line(14, y, 196, y); y += 6
            transitions.slice(0, 10).forEach(t => {
                if (y > 270) { doc.addPage(); y = 20 }
                addLine(doc, t.habitat, 14, y)
                addLine(doc, t.fromStage, 70, y)
                addLine(doc, t.toStage, 110, y)
                addLine(doc, String(t.count), 150, y)
                addLine(doc, t.date, 175, y)
                y += 8
            })
        }
        doc.setFontSize(10)
        doc.setTextColor('#aaa')
        doc.text('Crayfish Management System', 105, 290, { align: 'center' })
        doc.save('lifecycle_report.pdf')
        setGenerated(prev => [...prev, { name: 'Lifecycle Report', file: 'lifecycle_report.pdf', date: new Date().toLocaleString() }])
    }

    const generateActivityReport = () => {
        const doc = new jsPDF()
        let y = 20
        addLine(doc, 'Activity Report', 14, y, 18, true); y += 10
        addLine(doc, `Generated: ${new Date().toLocaleDateString()}`, 14, y, 10); y += 10
        doc.line(14, y, 196, y); y += 8
        addLine(doc, 'Action', 14, y, 10, true)
        addLine(doc, 'Time', 160, y, 10, true)
        y += 6; doc.line(14, y, 196, y); y += 6
        activities.forEach(a => {
            if (y > 270) { doc.addPage(); y = 20 }
            addLine(doc, a.action, 14, y)
            addLine(doc, a.time, 160, y)
            y += 8
        })
        doc.setFontSize(10)
        doc.setTextColor('#aaa')
        doc.text('Crayfish Management System', 105, 290, { align: 'center' })
        doc.save('activity_report.pdf')
        setGenerated(prev => [...prev, { name: 'Activity Report', file: 'activity_report.pdf', date: new Date().toLocaleString() }])
    }

    const generateMap = {
        habitat: generateHabitatReport,
        inventory: generateInventoryReport,
        lifecycle: generateLifecycleReport,
        activity: generateActivityReport,
    }

    const handleGenerate = (type) => {
        setLoading(type)
        setTimeout(() => {
            generateMap[type]()
            setLoading(null)
        }, 100)
    }

    return (
        <>
            <ReportsHeader />
            {['habitat', 'inventory', 'lifecycle', 'activity'].map(type => (
                <ReportCard
                    key={type}
                    type={type}
                    onGenerate={() => handleGenerate(type)}
                    loading={loading === type}
                />
            ))}

            <div className="reports-generated">
                <h3 className="reports-generated-title">Generated Reports</h3>
                {generated.length === 0 ? (
                    <p className="reports-generated-empty">No reports generated yet. Click "Generate Report" above to create one.</p>
                ) : (
                    <div className="reports-generated-list">
                        {generated.map((r, i) => (
                            <div key={i} className="reports-generated-item">
                                <div className="reports-file-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div className="reports-file-info">
                                    <span className="reports-file-name">{r.name}</span>
                                    <span className="reports-file-date">{r.date}</span>
                                </div>
                                <span className="reports-file-dl">Downloaded</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Reports
