import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '../../Redux/Action';
import PropTypes from 'prop-types';

import './AddProduct.css';

const AddProduct = ({onClose}) => {
  const products = useSelector((state) => state.admin.produits); 
  const Category = localStorage.getItem('ListeCategories')?
  JSON.parse(localStorage.getItem('ListeCategories')):[];
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [error, setError] = useState('');

  // Fetching categories from existing products
  const categories = [...new Set(Category.map((cat) => cat.menu_name))];

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
           statu:'',
           oldPrice:null
      };

      dispatch(Add(newProduct));
      onClose()
  };
    return (
         <div className='update-product-form'>
            <form className="form" onSubmit={handleSubmit}>
            <p className="title">Add Product</p>
            {error && <span className="error-message">{error}</span>}

            <label>
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className='input'
                />
            </label>

            {/* File Upload Section */}
            <label>
                   <div className='form-group'>
                   <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input input"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            {productImage ? (
                                <img src={productImage} alt="Preview" className="image-update-preview" />
                            ) : (
                                <span>Click to upload an image</span>
                            )}
                        </label>
                   </div>
            </label>

            <label className="form-group">
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="input"

                >
                    <option value="">Choose your Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <label className="form-group">
                <input
                    type="number"
                    placeholder="Enter Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="input"

                />
            </label>

            <label className="form-group">
                <input
                    type="number"
                    placeholder="Enter Quantity"
                    value={productQuantity}
                    className="input"
                    onChange={(e) => setProductQuantity(e.target.value)}
                />
            </label>

            <div className='action-and-cancel-btn'>
               <button className="update-product-btn" type="submit">Add Product</button>
               <button className="cancel-product-btn" type="submit" onClick={onClose}>cancel</button>
            </div>  
        </form>
         </div>

    );
};

export default AddProduct;
AddProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
};