import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '../../Redux/Action';
import Sidebar from '../../Sidebar/Sidebar';
import { FaTrash, FaEye, FaEdit, FaSearch, FaTimes } from 'react-icons/fa';
import { UpdateStatus } from '../../Redux/Action';
import { LuChevronsUpDown } from "react-icons/lu";
import UpdateSelectedProduct from '../Up/UpdateSelectedProduct'
import Navbar from '../../Navbar/Navbar';
import AddProduct from '../AddProduct/AddProduct';
import ViewMore from '../ViewMore/ViewMore';
import Modal from '../../Modal/Modal';
import { TiPlus } from 'react-icons/ti';
import { GoMultiSelect } from "react-icons/go";
import styles from '../Products/Products.module.css';


const Products = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits);
    
    const Category = useSelector((state) => state.admin.ListeCategory);
    const [showUpComponent, setShowUpComponent] = useState(false);
    const [showViewComponent, setShowViewComponent] = useState(false);
    const [showAddComponent, setShowAddComponent] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const [searchByName, setSearchByName] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');
    const [searchByType, setSearchByType] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const types = [...new Set(products.map(product => product.type).filter(Boolean))];

    const FiltringData = products.filter((prods) => {
        const matchesName = prods.name.toLowerCase().includes(searchByName.toLowerCase());
        const matchesCategory = prods.category.toLowerCase().includes(searchByCategory.toLowerCase());
        const matchesType = prods.type?.toLowerCase().includes(searchByType.toLowerCase());
        return matchesName && matchesCategory && matchesType;
    });

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        confirm && dispatch(Delete(id));
    };

    const handleSidebarStateChange = (newState) => setIsOpen(newState);
    const clearFilters = () => {
        setSearchByName('');
        setSearchByCategory('');
        setSearchByType('');
    };

    // Modal handlers
    const handleAddClick = () => setShowAddComponent(true);
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowUpComponent(true);
    };
    const handleViewClick = (product) => {
        setSelectedProduct(product);
        setShowViewComponent(true);
    };
    const handleCloseModal = () => {
        setShowUpComponent(false);
        setSelectedProduct(null);
    };
    const handleCloseViewModal = () => {
        setShowViewComponent(false);
        setSelectedProduct(null);
    };
    const handleCloseAddModal = () => setShowAddComponent(false);
    const handleDropdownToggle = (id) => {
        setOpenDropdownId(prev => prev === id ? null : id); 
      };
      

    //  this effect to close dropdown when clicking outside
    useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.popup}`)) {
        setOpenDropdownId(null);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'out_of_stock' : 'Available';
    dispatch(UpdateStatus(id, newStatus));
  };
  
    return (
        <div className={styles.content}>
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`${styles.allBadges} ${isOpen ? styles.pushMainContent : styles.ml20}`}>
                <Navbar pagePath='Products' />
                <div className={styles.pages}>
                    <div className={styles.productsContainer}>
                        <div className={styles.filtersContainer}>
                            <div className={styles.filterInput}>
                                <div className={styles.selectWrapper}>
                                    <select
                                        value={searchByCategory}
                                        onChange={(e) => setSearchByCategory(e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        {Category.map((cat, index) => (
                                            <option key={index} value={cat.menu_name}>
                                                {cat.menu_name}
                                            </option>
                                        ))}
                                    </select>
                                    <LuChevronsUpDown className={styles.selectIcon} />
                                </div>
                            </div>

                            <div className={styles.filterInput}>
                                <div className={styles.selectWrapper}>
                                    <select
                                        value={searchByType}
                                        onChange={(e) => setSearchByType(e.target.value)}
                                    >
                                        <option value="">Select Type</option>
                                        {types.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <LuChevronsUpDown className={styles.selectIcon} />
                                </div>
                            </div>

                            <div className={styles.filterInput}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={searchByName}
                                        onChange={(e) => setSearchByName(e.target.value)}
                                    />
                                    <label>Search by Name</label>
                                    <FaSearch className={styles.inputIcon} />
                                </div>
                            </div>

                            <button onClick={clearFilters} className={styles.clearButton}>
                                <FaTimes /> Clear Filters
                            </button>
                        </div>

                        <div className={styles.addButton} onClick={handleAddClick}>
                            <TiPlus size={24} />
                            <span>Add Product</span>
                        </div>

                        <div className={styles.tableProductsContainer}>
                            {products.length !== 0 ? (
                                <table className={styles.productsTable}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FiltringData.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.name}</td>
                                                <td>{item.category}</td>
                                                <td>{item.type}</td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={styles.productImage}
                                                    />
                                                </td>
                                                <td>
                                                <button 
                                                    className={styles.statusButton}
                                                    style={{
                                                    backgroundColor: item.status !== 'out_of_stock' ? '#d1fae5' : '#ffc0c0',
                                                    color: item.status !== 'out_of_stock' ? '#059669' : '#ff5757'
                                                    }}
                                                    onClick={() => handleStatusToggle(item._id, item.status || 'Available')}
                                                >
                                                    {item.status ? item.status.replace(/_/g, ' ') : 'Available'}
                                                </button>
                                                </td>
                                                {/* In your table cell */}
                                                <td>
                                                <div className={styles.popup}>
                                                    <div 
                                                    className={styles.burger}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDropdownToggle(item._id);
                                                    }}
                                                    >
                                                    <GoMultiSelect size={20} color="#2196F3" />
                                                    </div>
                                                    
                                                    {openDropdownId === item._id && (
                                                    <div className={styles.popupWindow}>
                                                        <ul>
                                                        <li className={styles.viewAction}>
                                                            <button onClick={() => handleViewClick(item)}>
                                                            <FaEye size={14} color='#2196F3'/>
                                                            View Details
                                                            </button>
                                                        </li>
                                                        <li className={styles.editAction}>
                                                            <button onClick={() => handleEditClick(item)}>
                                                            <FaEdit size={14}  color='#4CAF50'/>
                                                            Edit
                                                            </button>
                                                        </li>
                                                        <li className={styles.deleteAction}>
                                                            <button onClick={() => handleDelete(item._id)}>
                                                            <FaTrash size={14} color='#f44336' />
                                                            Delete
                                                            </button>
                                                        </li>
                                                        </ul>
                                                    </div>
                                                    )}
                                                </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <h3 className={styles.noProducts}>No products available</h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={showUpComponent} onClose={handleCloseModal}>
                <UpdateSelectedProduct 
                    Code={selectedProduct?._id} 
                    product={selectedProduct} 
                    onClose={handleCloseModal} 
                />
            </Modal>
            
            <Modal isOpen={showViewComponent} onClose={handleCloseViewModal}>
                <ViewMore
                    Code={selectedProduct?._id}
                    product={selectedProduct}
                    onClose={handleCloseViewModal}
                />
            </Modal>
            
            <Modal isOpen={showAddComponent} onClose={handleCloseAddModal}>
                <AddProduct onClose={handleCloseAddModal} />
            </Modal>
        </div>
    );
};

export default Products;