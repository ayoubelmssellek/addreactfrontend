import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdAddShoppingCart, MdRemove, MdAdd, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from './ProductPageDiskTopVersion.module.css';
import { addTo_Cart, addTo_Favorite, DicreaseQuantity } from '../../actions/action';
import { food_list } from '../../../Admin/assets/assets';

const ProductPageDiskTopVersion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {  cartItems, Favorite } = useSelector((state) => state.client);
  // const produits= useSelector((state) => state.admin.produits)
  
  const product = food_list.find(item => item._id == id);
  const inCart = cartItems.some(item => item._id == id);
  const isFavorite = Favorite.some(item => item._id == id);

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Product Not Found</h2>
        <p>The requested product does not exist.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Product Image Section */}
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage} 
          loading="lazy" 
        />
      </div>

      {/* Product Info Section */}
      <div className={styles.infoSection}>
        {/* Favorite Button - Top Right */}
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={() => dispatch(addTo_Favorite(product, product._id))}
        >
          {isFavorite ? (
            <MdFavorite size={24} />
          ) : (
            <MdFavoriteBorder size={24} />
          )}
        </button>

        <h1 className={styles.productTitle}>{product.name}</h1>
        <span className={styles.productCategory}>{product.category}</span>
        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
             {/* {produit.oldPrice && ( */}
             <span className={styles.OldPrice}>
                12.00
              </span>
          {/* )} */}
            <span className={styles.price}>
              {product.price} درهم
            </span>
          </div>

          {inCart ? (
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() => dispatch(DicreaseQuantity(product._id))}
              >
                <MdRemove size={20} />
              </button>
              <span className={styles.quantity}>
                {cartItems.find(item => item._id === product._id)?.Quantity}
              </span>
              <button
                className={styles.quantityButton}
                onClick={() => dispatch(addTo_Cart(product))}
              >
                <MdAdd size={20} />
              </button>
            </div>
          ) : (
            <button
              className={styles.cartButton}
              onClick={() => dispatch(addTo_Cart(product))}
            >
              <MdAddShoppingCart size={20} />
              أضف إلى السلة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageDiskTopVersion;