import { useState } from 'react'
import Home from './componenets/software_componenets/Home/Home'
import Login from './componenets/software_componenets/Login/Login'
import Registration from './componenets/software_componenets/Registration/Registration'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Taskmanagment from './componenets/software_componenets/inform/taskmanagment'
import Teamcollabration from './componenets/software_componenets/inform/Teamcollabration'
import ScrollToTop from './componenets/software_componenets/middlewares/Scrolltop'
import Advance from './componenets/software_componenets/inform/Advance'
import FinancialDashboard from './componenets/sotware_admin/Sample'
import Comapany_ui from './componenets/company_admin/Main'

function App() {
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
            <Route element={<Comapany_ui/>} path='/comapny_admin' />
          </Routes>
            
        </Router>
    </>
  )
}

export default App
