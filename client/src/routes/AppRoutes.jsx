import { Routes, Route} from 'react-router-dom'
import LandingPageLayout from '@/components/layout/LandingPageLayout'
import LandingPage from '@/pages/LandingPage';
import Register from '@/pages/RegisterPage';
import Login from '@/pages/LoginPage'
import Dashboard from '@/pages/Dashboard'
import Habitats from '@/pages/Habitats'
import Inventory from '@/pages/Inventory'
import Lifecycle from '@/pages/Lifecycle'
import Reports from '@/pages/Reports'
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import MainLayout from '@/components/layout/MainLayout';
const AppRoute = () => {    
    return(
        <Routes>
            <Route path="/" element={<LandingPageLayout />}>
                <Route index element={<LandingPage />}/>

                <Route element={<GuestRoute />}>
                    <Route path="register" element={<Register />}/>
                    <Route path='login' element={<Login />}/>
                </Route>
               
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/habitats' element={<Habitats />} />
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/lifecycle' element={<Lifecycle />} />
                    <Route path='/reports' element={<Reports />} />
                </Route>
            </Route>
        </Routes>
    );
}
export default AppRoute;