
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Predictor from './Pages/Predictor'
import Navbar from './Pages/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/predictor' element={<Predictor/>}/>
      </Routes>
    </>
  )
}

export default App
