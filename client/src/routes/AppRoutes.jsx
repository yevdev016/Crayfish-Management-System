import { Routes, Route} from 'react-router-dom'
import LandingPageLayout from '../components/layout/LandingPageLayout'
import LandingPage from '../pages/LandingPage';
import Register from '../pages/RegisterPage';
import Login from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
const AppRoute = () => {
    return(
        <Routes>
            <Route path="/" element={<LandingPageLayout />}>
                <Route index element={<LandingPage />}/>
                <Route path="register" element={<Register />}/>
                <Route path='login' element={<Login />}/>
            </Route>

            <Route path='/dashboard' element={<Dashboard />}>

            </Route>
        </Routes>
    );
}
export default AppRoute;