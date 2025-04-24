import { } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PetList from './pages/PetList'
import PetDetail from './pages/PetDetail'
import AddPet from './pages/AddPet'
import EditPet from './pages/EditPet'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-pet" element={
              <PrivateRoute>
                <AddPet />
              </PrivateRoute>
            } />
            <Route path="/edit-pet/:id" element={
              <PrivateRoute>
                <EditPet />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>
        <footer className="container mt-5 py-3 text-center">
          <p>&copy; {new Date().getFullYear()} Pet Adoption Portal</p>
        </footer>
      </div>
    </AuthProvider>
  )
}

export default App
