import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Top from './components/Top'
import Bottom from './components/Bottom'
import Home from './pages/Home'

const App = () => (
  <Router>
    <div className="App">
      <Top />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Bottom />
    </div>
  </Router>
)

export default App

