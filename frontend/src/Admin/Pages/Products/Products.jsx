import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '../../Redux/Action';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import Navbar from '../../Navbar/Navbar';
import './Products.css';

const Products = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits); // Get products from Redux store
    const { role } = useParams();
    const dispatch = useDispatch();
   
    const [searchByName, setSearchByName] = useState(''); // State for filtering by name
    const [searchByCategory, setSearchByCategory] = useState(''); // State for filtering by category
    const [sortOrder, setSortOrder] = useState(''); // State for sorting by date (new/old)



    // Filter DataStore for name and category
    const FiltringData = products.filter((prods) => {
        const matchesName = prods.name.toLowerCase().includes(searchByName.toLowerCase());
        const matchesCategory = prods.category.toLowerCase().includes(searchByCategory.toLowerCase());
        return matchesName && matchesCategory; // Show products that match both name and category filters
    });
    
    // Sort products based on date_add_product
    const sortedProducts = [...FiltringData].sort((a, b) => {
        const dateA = new Date(a.date_add_product);
        const dateB = new Date(b.date_add_product);
        return sortOrder === 'old' ? dateA - dateB : dateB - dateA; // Newest to oldest or oldest to newest
    });
   
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            dispatch(Delete(id)); // Dispatch delete action to Redux
        }
    };

    // Function to update the state when Sidebar changes
    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };


    // Function to clear all filters
    const clearFilters = () => {
        setSearchByName('');
        setSearchByCategory('');
        setSortOrder('Sorted by date');
    };

    return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar  pagePath='Products'/>
                <div className="pages">
                    {products.length !== 0 ? (
                        <div className="products-container">
                          <div className="filters-container">
                            {/* Filter by Name */}
                            <div className="filter-input">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchByName}
                                    onChange={(e) => setSearchByName(e.target.value)}
                                />
                                <label>Filter by Name</label>
                            </div>

                            {/* Filter by Category */}
                            <div className="filter-input">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchByCategory}
                                    onChange={(e) => setSearchByCategory(e.target.value)}
                                />
                                <label>Filter by Category</label>
                            </div>

                            {/* Sort by Date (New/Old) */}
                            <div className="filter-select">
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option aria-readonly>Sorted by date</option>
                                    <option value="new">New to Old</option>
                                    <option value="old">Old to New</option>
                                </select>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={clearFilters}
                                className="clear-button"
                            >
                                Clear
                            </button>
                          </div>
                            <div className="table-container">
                                <table className="products-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedProducts.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.name}</td>
                                                <td>{item.category}</td>
                                                <td>{item.price}</td>
                                                <td>{item.stock}</td>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        alt="img"
                                                        title='image'
                                                        width={60}
                                                        height={60}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="dropdown-button">...</button>
                                                        <div className="dropdown-content">
                                                            <Link onClick={() => handleDelete(item._id)}>
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
                        <h3 className="no-products">No products available</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;