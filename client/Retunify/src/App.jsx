import React from 'react'
import {Routes, Route} from 'react-router-dom'

import MainPage from './Test_Pages/MainTest'
import UserPage from './Test_Pages/UserTest'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} > </Route>
      <Route path='/user-page' element={<UserPage/>} > </Route>
    </Routes>
  )
}

export default App