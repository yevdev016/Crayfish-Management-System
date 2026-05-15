import './DashboardHeader.css'

const DashboardHeader = ({ username = 'User' }) => {
    return (
        <div className="dashboard-header">
            <div className="dashboard-header-left">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Overview of your crayfish management</p>
            </div>
            <div className="dashboard-header-right">
                <p className="dashboard-welcome">Welcome! <span className="dashboard-username">{username}</span></p>
            </div>
        </div>
    )
}

export default DashboardHeader
