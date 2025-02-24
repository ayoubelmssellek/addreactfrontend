import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '../../Redux/Action';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import './AddProduct.css';

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state) => state.admin.produits); // Get products from Redux store
  const { role } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [error, setError] = useState('');

  // Fetching categories from existing products
  const categories = [...new Set(products.map((product) => product.category))];

  const isFormValid = productName && productImage && productCategory && productPrice && productQuantity;

  // Handle image file change
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProductImage(imageUrl);
      }
  };

  // Validate price and quantity
  const validatePriceAndQuantity = (price, stock) => {
      if (isNaN(price) || isNaN(stock)) {
          return 'Price and Quantity must be valid numbers';
      }
      if (price <= 0 || stock <= 0) {
          return 'Price and Quantity must be positive numbers';
      }
      return '';
  };


    // Function to update the state when Sidebar changes
      const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };


  // Handle form submission
  const handleSubmit = (e) => {
      e.preventDefault();

      if (!isFormValid) {
          setError('Please fill all fields');
          return;
      }

      const priceQuantityError = validatePriceAndQuantity(productPrice, productQuantity);
      if (priceQuantityError) {
          setError(priceQuantityError);
          return;
      }

      const newProduct = {
          _id: products.length > 0 ? products[products.length - 1]._id + 1 : 1, // Generate new ID
          name: productName,
          category: productCategory,
          price: parseFloat(productPrice), // Ensure price is a number
          stock: parseInt(productQuantity), // Ensure quantity is an integer
          image: productImage,
      };

      dispatch(Add(newProduct));
      navigate(`/admin/Dashboard/${role}/Products`);
  };
    return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar  pagePath='Add Product'/>
                <div className="pages">
                <form className="add-product-form" onSubmit={handleSubmit}>
            <p className="form-title">Add Product</p>
            {error && <span className="error-message">{error}</span>}

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            {/* File Upload Section */}
            <div className="form-group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                    {productImage ? (
                        <img src={productImage} alt="Preview" className="image-preview" />
                    ) : (
                        <span>Click to upload an image</span>
                    )}
                </label>
            </div>

            <div className="form-group">
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    <option value="">Choose your Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <input
                    type="number"
                    placeholder="Enter Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    placeholder="Enter Quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className={`submit-button ${isFormValid ? 'active' : 'disabled'}`}
                disabled={!isFormValid}
            >
                Add
            </button>
        </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;