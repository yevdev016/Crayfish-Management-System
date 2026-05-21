import { Link } from 'react-router-dom'

const Hero = () => {
    return(
        <section className="hero-section">
            <div className="hero-background"></div>
            <div className="hero-pattern"></div>
            <div className="hero-content">
                <span className="hero-badge">Modern Farm Management</span>
                <h1>Welcome to <span>Crayfish Management System</span></h1>
                <p>Streamline your crayfish farming operations with our comprehensive platform. Track lifecycles, manage habitats, and grow your business with confidence.</p>
                <div className="hero-buttons">
                    <Link to="/register" className="hero-btn hero-btn-primary">
                        Get Started Free
                    </Link>
                    <Link to="/login" className="hero-btn hero-btn-secondary">
                        Sign In
                    </Link>
                </div>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-value">500+</div>
                        <div className="hero-stat-label">Active Farms</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">10K+</div>
                        <div className="hero-stat-label">Batches Tracked</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">99%</div>
                        <div className="hero-stat-label">Uptime</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Hero;