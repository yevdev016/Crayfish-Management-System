import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

const Dashboard = () => {
    return(
        <>
        <DashboardLayout />
        <Outlet />
        </>
    );
}
export default Dashboard;