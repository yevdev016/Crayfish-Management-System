import { Routes, Route} from 'react-router-dom'
import LandingPageLayout from '../components/layout/LandingPageLayout'
import LandingPage from '../pages/LandingPage';
import Register from '../pages/RegisterPage';
import Login from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
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
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
export default AppRoute;