import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
    return(
        <div className="main-layout">
            <Navigation />
            <div className="main-content">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}
export default MainLayout;
