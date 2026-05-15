import './LifecycleHeader.css'

const LifecycleHeader = ({ onRecordClick }) => {
    return (
        <div className="lifecycle-header">
            <h1 className="lifecycle-title">Lifecycle</h1>
            <button className="lifecycle-record-btn" onClick={onRecordClick}>+ Record</button>
        </div>
    )
}

export default LifecycleHeader
