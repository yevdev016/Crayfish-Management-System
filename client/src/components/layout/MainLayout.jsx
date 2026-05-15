import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
    return(
        <div className="main-layout">
            <Navigation />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}
export default MainLayout;
