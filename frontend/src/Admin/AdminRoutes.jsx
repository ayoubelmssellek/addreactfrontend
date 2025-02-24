// import './App.css'
import './AdminStyles/Adminindex.css'
 import 'preline';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Products from './Pages/Products/Products';
import Dashboard from './Dashboard/Dashboard';
import AddProduct from './Pages/AddProduct/AddProduct';
import UpdateSelectedProduct from './Pages/Up/UpdateSelectedProduct';
import ViewMore from './Pages/ViewMore/ViewMore';
import Employees from './Employees/ListEmployees/Employees';
import AddEmployees from './Employees/AddEmployee/AddEmployee';
import UpdateEmployees from './Employees/UpdateEmployee/UpdateEmployees';
import Notifiication from './Notification/Notifiication';
import ListeOrders from './Orders/ListeOrders';
// import Login from './Admin/Pages/Login/Login';
import {Route, Routes } from 'react-router-dom';
function AdminRoutes() {
  
return (
    <div  className='adminbody'>

        <Routes>
          <Route path='/Dashboard/:role' element={<Dashboard/>} />
          <Route path='/Dashboard/:role/Products' element={<Products/>} />
          <Route path='/Dashboard/:role/ViewMore/:Code' element={<ViewMore/>} />
          <Route path='/Dashboard/:role/AddProduct' element={<AddProduct/>} />
          <Route path='/Dashboard/:role/UpdateSelectedProduct/:Code' element={<UpdateSelectedProduct/>} />
          <Route path='/Dashboard/:role/Employees' element={<Employees/>} />
          <Route path='/Dashboard/:role/AddEmployees' element={<AddEmployees/>} />
          <Route path='/Dashboard/:role/UpdateEmployees/:Code' element={<UpdateEmployees/>} />
          <Route path='/Dashboard/:role/ListeOrders' element={<ListeOrders/>} />
          <Route path='/Dashboard/:role/Notifiication' element={<Notifiication/>} />
        </Routes>
    </div>
  )
}

export default AdminRoutes
{/* <Route path='/Login' element={<Login/>} /> */}