import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from '../../Redux/Action';
import PropTypes from 'prop-types';
import './UpdateSelectedProduct.css';

const UpdateSelectedProduct = ({ Code, product, onClose }) => {
    const dispatch = useDispatch();
    const Category = useSelector((state) => state.admin.ListeCategory);
    const products = useSelector((state) => state.admin.produits);

     const [error, setError] = useState('');
    

    // State to manage form fields
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        statu: ''
    });

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
    // Populate form fields when the product prop changes
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                statu: product.statu || 'available' // Default to 'available' if statu is not provided
            });
        }
    }, [product]);

    const isFormValid = formData.name && formData.image && formData.category && formData.price && formData.stock && formData.statu;

    // Handle input changes
    const handleInputChange = (e) => {
        

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setError('Please fill all fields');
            return;
        }
    
        const priceQuantityError = validatePriceAndQuantity(formData.price, formData.stock);
        if (priceQuantityError) {
            setError(priceQuantityError);
            return;
        }

        // Create the updated product object
        const updatedProduct = {
            ...product, // Keep the existing product data
            ...formData // Overwrite with the updated form data
        };
        console.log('up',updatedProduct);
        

        // Dispatch the update action
        dispatch(Edit(Code, updatedProduct));

        // Close the modal
        onClose();
    };

    return (
        <div className="update-product-form">
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Update Product</p>
                {error && <span className="error-message">{error}</span>}

                <div className="flex">
                    <label>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            
                        />
                    </label>
                    <label>
                        <input
                            className="input"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            
                        />
                    </label>
                </div>
                <div className="flex">
                    <label>
                        <input
                            className="input"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="Stock"
                            
                        />
                    </label>
                    <label>
                        <select
                          disabled= {formData.statu=='out_of_stock'}
                            className="input"
                            name="statu"
                            value={formData.statu}
                            onChange={handleInputChange}
                            
                        >
                            <option value="available">Available</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </label>
                </div>
                <label>
                    <select
                        className="input"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        
                    >
                        {Category.map((cat, index) => (
                            <option key={index} value={cat.menu_name}>
                                {cat.menu_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    {/* File Upload Section */}
                    <div className="form-group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="image-update-preview" />
                            ) : (
                                <span>Click to upload an image</span>
                            )}
                        </label>
                    </div>
                </label>
               <div className='action-and-cancel-btn'>
               <button className="update-product-btn" type="submit">Update</button>
               <button className="cancel-product-btn" type="submit" onClick={onClose}>cancel</button>
               </div>
            </form>
        </div>
    );
};

export default UpdateSelectedProduct;

UpdateSelectedProduct.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    Code: PropTypes.number.isRequired,
};