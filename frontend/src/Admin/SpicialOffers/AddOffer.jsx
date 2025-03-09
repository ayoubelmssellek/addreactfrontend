import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Edit } from "../Redux/Action";

const AddOffer = ({ Code, product, onClose }) => {
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.admin.ListeCategory);
  
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    statu: '',
    oldPrice: ''
  });

  // Populate form fields when the product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: product.image,
        statu: product.statu || 'available',
        oldPrice: product.oldPrice || ''
      });
    }
  }, [product]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      ...formData
    };
    
    console.log(updatedProduct);
    
    dispatch(Edit(Code, updatedProduct));
    onClose();
  };

  return (
    <div className="update-product-form">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Add Offer</p>
        
        {/* Disabled Fields */}
        <label>
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            disabled
            required
          />
        </label>

        <div className="flex">
          <label>
            <input
              className="input"
              style={{ textDecorationLine: 'line-through' }}
              type="number"
              value={formData.price}
              placeholder="Original Price"
              disabled
            />
          </label>
          
          {/* Editable Old Price */}
          <label>
            <input
              className="input"
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
              required
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
              placeholder="Stock"
              disabled
            />
          </label>
          <label>
            <select
              className="input"
              name="statu"
              value={formData.statu}
              disabled
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
            disabled
          >
            {Category.map((cat, index) => (
              <option key={index} value={cat.menu_name}>
                {cat.menu_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              className="file-input"
              id="file-upload"
              disabled
            />
            <label htmlFor="file-upload" className="file-upload-label">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="image-update-preview" />
              ) : (
                <span>Product Image</span>
              )}
            </label>
          </div>
        </label>

        <div className='action-and-cancel-btn'>
          <button className="update-product-btn" type="submit">Add Offer</button>
          <button className="cancel-product-btn" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;

AddOffer.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  Code: PropTypes.number.isRequired,
};