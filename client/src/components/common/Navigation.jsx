import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Buttons';
import navLogo from '@/assets/nav-logo.png'
import dashboard from '@/assets/dashboard.png'
import habitat from '@/assets/habitats.png'
import inventory from '@/assets/inventory.png'
import lifecycle from '@/assets/lifecycle.png'
import report from '@/assets/report.png'
import logout from '@/assets/logout.png'
import './Navigation.css'
import { signout } from '@/services/authServices';
import { useAuth } from '@/context/AuthContext'

const AdminNav = () => {
    const { setIsAuthenticated, setUser } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = async () => {
        try {
            await signout();
            setIsAuthenticated(false);
            setUser(null);
        } catch(err){
            console.log("Error setting authentication", err)
        }
    }

    return(
        <div className={`navigation-container ${expanded ? 'nav-expanded' : 'nav-collapsed'}`}>
            <button className="nav-arrow" onClick={() => setExpanded(prev => !prev)} aria-label="Toggle sidebar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d={expanded ? "M14 4L6 10L14 16" : "M6 4L14 10L6 16"} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <Link to="/dashboard" className='nav-logo-container'>
                <img src={navLogo} alt="Logo" />
            </Link>

            <div className='navigation'>
                <Link to="/dashboard" className='navigation-item'>
                    <img src={dashboard} alt="Dashboard" />
                    <span className="nav-label">Dashboard</span>
                </Link>
                <Link to="/habitats" className='navigation-item'>
                    <img src={habitat} alt="Habitat" />
                    <span className="nav-label">Habitats</span>
                </Link>
                <Link to="/sales-stock" className='navigation-item'>
                    <img src={inventory} alt="Sales Stock" />
                    <span className="nav-label">Sales Stock</span>
                </Link>
                <Link to="/lifecycle" className='navigation-item'>
                    <img src={lifecycle} alt="Lifecycle" />
                    <span className="nav-label">Lifecycle</span>
                </Link>
                <Link to="/reports" className='navigation-item'>
                    <img src={report} alt="Report" />
                    <span className="nav-label">Reports</span>
                </Link>
            </div>

            <button className='logout-container' onClick={handleLogout}>
                <img src={logout} alt="Logout" />
                <span className="nav-label">Logout</span>
            </button>
        </div>
    );
}
export default AdminNav;
