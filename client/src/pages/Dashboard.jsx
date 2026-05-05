import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
    return(
        <>
        <DashboardLayout />
        <Outlet />
        <Footer />
        </>
    );
}
export default Dashboard;