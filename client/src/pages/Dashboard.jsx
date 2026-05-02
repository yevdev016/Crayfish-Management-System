import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
    return(
        <>
        <Outlet />
        <Footer />
        </>
    );
}
export default Dashboard;