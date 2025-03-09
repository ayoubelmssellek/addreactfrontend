import { useState } from 'react';
import {Truck , Utensils, Table,Eye  } from 'lucide-react';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import './ListeOrders.css';
import { Link, useParams } from 'react-router-dom';


const ListeOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const listorders = useSelector((state) => state.admin.orders || []);
  const {role}=useParams()
  console.log(listorders);
 

  const orderTypes = ['dine-in', 'delivery'];
  
  const statusColors = {
    pending: 'status-pending',
    'in-progress': 'status-in-progress',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
  };

  // Calculate total amount for each order
  const ordersWithTotal = listorders.map((order) => ({
    ...order,
    totalAmount: order.items.reduce((total, item) => total + item.price * item.Quantity, 0),
  }));

  // Filter orders based on selected type
  const filteredOrders =
    selectedType === 'all'
      ? ordersWithTotal
      : ordersWithTotal.filter((order) => order.type === selectedType);

  // Handle sidebar state change
  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  return (
    <div className="content">
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar pagePath="Orders Management" />
        <div className="pages">
          <div className="orders-page">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon bg-blue">
                  <Utensils className="icon" />
                </div>
                <div>
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">
                    {ordersWithTotal.length}
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon bg-green">
                  <Table className="icon" />
                </div>
                <div>
                  <p className="stat-label">pickup Orders</p>
                  <p className="stat-value">
                    {ordersWithTotal.filter((o) => o.deliveryType === 'pickup').length}
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon bg-purple">
                  <Truck className="icon" />
                </div>
                <div>
                  <p className="stat-label">Delivery Orders</p>
                  <p className="stat-value">
                    {ordersWithTotal.filter((o) => o.deliveryType !== 'pickup').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                All Orders
              </button>
              {orderTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-button ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="order-id">#{order.id}</span>
                      </td>
                      <td>{order.name}</td>
                      <td>{order.phonenumber}</td>
                      <td>
                         13/03/2025 17:23
                      </td>
                      <td>
                        <span className={`status ${statusColors['pending']}`}>Pending</span>
                      </td>
                      <td> 
                        <Link to={`/admin/Dashboard/${role}/ViewOrderDetails/${order.id}`}>
                            <Eye color='#3b82f6'/>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeOrders;