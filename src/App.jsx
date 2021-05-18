import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components'

import Dashboard from './pages/Dashboard'
import Boards from './pages/Boards'
import Board from './pages/Board'
import NotFound from './pages/404'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
