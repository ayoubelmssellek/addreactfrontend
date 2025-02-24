import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
const ListeOrders = () => {
        const listorders=useSelector((state)=>state.client.orders)
        const [isOpen, setIsOpen] = useState(false);
        const { role } = useParams();


       
        const handleSidebarStateChange = (newState) => {
            setIsOpen(newState);
        };
    
       
  return (
    <div className="content">
    <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
    <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar  pagePath='Liste Orders'/>
        <div className="pages">
            {listorders.length !== 0 ? (
                <div className="products-container">
                  <div className="filters-container">
                    {/* Filter by Name */}
                    {/* <div className="filter-input">
                        <input
                            type="text"
                            placeholder=" "
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}
                        />
                        <label>Filter by Name</label>
                    </div> */}

                    {/* Filter by Category */}
                    {/* <div className="filter-input">
                        <input
                            type="text"
                            placeholder=" "
                            value={searchByCategory}
                            onChange={(e) => setSearchByCategory(e.target.value)}
                        />
                        <label>Filter by Category</label>
                    </div> */}

                    {/* Sort by Date (New/Old) */}
                    {/* <div className="filter-select">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option aria-readonly>Sorted by date</option>
                            <option value="new">New to Old</option>
                            <option value="old">Old to New</option>
                        </select>
                    </div> */}

                    {/* Clear Filters Button */}
                    {/* <button
                        onClick={clearFilters}
                        className="clear-button"
                    >
                        Clear
                    </button> */}
                  </div>
                    <div className="table-container">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Number Phone</th>
                                    <th>Date order</th>
                                    <th>Product Name</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listorders.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {item.items.length>1? `${item.items.length} items`:`${item.items.length} item` } 
                                        </td>
                                       <td>
                                       
                                       </td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="dropdown-button">...</button>
                                                <div className="dropdown-content">
                                                    <Link>
                                                        <FaTrash size={20} color="#F44336" />
                                                    </Link>
                                                    <Link to={`/admin/Dashboard/${role}/UpdateSelectedProduct/${item._id}`}>
                                                        <FaEdit size={20} color="#4CAF50" />
                                                    </Link>
                                                    <Link to={`/admin/Dashboard/${role}/ViewMore/${item._id}`}>
                                                        <FaEye size={20} color="#2196F3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h3 className="no-products">No Orders available</h3>
            )}
        </div>
    </div>
</div>
  )
}

export default ListeOrders
