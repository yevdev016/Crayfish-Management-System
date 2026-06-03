import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatsGrid from '@/components/dashboard/StatsGrid'
import HabitatOverview from '@/components/dashboard/HabitatOverview'
import SalesOverview from '@/components/dashboard/SalesOverview'
import LifecycleOverview from '@/components/dashboard/LifecycleOverview'
import MonthlySalesChart from '@/components/dashboard/MonthlySalesChart'
import RecentActivity from '@/components/dashboard/RecentActivity'
import './Dashboard.css'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth()
    const [view, setView] = useState('habitat')

    return (
        <>
            <DashboardHeader username={user?.username} />

            <div className="dashboard-toggle-bar">
                <div className="view-toggle">
                    <div className={`toggle-slider ${view}`} />
                    <button
                        className={view === 'habitat' ? 'active' : ''}
                        onClick={() => setView('habitat')}
                    >
                        Habitat
                    </button>
                    <button
                        className={view === 'sales' ? 'active' : ''}
                        onClick={() => setView('sales')}
                    >
                        Sales
                    </button>
                </div>
            </div>

            <StatsGrid view={view} />

            <div className="dashboard-body">
                <div className="dashboard-grid">
                    <div className="dashboard-section fade-section">
                        {view === 'habitat' ? <HabitatOverview /> : <SalesOverview />}
                    </div>
                    <div className="dashboard-section fade-section">
                        {view === 'habitat' ? <LifecycleOverview /> : <MonthlySalesChart />}
                    </div>
                    <div className="dashboard-section fade-section">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
