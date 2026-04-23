import Header from "../common/Header";
import Hero from "../Hero";
import Features from "../Features";
import Footer from "../common/Footer";
import './LandingPageLayout.css'
const LandingPageLayout = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <div className="landing-page">
                <Hero />
                <Features />
                <Footer />
            </div>
        </div>
    );
}
export default LandingPageLayout;