import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Todopage from './pages/Todopage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to ="/signup"/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/todopage' element={<Todopage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
