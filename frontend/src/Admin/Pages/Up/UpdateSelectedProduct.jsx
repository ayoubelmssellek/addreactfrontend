import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from '../../Redux/Action';
import PropTypes from 'prop-types';
import styles from '../Up/UpdateSelectedProduct.module.css';

const UpdateSelectedProduct = ({ Code, product, onClose }) => {
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.admin.ListeCategory);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    type: '',
    image: '',
    status: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        type: product.type,
        image: product.image,
        status: product.status || 'available'
      });
    }
  }, [product]);

  const validatePriceAndQuantity = (price) => {
    if (isNaN(price)) return 'Price must be a valid number';
    if (price <= 0) return 'Price must be a positive number';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.category || 
        !formData.price || !formData.type || !formData.status) {
      setError('Please fill all fields');
      return;
    }

    const validationError = validatePriceAndQuantity(formData.price);
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedProduct = { ...product, ...formData };
    dispatch(Edit(Code, updatedProduct));
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.title}>Update Product</p>
        {error && <span className={styles.errorMessage}>{error}</span>}

        <div className={styles.flex}>
          <label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
          </label>
          <label>
            <input
              className={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              placeholder="Product Type"
            />
          </label>
          <label>
            <select
              className={styles.input}
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={formData.status === 'out_of_stock'}
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </label>
        </div>

        <label>
          <select
            className={styles.input}
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

        <div className={styles.formGroup}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
            {formData.image ? (
              <img 
                src={formData.image} 
                alt="Preview" 
                className={styles.imageUpdatePreview} 
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
            disabled={!formData.name || !formData.image}
          >
            Update Product
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

UpdateSelectedProduct.propTypes = {
  Code: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateSelectedProduct;