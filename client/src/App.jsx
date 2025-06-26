import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './componenets/software_componenets/Home/Home'
import './App.css'
import Login from './componenets/software_componenets/Login/Login'
import Registration from './componenets/software_componenets/Registration/Registration'
import {BrowserRouter as Router ,Routes,Route, Link} from 'react-router-dom'
import Taskmanagment from './componenets/software_componenets/inform/taskmanagment'
import TaskManager from './componenets/software_componenets/inform/taskmanagment'
import Teamcollabration from './componenets/software_componenets/inform/Teamcollabration'
import ScrollToTop from './componenets/software_componenets/middlewares/Scrolltop'
import Advance from './componenets/software_componenets/inform/Advance'

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const activeFAQ="index"


  return (
    <>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route element={<Home/>} path='/'/>
            <Route element={<Registration/>} path='/registration'/>
            <Route element={<Login/>} path='/login'/>
            <Route element={<Taskmanagment/>} path='/taskmanagment'/>
            <Route element={<Teamcollabration/>} path='/Teamcollabration'/>
            <Route element={<Advance/>} path='/Analytics'/>
          </Routes>
            
        </Router>
    </>
  )
}

export default App
