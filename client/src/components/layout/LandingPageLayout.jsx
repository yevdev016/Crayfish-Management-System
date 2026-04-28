import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import './LandingPageLayout.css'
const LandingPageLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
          
    );
}
export default LandingPageLayout;