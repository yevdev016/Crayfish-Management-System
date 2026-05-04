import Header from './components/common/Header'
import LandingPage from './pages/LandingPage'
import AppRoute from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  )
}

export default App
