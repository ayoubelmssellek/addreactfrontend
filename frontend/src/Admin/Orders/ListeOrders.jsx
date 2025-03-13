import { useState } from 'react';
import { Truck, Utensils, Table, Eye, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import styles from './ListeOrders.module.css';
import { Link, useParams } from 'react-router-dom';
import { UpdateOrderStatus } from '../Redux/Action';

const ListeOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('all');
  const listorders = useSelector((state) => state.admin?.orders );
  const dispatch = useDispatch();
  const { role } = useParams();

  // Status configuration
  const statusConfig = {
    'in-preparation': {
      label: 'جاري التحضير',
      className: styles.statusInPreparation,
    },
    ready: {
      label: 'جاهز',
      className: styles.statusReady,
    },
    delivered: {
      label: 'تم التوصيل',
      className: styles.statusDelivered,
    },
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(UpdateOrderStatus(orderId, newStatus));
  };

  // Combined filter logic
  const filteredOrders = listorders.filter((order) => {
    const statusMatch =
      selectedStatus === 'all' || order.statu === selectedStatus;
    const typeMatch =
      selectedDeliveryType === 'all' || order.deliveryType === selectedDeliveryType;
    return statusMatch && typeMatch;
  });

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  return (
    <div className={styles.content}>
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div
        className={`${styles.allBadges} ${
          isOpen ? styles.pushMainContent : styles.ml20
        }`}
      >
        <Navbar pagePath="Orders Management" />
        <div className={styles.pages}>
          <div className={styles.ordersPage}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.bgBlue}`}>
                  <Utensils className={styles.icon} />
                </div>
                <div>
                  <p className={styles.statLabel}>Total Orders</p>
                  <p className={styles.statValue}>{listorders.length}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.bgGreen}`}>
                  <Table className={styles.icon} />
                </div>
                <div>
                  <p className={styles.statLabel}>Takeaway Orders</p>
                  <p className={styles.statValue}>
                    {listorders.filter((o) => o.type === 'order').length}
                  </p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.bgPurple}`}>
                  <Truck className={styles.icon} />
                </div>
                <div>
                  <p className={styles.statLabel}>Delivery Orders</p>
                  <p className={styles.statValue}>
                    {listorders.filter((o) => o.street === '56545').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className={styles.filterSection}>
              <div className={styles.filterGroup}>
                <div className={styles.filterButtons}>
                  <button
                    className={`${styles.filterButton} ${
                      selectedStatus === 'all' ? styles.active : ''
                    }`}
                    onClick={() => setSelectedStatus('all')}
                  >
                    All Status
                  </button>
                  {Object.keys(statusConfig).map((status) => (
                    <button
                      key={status}
                      className={`${styles.filterButton} ${
                        selectedStatus === status ? styles.active : ''
                      }`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>

                <div className={styles.filterButtons}>
                  <button
                    className={`${styles.filterButton} ${
                      selectedDeliveryType === 'all' ? styles.active : ''
                    }`}
                    onClick={() => setSelectedDeliveryType('all')}
                  >
                    All Types
                  </button>
                  <button
                    className={`${styles.filterButton} ${
                      selectedDeliveryType === 'pickup' ? styles.active : ''
                    }`}
                    onClick={() => setSelectedDeliveryType('pickup')}
                  >
                    Pickup
                  </button>
                  <button
                    className={`${styles.filterButton} ${
                      selectedDeliveryType === 'delivery' ? styles.active : ''
                    }`}
                    onClick={() => setSelectedDeliveryType('delivery')}
                  >
                    Delivery
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className={styles.ordersTable}>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.orderNumber}</td>
                      <td>{order.name}</td>
                      <td>{order.phonenumber}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            statusConfig[order.statu]?.className
                          }`}
                        >
                          {statusConfig[order.statu]?.label || order.statu}
                        </span>
                      </td>
                      <td>
                        <div className={styles.selectWrapper}>
                          <select
                            value={order.statu}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className={styles.statusSelect}
                          >
                            {Object.keys(statusConfig).map((status) => (
                              <option key={status} value={status}>
                                {statusConfig[status].label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className={styles.selectIcon} size={16} />
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/admin/Dashboard/${role}/ViewOrderDetails/${order.id}`}
                        >
                          <Eye color="#3b82f6" />
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