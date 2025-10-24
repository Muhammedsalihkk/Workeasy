
import Home from './componenets/software_componenets/Home/Home'
import Login from './componenets/software_componenets/Login/Login'
import Registration from './componenets/software_componenets/Registration/Registration'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import ScrollToTop from './componenets/software_componenets/middlewares/Scrolltop'
import AddOrderForm from './componenets/company_admin/OrderPages/addNew'
import Dashboard from './componenets/company_admin/Dashbord'
import AppLayout from './componenets/company_admin/Layouts/Applayout'
import OrderTable from './componenets/company_admin/OrderPages/index'
import OrderDetail from './componenets/company_admin/OrderPages/details'
import UserProfile from './componenets/company_admin/UserProfile'
import Privatrouter from './componenets/Privatrouter'
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
            <Route element={<Privatrouter><AppLayout/></Privatrouter>}>
             <Route element={<Dashboard/>} path='/dashboard'></Route>
             <Route path="/orders/new" element={<AddOrderForm />} />
             <Route path='/orders' element={<OrderTable/>}/>
             <Route path='/orders/detail'element={<OrderDetail/>}/>
             <Route path="/user/profile" element={<UserProfile/>}/>
            </Route>
           
          </Routes>
        </Router>
    </>
  )
}

export default App
