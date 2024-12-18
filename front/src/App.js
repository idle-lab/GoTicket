import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Top from './components/Top'
import Bottom from './components/Bottom'
import Home from './pages/Home'
import Profile from './pages/profile'
import Admin from './pages/Admin'
import TrainRoute from './pages/TrainRoute'
import Booking from './pages/Booking'
import { UserProvider } from './contexts/UserContext'

const App = () => (
  <UserProvider>
    <Router>
      <div className="App">
        <Top />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/routes" element={<TrainRoute />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Bottom />
      </div>
    </Router>
  </UserProvider>
)

export default App

