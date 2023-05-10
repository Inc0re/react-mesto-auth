import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../utils/Api'
import authApi from '../utils/AuthApi'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false)

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

  function handleRegister(userData) {
    authApi
      .register(userData)
      .then(res => {
        setIsTooltipSuccess(true)
        setIsTooltipOpen(true)
      })
      .catch(err => {
        setIsTooltipSuccess(false)
        setIsTooltipOpen(true)
        console.log(err)
      })
  }

  function handleLogin(userData) {
    authApi
      .login(userData)
      .then(res => {
        if (res.token) {
          setIsTooltipSuccess(true)
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          console.log('Успешная авторизация. Токен сохранен в localStorage')
        }
      })
      .catch(err => {
        setIsTooltipSuccess(false)
        setIsTooltipOpen(true)
        console.log(err)
      })
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
              email: res.data.email,
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
              handleLogin={handleLogin}
              path='/'
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <ProtectedRoute
              element={Register}
              loggedIn={!loggedIn}
              handleRegister={handleRegister}
              path='/'
            />
          }
        />
      </Routes>
      <InfoTooltip
        isOpened={isTooltipOpen}
        isSuccess={isTooltipSuccess}
        setIsPopupOpened={setIsTooltipOpen}
      />
    </CurrentUserContext.Provider>
  )
}

export default App
