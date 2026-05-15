import AppRoute from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { InventoryProvider } from './context/InventoryContext'
function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <AppRoute />
      </InventoryProvider>
    </AuthProvider>
  )
}

export default App
