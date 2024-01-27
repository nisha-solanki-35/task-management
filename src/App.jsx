import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './routes/index'

const App = () => {
  return (
    <Router>
      <AllRoutes />
    </Router>
  )
}

export default App
