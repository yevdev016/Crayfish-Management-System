import { Link } from 'react-router-dom'

const Features = () => {
    return (
        <>
            <section className="features-section">
                <div className="features-header">
                    <h2>Everything You Need to Manage Your Farm</h2>
                    <p>Our comprehensive toolkit helps you monitor, track, and optimize every aspect of your crayfish operations.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🏡</div>
                        <h3>Habitat Management</h3>
                        <p>Monitor and manage multiple habitats including ponds, aquariums, and drum systems from a centralized dashboard.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Lifecycle Tracking</h3>
                        <p>Record and track every stage of development from berried females through craylings, juveniles, and adults.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Species Inventory</h3>
                        <p>Maintain detailed registries for Australian Red Claw and other species with precise environmental data logging.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Detailed Reports</h3>
                        <p>Generate comprehensive reports on population growth, mortality rates, and production metrics to make data-driven decisions.</p>
                    </div>
                </div>
            </section>
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Transform Your Farm?</h2>
                    <p>Join hundreds of crayfish farmers who have streamlined their operations with our management system.</p>
                    <Link to="/register" className="cta-button">Start Your Free Trial</Link>
                </div>
            </section>
        </>
    );
}

export default Features;