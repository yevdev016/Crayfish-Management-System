import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import './LandingPageLayout.css'
const LandingPageLayout = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <div className="content-area">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
export default LandingPageLayout;