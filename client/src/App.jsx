import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./views/dashboard/Dashboard.jsx"
import Landing from "./views/landing/Landing.jsx"
import PrivateRoutes from "./utils/PrivateRoutes.jsx"

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [loggedUser, setLoggedUser] = useState("")


  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Dashboard setLoggedIn={setLoggedIn} loggedUser={loggedUser} />} />
          </Route>
          <Route path="/login" element={<Landing setLoggedIn={setLoggedIn} setLoggedUser={setLoggedUser} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
