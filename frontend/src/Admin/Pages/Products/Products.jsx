import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '../../Redux/Action';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import Navbar from '../../Navbar/Navbar';
import AddProduct from '../AddProduct/AddProduct';
import UpdateSelectedProduct from '../Up/UpdateSelectedProduct';
import ViewMore from '../ViewMore/ViewMore';
import Modal from '../../Modal/Modal';
import { TiPlus } from 'react-icons/ti';
import { GoMultiSelect } from "react-icons/go";

import './Products.css';

const Products = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits);
    const Category = useSelector((state) => state.admin.ListeCategory); // Get ListeCategory from Redux store

    const [showUpComponent, setShowUpComponent] = useState(false);
    const [showViewComponent, setShowViewComponent] = useState(false);
    const [showAddComponent, setShowAddComponent] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product for editing
    const dispatch = useDispatch();

    const [searchByName, setSearchByName] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');

    // Track the open state for each dropdown
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Filter DataStore for name and category
    const FiltringData = products.filter((prods) => {
        const matchesName = prods.name.toLowerCase().includes(searchByName.toLowerCase());
        const matchesCategory = prods.category.toLowerCase().includes(searchByCategory.toLowerCase());
        return matchesName && matchesCategory; // Show products that match both name and category filters
    });

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            dispatch(Delete(id));
        }
    };

    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };

    const clearFilters = () => {
        setSearchByName('');
        setSearchByCategory('');
    };

    const handleAddClick = () => {
        setShowAddComponent(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowUpComponent(true);
    };

    const handleViewClick = (product) => {
        setSelectedProduct(product);
        setShowViewComponent(true);
    };

    const handleCloseModal = () => {
        setShowUpComponent(false); // Hide the modal
        setSelectedProduct(null); // Clear the selected product
    };

    const handleCloseViewModal = () => {
        setShowViewComponent(false);
        setSelectedProduct(null);
    };

    const handleCloseAddModal = () => {
        setShowAddComponent(false); // Hide the Add Employee modal
    };

    // Handle dropdown toggle for a specific product
    const handleDropdownToggle = (id) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar pagePath='Products' />
                <div className="pages">
     
                        <div className="products-container">
                            <div className="filters-container">
                                <div className="filter-input">
                                    <select
                                        placeholder=" "
                                        value={searchByCategory}
                                        onChange={(e) => setSearchByCategory(e.target.value)}
                                    >
                                        <option value="">Choose your Category</option>
                                        {Category.map((cat, index) => (
                                            <option key={index}>{cat.menu_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-input">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={searchByName}
                                        onChange={(e) => setSearchByName(e.target.value)}
                                    />
                                    <label>Filter by Name</label>
                                </div>
                                <button onClick={clearFilters} className="clear-button">Clear</button>
                            </div>
                            <div style={{ display: 'flex', marginBlock: "20px" }}>
                                <Link onClick={handleAddClick}>
                                    <TiPlus size={30} color='#1A73E8' className="menu-icon" />
                                </Link>
                            </div>
                            <div className="table-Products-container">
                                <table className="products-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FiltringData.map((item, idx) => (
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
                                                <td>{item.statu ? item.statu : 'available'}</td>
                                                <td>
                                                <label className="popup">
                                                    <input
                                                        type="checkbox"
                                                        checked={openDropdownId === item._id}
                                                        onChange={() => handleDropdownToggle(item._id)}
                                                    />
                                                    <div className="burger" tabIndex="0">
                                                        <GoMultiSelect size={30} color='#2196F3'/>
                                                    </div>
                                                    <nav className="popup-window" style={{ display: openDropdownId === item._id ? 'block' : 'none' }}>
                                                        <ul>
                                                        <li>
                                                            <button onClick={() => handleDelete(item._id)}>
                                                            <FaTrash size={15} color="#F44336" />
                                                            <span>Delete</span>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleEditClick(item)}>
                                                            <FaEdit size={15} color="#4CAF50" />
                                                            <span>Edit</span>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleViewClick(item)}>
                                                            <FaEye size={15} color="#2196F3" />
                                                            <span>View</span>
                                                            </button>
                                                        </li>
                                                        </ul>
                                                    </nav>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                 
                        <h3 className="no-products">No products available</h3>
                    
                </div>
            </div>
            <div>
                <Modal isOpen={showUpComponent} onClose={handleCloseModal}>
                    <UpdateSelectedProduct Code={selectedProduct !== null && selectedProduct._id} product={selectedProduct} onClose={handleCloseModal} />
                </Modal>
            </div>
            <div>
                {/* View More Modal */}
                <Modal isOpen={showViewComponent} onClose={handleCloseViewModal}>
                    <ViewMore
                        Code={selectedProduct !== null && selectedProduct._id}
                        product={selectedProduct}
                        onClose={handleCloseViewModal}
                    />
                </Modal>
            </div>
            <div>
                {/* Add Product Modal */}
                <Modal isOpen={showAddComponent} onClose={handleCloseAddModal}>
                    <AddProduct onClose={handleCloseAddModal} />
                </Modal>
            </div>
        </div>
    );
};

export default Products;