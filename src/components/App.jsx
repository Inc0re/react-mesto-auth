import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../utils/Api'
import authApi from '../utils/AuthApi'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  function getCurrentUserInfo() {
    api
      .getCurrentUserInfo()
      .then(res => {
        setCurrentUser(currentUser => ({
          ...currentUser,
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
          cohort: res.cohort,
        }))
      })
      .catch(err => console.log(err))
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setCurrentUser({})
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      authApi
        .checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(currentUser => ({
              ...currentUser,
              email: res.email,
            }))
          }
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      getCurrentUserInfo()
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path='*'
          element={
            <ProtectedRoute
              element={Home}
              loggedIn={loggedIn}
              path='/sign-in'
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <ProtectedRoute
              element={Login}
              loggedIn={!loggedIn}
              setLoggedIn={setLoggedIn}
              path='/'
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <ProtectedRoute element={Register} loggedIn={!loggedIn} path='/' />
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
