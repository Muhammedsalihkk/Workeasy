
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Registration from './features/auth/Registration/Registration'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import AddOrderForm from './pages/company/orders/addNew'
import Dashboard from './pages/company/Dashboard'
import AppLayout from './components/layouts/AppLayout'
import OrderTable from './pages/company/orders/index'
import OrderDetail from './pages/company/orders/details'
import UserProfile from './pages/company/UserProfile'
import PrivateRoute from './components/common/PrivateRoute'
import CompanyProfile from './pages/company/CompanyProfile'
import Error500 from './pages/Error/500'
import Error404 from './pages/Error/404'

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
            <Route element={<Error500/>} path='/serverdown'/>
            <Route element={<Error404/>} path='*'/>
            <Route element={<PrivateRoute><AppLayout/></PrivateRoute>}>
             <Route element={<Dashboard/>} path='/dashboard'></Route>
             <Route path="/orders/new" element={<AddOrderForm />} />
             <Route path='/orders' element={<OrderTable/>}/>
             <Route path='/orders/detail'element={<OrderDetail/>}/>
             <Route path="/user/profile" element={<UserProfile/>}/>
             <Route path="/companyProfile" element={<CompanyProfile/>}/>
            </Route>
           
          </Routes>
        </Router>
    </>
  )
}

export default App
