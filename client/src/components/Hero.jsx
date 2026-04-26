import { Link } from 'react-router-dom'
const Hero = () => {
    return(
        <section className="hero-section">
            <div className="hero-content">
                <h1>Welcome to Crayfish Management System</h1>
                <p>Manage your crayfish farms efficiently with our intuitive system.</p>
                <Link to="/register">
                    Get Started
                </Link>
            </div>
        </section>
    );
}
export default Hero;