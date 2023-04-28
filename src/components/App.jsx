import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../utils/Api'

function App() {
  const [currentUser, setCurrentUser] = React.useState(null)

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
        <Route path='/' element={<Home setCurrentUser={setCurrentUser} />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
