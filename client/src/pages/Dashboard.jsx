import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatsGrid from '@/components/dashboard/StatsGrid'
import HabitatOverview from '@/components/dashboard/HabitatOverview'
import LifecycleOverview from '@/components/dashboard/LifecycleOverview'
import RecentActivity from '@/components/dashboard/RecentActivity'
import './Dashboard.css'
import { useAuth } from '../context/AuthContext'
const Dashboard = () => {
    const { user } = useAuth();
    return (
        <>
            <DashboardHeader username={user?.username}/>
            <StatsGrid />
            <div className="dashboard-body">
                <div className="dashboard-grid">
                    <div className="dashboard-section">
                        <HabitatOverview />
                    </div>
                    <div className="dashboard-section">
                        <LifecycleOverview />
                    </div>
                    <div className="dashboard-section">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
