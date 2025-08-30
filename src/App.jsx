import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CelebTea from './pages/CelebTea'
import NavBar from './components/NavBar'
import CinemaFit from './pages/CinemaFit'
import WatchList from './pages/Watchlist'
import MovieAppFooter from './components/Footer'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema-fit" element={<CinemaFit />} />
        <Route path="/celeb-tea" element={<CelebTea />} />
        <Route path="/celeb-tea/:id" element={<CelebTea />} />
        <Route path="/watch-list" element={<WatchList />} />
      </Routes>
      <MovieAppFooter />
    </Router>  
  )
}

export default App
