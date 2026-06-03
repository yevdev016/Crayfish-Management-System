import { useState, useEffect } from 'react'
import ReportsHeader from '@/components/reports/ReportsHeader'
import ReportCard from '@/components/reports/ReportCard'
import { generateReport, getReportHistory } from '@/services/reportServices'
import './Reports.css'

const decodeTokenExpiry = (url) => {
  try {
    const token = new URL(url).searchParams.get('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp ? payload.exp * 1000 : null
  } catch {
    return null
  }
}

const isReportUsable = (url) => {
  const exp = decodeTokenExpiry(url)
  if (exp === null) return true
  return Date.now() < exp
}

const Reports = () => {
  const [generated, setGenerated] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getReportHistory()
        setGenerated(data
          .map(r => ({
            name: r.report_name,
            url: r.storage_url,
            date: new Date(r.created_at).toLocaleString()
          }))
          .filter(r => isReportUsable(r.url))
        )
      } catch (err) {
        console.error('Failed to load report history', err)
      }
    }
    fetchHistory()
  }, [])

  const handleGenerate = async (type) => {
    setLoading(type)
    setError('')
    try {
      const data = await generateReport(type)
      setGenerated(prev => [{
        name: data.reportName,
        url: data.pdfUrl,
        date: new Date().toLocaleString()
      }, ...prev])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(null)
    }
  }

  const visibleReports = generated.filter(r => isReportUsable(r.url))

  return (
    <>
      <ReportsHeader />
      {error && <div className="reports-error">{error}</div>}
      {['habitat', 'sales-stock', 'lifecycle', 'activity'].map(type => (
        <ReportCard
          key={type}
          type={type}
          onGenerate={() => handleGenerate(type)}
          loading={loading === type}
        />
      ))}
      <div className="reports-generated">
        <h3 className="reports-generated-title">Generated Reports</h3>
        {visibleReports.length === 0 ? (
          <p className="reports-generated-empty">No reports generated yet. Click "Generate Report" above to create one.</p>
        ) : (
          <div className="reports-generated-list">
            {visibleReports.map((r, i) => (
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
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="reports-file-dl">
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
export default Reports