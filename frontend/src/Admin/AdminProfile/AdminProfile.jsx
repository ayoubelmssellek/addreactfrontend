import './AdminProfile.css'; // Import the CSS file
import { useState } from 'react';
import { Clock, Package, Users as UsersIcon } from 'lucide-react';

const SAMPLE_ORDERS = [
  {
    id: '1',
    items: [
      { menuItemId: '1', quantity: 2 },
      { menuItemId: '2', quantity: 1, specialInstructions: 'No sauce' },
    ],
    type: 'dine-in',
    status: 'in-progress',
    tableNumber: 5,
    customer: 'John Doe',
    totalAmount: 54.97,
    createdAt: new Date('2025-03-20T12:30:00'),
    updatedAt: new Date('2025-03-20T12:35:00'),
  },
  {
    id: '2',
    items: [
      { menuItemId: '1', quantity: 2 },
      { menuItemId: '2', quantity: 1, specialInstructions: 'No sauce' },
    ],
    type: 'delivery',
    status: 'delivery',
    tableNumber: 5,
    customer: 'John Doe',
    totalAmount: 54.97,
    createdAt: new Date('2025-03-20T12:30:00'),
    updatedAt: new Date('2025-03-20T12:35:00'),
  },
];

export function AdminProfile() {
  const [orders] = useState(SAMPLE_ORDERS);
  const [selectedType, setSelectedType] = useState('all');

  const orderTypes = ['dine-in', 'takeaway', 'delivery'];
  const statusColors = {
    pending: 'status-pending',
    'in-progress': 'status-in-progress',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
  };

  const filteredOrders =
    selectedType === 'all'
      ? orders
      : orders.filter((order) => order.type === selectedType);

  return (
    <div className="orders-page">
      <div className="header">
        <h1>Orders Management</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <UsersIcon className="icon" />
          </div>
          <div>
            <p className="stat-label">Dine-in Orders</p>
            <p className="stat-value">
              {orders.filter((o) => o.type === 'dine-in').length}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <Package className="icon" />
          </div>
          <div>
            <p className="stat-label">Takeaway Orders</p>
            <p className="stat-value">
              {orders.filter((o) => o.type === 'takeaway').length}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <Clock className="icon" />
          </div>
          <div>
            <p className="stat-label">Delivery Orders</p>
            <p className="stat-value">
              {orders.filter((o) => o.type === 'delivery').length}
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
              <th>Type</th>
              <th>Status</th>
              <th>Total</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className="order-id">#{order.id}</span>
                </td>
                <td>{order.customer}</td>
                <td className="capitalize">{order.type}</td>
                <td>
                  <span className={`status ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProfile;
