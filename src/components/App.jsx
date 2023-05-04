import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../utils/Api'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  React.useEffect(() => {
    api
      .getCurrentUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Routes>
        <Route
          path='*'
          element={
            <ProtectedRoute
              element={Home}
              loggedIn={loggedIn}
              path='/sign-up'
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/sign-up' element={<Register />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
