import { useSelector,useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import {Edit } from "../../Redux/Action";
const UpdateSelectedProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits); // Get products from Redux store
    const { role,Code } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [product, setProduct] = useState(null); // Local state for product data


    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [error, setError] = useState('');
  

       // Find the product to update from the Redux store
    useEffect(() => {
    const foundProduct = products.find((prod) => Number(prod._id )=== Number(Code));
    if (foundProduct) {
      setProduct(foundProduct);
      setProductName(foundProduct.name);
      setProductImage(foundProduct.image);
      setProductCategory(foundProduct.category);
      setProductPrice(foundProduct.price);
      setProductQuantity(foundProduct.stock);
    } else {
        navigate(`/admin/Dashboard/${role}/Products`); // If no product found, redirect
    }
   },[Code, products, navigate,role]);
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
         dispatch(Edit(Code,newProduct));
         navigate(`/admin/Dashboard/${role}/Products`);
    }  
    if (!product) {
        return <div>Loading...</div>; // Show loading state until product is found
      }

  return (
           <div className="content">
               <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
               <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                   <Navbar  pagePath='Update Product'/>
                   <div className="pages">
                   <form className="add-product-form" onSubmit={handleSubmit}>
               <p className="form-title">Update Product</p>
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
                   Update
               </button>
           </form>
                   </div>
               </div>
           </div>
  )
}

export default UpdateSelectedProduct
