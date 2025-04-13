
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Predictor from './Pages/Predictor'

function App() {
  

  return (
    <>
      <Home/>
      <Routes>
        <Route path='/Predictor' element={<Predictor/>}/>
      </Routes>
    </>
  )
}

export default App
