import React from 'react'
import './styles/app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CanvasPage from './pages/CanvasPage'
import FormPage from './pages/FormPage'
import HomePage from './pages/HomePage'
import FinishPage from './pages/FinishPage'

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* query: round */}
        <Route path='/drawRound/:round' element={<CanvasPage/>}/>
        <Route path='/writeRound/:round' element={<FormPage/>}/>
        <Route path='/:id' element={<HomePage/>}/>
        <Route path='/finish/:id' element={<FinishPage/>}/>
        <Route
          path="*"
          element={<Navigate to={`/f${Date.now().toString(16)}`}/>}
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App