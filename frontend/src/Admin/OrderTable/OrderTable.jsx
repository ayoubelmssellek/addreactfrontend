import './OrderTable.css';
import { useSelector } from 'react-redux';
const OrderTable = () => {
  const listorders=useSelector((state)=>state.admin.orders)
  return (
    <div className="recent-orders">
    <div className="table-header">
        <h3>Recent Orders</h3>
    </div>
    <div className="table-container2">
        <table className="table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                  listorders.map((order,index)=>
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.date}</td>
                  <td>{order.items.length>1?`${order.items.length} items`:`${order.items.length} item`}</td>
                  <td>
                      <span className={`${order.statu==='Delivered'?'status completed':(order.statu==='Ready to deliver')?'status confirmed':'status processing'}`}>{order.statu?order.statu:'In preparation'}</span>
                  </td>
                </tr>
                  )
                }
            </tbody>
        </table>
    </div>
</div>
  );
};

export default OrderTable;