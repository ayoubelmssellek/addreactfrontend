import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal';
import AddOffer from './AddOffer';
const ListeOffers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits); // Get products from Redux store
    const Category = useSelector((state) => state.admin.ListeCategory); // Get ListeCategory from Redux store
    const [showUpComponent, setShowUpComponent] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product for editing


   
    const [searchByName, setSearchByName] = useState(''); // State for filtering by name
    const [searchByCategory, setSearchByCategory] = useState(''); // State for filtering by category

   

    // Filter DataStore for name and category
    const FiltringData = products.filter((prods) => {
        const matchesName = prods.name.toLowerCase().includes(searchByName.toLowerCase());
        const matchesCategory = prods.category.toLowerCase().includes(searchByCategory.toLowerCase());
        return matchesName && matchesCategory; // Show products that match both name and category filters
    });
 
   


    // Function to update the state when Sidebar changes
    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };


    // Function to clear all filters
    const clearFilters = () => {
        setSearchByName('');
        setSearchByCategory('');
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
        setShowUpComponent(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowUpComponent(false); // Hide the modal
        setSelectedProduct(null); // Clear the selected product
    };

    return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar  pagePath='Add Offers'/>
                <div className="pages">
                    {products.length !== 0 ? (
                        <div className="products-container">
                          <div className="filters-container">
                            
                            {/* Filter by Category */}
                            <div className="filter-input">
                                <select
                                    placeholder=" "
                                    value={searchByCategory}
                                    onChange={(e) => setSearchByCategory(e.target.value)}
                                >     <option value="">Choise your Category</option>
                                    {
                                        Category.map((cat,index)=>
                                          <option key={index}>
                                            {cat.menu_name}
                                          </option>
                                        )
                                    }
                                </select>
                            </div>

                            {/* Filter by Name */}
                            <div className="filter-input">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchByName}
                                    onChange={(e) => setSearchByName(e.target.value)}
                                />
                                <label>Product Name</label>
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
                                            <th>statu</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                   {
                                    searchByCategory||searchByName.length!==0?
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
                                            <td>
                                              {item.statu?item.statu:'available'}
                                            </td>
                                            <td>
                                                    <div className='offer-button'>
                                                        <Link onClick={() => handleEditClick(item)}>
                                                           Make your offer
                                                        </Link>
                                                    </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                    :
                                    ''
                                   }
                                </table>
                            </div>
                        </div>
                    ) : (
                        <h3 className="no-products">No products available</h3>
                    )}
                    </div>
                    <div>
                    <Modal isOpen={showUpComponent} onClose={handleCloseModal}>
                        <AddOffer Code={selectedProduct!==null&&selectedProduct._id}  product={selectedProduct} onClose={handleCloseModal} />
                    </Modal>
                </div>

                </div>
                
        </div>
    );
  
}

export default ListeOffers
