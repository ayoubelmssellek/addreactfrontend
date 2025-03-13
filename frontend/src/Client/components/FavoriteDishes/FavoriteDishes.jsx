import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTo_Cart, DicreaseQuantity, addTo_Favorite } from '../../actions/action';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddShoppingCart, MdArrowBackIos, MdRemove, MdAdd, MdVisibility, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from './FavoriteDishes.module.css';
import { food_list } from '../../../Admin/assets/assets';
import { Navbar } from '../navbar/Navbar';
import { FaArrowRight } from 'react-icons/fa';

const FavoriteDishes = () => {
  const FavoriteList = useSelector((state) => state.client.Favorite);
  const CartItems = useSelector((state) => state.client.cartItems);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const isInCart = (id) => CartItems.some((item) => item._id === id);
  const isitClicked = (id) => FavoriteList?.some(item => item._id === id);

  const handelAddItem = (produit) => {
    // if(produit.inStock) 
  dispatch(addTo_Cart(produit));
  };

  const DicreaseProdectQauntity = (id) => dispatch(DicreaseQuantity(id));
  const handelAddToFavorite = (product, id) => dispatch(addTo_Favorite(product, id));

  return (
    <>
      <Navbar/>
      {FavoriteList.length === 0 ? (
        <div className={styles.EmptyContainer}>
          <img 
            src={"https://static.vecteezy.com/system/resources/previews/048/216/130/non_2x/reminder-list-empty-ui-illustration-free-vector.jpg"} 
            alt="No favorites" 
            className={styles.EmptyImage}
          />
          <h2 className={styles.EmptyText}>لا يوجد أطباق مفضلة في الوقت الراهن</h2>
        </div>
      ) : (
        <div className={styles["Food-desplay"]}>
           <div className={styles.HeaderContainer}>
          <button onClick={()=>navigate(-1)} className={styles.BackButton}>
            <MdArrowBackIos size={24} />
            <span>العودة</span>
          </button>
          <h1 className={styles.QategoryName}> أطباقك المفضلة</h1>
        </div>
        
          
          <div className={styles["Food-desplay-list"]}>
            {FavoriteList.map((produit) => (
              <div key={produit._id} className={styles.Cart}>
                {/* ${!produit.inStock ? styles.OutOfStockOverlay : ''} */}
                <div className={`${styles.ImageContainer} `}>
                  <Link to={`/product/${produit._id}`}>
                    <img 
                      src={produit.image} 
                      alt={produit.name} 
                      className={styles.ProductImage}
                      loading="lazy" 
                    />
                  </Link>
                  {/* {!produit.inStock && (
                    <div className={styles.OutOfStock}>غير متوفر</div>
                  )} */}
                  <button
                    className={`${styles.FavoriteButton} ${isitClicked(produit._id) ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handelAddToFavorite(produit, produit._id);
                    }}
                    // disabled={!produit.inStock}
                  >
                    {isitClicked(produit._id) ? (
                      <MdFavorite className={styles.favoriteIcon} size={24} />
                    ) : (
                      <MdFavoriteBorder className={styles.favoriteIcon} size={24} />
                    )}
                  </button>
                </div>

                <div className={styles.ProductContent}>
                  <div className={styles.ProductHeader}>
                    <Link to={`/product/${produit._id}`} className={styles.ProductTitle}>
                      {produit.name}
                    </Link>
                    <div className={styles.PriceContainer}>
                      <span className={styles.ProductPrice}>
                        <bdi>درهم</bdi> {produit.price}.00
                      </span>
                      {/* {produit.oldPrice && ( */}
                        <span className={styles.OldPrice}>
                        20.00
                        </span>
                       {/* )} */}
                    </div>
                  </div>

                  {produit.description && (
                    <p className={styles.ProductDescription}>
                      {produit.description}
                    </p>
                  )}

                  <div dir='ltr' className={styles.ProductFooter}>
                     {produit.category && (
                      <span className={styles.CategoryTag}>
                        {produit.category}
                      </span>
                                        )}
                    <div dir='ltr' className={styles.ActionButtons}>
                      <Link 
                        to={`/product/${produit._id}`}
                        className={`${styles.IconButton} ${styles.ViewButton}`}
                      >
                        <MdVisibility size={20} />
                      </Link>
                      {/* !produit.inStock ? (
                        <button
                          className={`${styles.IconButton} ${styles.CartButton} ${styles.DisabledButton}`}
                          disabled
                        >
                          <MdAddShoppingCart size={20} />
                        </button>
                      ) : */}
                      {!isInCart(produit._id) ? (
                        <button
                          className={`${styles.IconButton} ${styles.CartButton}`}
                          onClick={() => handelAddItem(produit)}
                        >
                          <MdAddShoppingCart size={20} />
                        </button>
                      ) : (
                        <div className={styles.QuantityControls}>
                          <button
                            className={styles.QuantityButton}
                            onClick={() => DicreaseProdectQauntity(produit._id)}
                          >
                            <MdRemove size={20} />
                          </button>
                          <span>
                            {CartItems.find(item => item._id === produit._id)?.Quantity}
                          </span>
                          <button
                            className={styles.QuantityButton}
                            onClick={() => handelAddItem(produit)}
                          >
                            <MdAdd size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteDishes;