import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '../../Redux/Action';
import PropTypes from 'prop-types';
import styles from './AddProduct.module.css';

const AddProduct = ({ onClose }) => {
    const products = useSelector((state) => state.admin.produits);
    const Category = useSelector((state)=> state.admin.ListeCategory)
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        price: '',
        type: ''
    });

    const [error, setError] = useState('');

    const categories = [...new Set(Category.map((cat) => cat.menu_name))];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validatePrice = (price) => {
        if (isNaN(price)) return 'Price must be a valid number';
        if (price <= 0) return 'Price must be a positive number';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.image || !formData.category || 
            !formData.price || !formData.type) {
            setError('Please fill all fields');
            return;
        }

        const validationError = validatePrice(formData.price);
        if (validationError) {
            setError(validationError);
            return;
        }

        const newProduct = {
            _id: products.length > 0 ? products[products.length - 1]._id + 1 : 1,
            ...formData,
            price: parseFloat(formData.price),
            type: formData.type,
            date_add_product: new Date().toISOString(),
            statu: 'Available'
        };

        dispatch(Add(newProduct));
        onClose();
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <p className={styles.title}>Add New Product</p>
                {error && <span className={styles.errorMessage}>{error}</span>}

                <div className={styles.flex}>
                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Product Name"
                        />
                    </label>
                    <label>
                        <input
                            className={styles.input}
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="Price"
                        />
                    </label>
                </div>

                <div className={styles.flex}>
                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            placeholder="type"
                        />
                    </label>
                    <label>
                        <select
                            className={styles.input}
                            name="category"
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                        id="fileUpload"
                    />
                    <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                        {formData.image ? (
                            <img 
                                src={formData.image} 
                                alt="Preview" 
                                className={styles.imagePreview} 
                            />
                        ) : (
                            <span>Click to upload product image</span>
                        )}
                    </label>
                </div>

                <div className={styles.actionAndCancelBtn}>
                    <button 
                        type="submit" 
                        className={styles.updateProductBtn}
                    >
                        Add Product
                    </button>
                    <button 
                        type="button" 
                        className={styles.cancelProductBtn}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

AddProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddProduct;