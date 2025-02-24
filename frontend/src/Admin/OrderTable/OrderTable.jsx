import './OrderTable.css';
import { useSelector } from 'react-redux';
const OrderTable = () => {
  const listorders=useSelector((state)=>state.client.orders)
  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead className="table-header">
          <tr>
            <th scope="col" className="table-heading">Name</th>
            <th scope="col" className="table-heading">Phonenumber</th>
            <th scope="col" className="table-heading">Street</th>
            <th scope="col" className="table-heading">Stock</th>
            <th scope="col" className="table-heading">Image</th>
            <th scope="col" className="table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {listorders.map((item, index) => (
            <tr key={index} className="table-row">
              {/* <td className="table-data">{item.name}</td> */}
              {/* <td className="table-data">{item.phonenumber}</td> */}
              {/* <td className="table-data">{item.name}</td>
              <td className="table-data">26</td>
              <td className="table-data">Image</td>
              <td className="table-data">read more</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;