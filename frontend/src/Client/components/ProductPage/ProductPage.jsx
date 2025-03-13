import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsBagFill } from "react-icons/bs";
import { MdArrowBackIos, MdAddShoppingCart, MdRemove, MdAdd, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from './ProductPage.module.css';
import { addTo_Cart, addTo_Favorite, DicreaseQuantity } from '../../actions/action';
import { food_list } from '../../../Admin/assets/assets';
const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {  cartItems, Favorite, cartAmount } = useSelector((state) => state.client);
    
    const product = food_list.find(item => item._id == id);
    const inCart = cartItems.some(item => item._id == id);
    const isFavorite = Favorite.some(item => item._id == id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContent}>
                <div className={styles.goBackAndNav}>
                    <Link to="/">
                        <MdArrowBackIos size={30} />
                    </Link>
                    <Link to="/shoupingCart">
                        <div className={styles.bagFill}>
                            <BsBagFill size={30} />
                            {cartAmount > 0 && <span className={styles.cartBadge}>{cartAmount}</span>}
                        </div>
                    </Link>
                </div>
                <div className={styles.imageContainer}>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className={styles.productImage} 
                        loading="lazy" 
                    />
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.productInfo}>
                    <h1 className={styles.productTitle}>{product.name}</h1>
                    <h4 className={styles.productCategory}>{product.category}</h4>
                    <p className={styles.productDescription}>{product.description}</p>
                </div>

                <div className={styles.priceAndButton}>
                    <h1 className={styles.price}><bdi> درهم</bdi> {product.price}</h1>
                    <button
                        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : ''}`}
                        onClick={() => dispatch(addTo_Favorite(product, product._id))}
                    >
                        {isFavorite ? <MdFavorite size={28} /> : <MdFavoriteBorder size={28} />}
                    </button>

                    {!inCart ? (
                        <button
                            className={styles.addToCartButton}
                            onClick={() => dispatch(addTo_Cart(product))}
                        >
                            <MdAddShoppingCart size={24} />
                            أضف إلى السلة
                        </button>
                    ) : (
                        <div className={styles.quantityControls}>
                            <button
                                className={styles.quantityButton}
                                onClick={() => dispatch(DicreaseQuantity(product._id))}
                            >
                                <MdRemove size={24} />
                            </button>
                            <strong>
                                {cartItems.find(item => item._id === product._id)?.Quantity}
                            </strong>
                            <button
                                className={styles.quantityButton}
                                onClick={() => dispatch(addTo_Cart(product))}
                            >
                                <MdAdd size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;