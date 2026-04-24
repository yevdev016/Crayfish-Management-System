import { Routes, Route} from 'react-router-dom'
import LandingPageLayout from '../components/layout/LandingPageLayout'
import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
const AppRoute = () => {
    return(
        <Routes>
            <Route path="/" element={<LandingPageLayout />}>
                <Route index element={<LandingPage />}/>
                <Route path="register" element={<Register />}/>
                {/* <Route path='login'/> */}
            </Route>
        </Routes>
    );
}
export default AppRoute;