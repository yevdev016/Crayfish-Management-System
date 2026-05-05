import { Link } from 'react-router-dom'
import Button from '../ui/Buttons';
import navLogo from '@/assets/nav-logo.png'
import dashboard from '@/assets/dashboard.png'
import habitat from '@/assets/habitats.png'
import inventory from '@/assets/inventory.png'
import lifecycle from '@/assets/lifecycle.png'
import report from '@/assets/report.png'
import logout from '@/assets/logout.png'
import './Navigation.css'
import { signout } from '../../services/authServices';
import { useAuth } from '../../context/AuthContext'
const AdminNav = () => {
    const { setIsAuthenticated } = useAuth();
    const handleLogout = async () => {
        try {
            await signout();
            setIsAuthenticated(false);
        } catch(err){
            console.log("Error setting authentication",err)
        }
        
    }
    return(
        <div className="navigation-container">
            <div className='nav-logo-container'>
                <img src={navLogo} alt="Logo" />
            </div>

            <div className='navigation'>
                <div className='navigation-item'>
                    <img src={dashboard} alt="Home" />
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className='navigation-item'>
                    <img src={habitat} alt="Habitat" />
                    <Link to="/habitats">Habitats</Link>
                </div>
                <div className='navigation-item'>
                    <img src={inventory} alt="Inventory" />
                    <Link to="/inventory">Inventory</Link>
                </div>
                <div className='navigation-item'>
                    <img src={lifecycle} alt="Lifecycle" />
                    <Link to="/lifecycle">Lifecycle</Link>
                </div>
                <div className='navigation-item'>
                    <img src={report} alt="Report" />
                    <Link to="/reports">Reports</Link>
                </div>
            </div>

            <div className='logout-container'>
                <img src={logout} alt="Logout" />
                <Button variant='none' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}
export default AdminNav;