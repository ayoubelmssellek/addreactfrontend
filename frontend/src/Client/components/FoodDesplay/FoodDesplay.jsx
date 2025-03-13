import React, { useState } from "react";
import { MdAddShoppingCart, MdRemove, MdAdd, MdVisibility, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from './Fooddesplay.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addTo_Cart, DicreaseQuantity, addTo_Favorite } from "../../actions/action";
import { Link } from "react-router-dom";
import { food_list } from "../../../Admin/assets/assets";

const FoodDisplay = () => {
  const [showDrinkPopup, setShowDrinkPopup] = useState(false);
    const CartItems = useSelector((state) => state.client.cartItems);
    // const food_list = useSelector((state) => state.admin.produits);
    
    const FavoriteList = useSelector((state) => state.client.Favorite);
    const dispatch = useDispatch();

    const isInCart = (id) => CartItems.some((item) => item._id === id);
    const isitClicked = (id) => FavoriteList?.some(item => item._id === id);

    const handelAddItem = (produit) => {
         dispatch(addTo_Cart(produit));
         setShowDrinkPopup(true)
    };

    const DicreaseProdectQauntity = (id) => dispatch(DicreaseQuantity(id));
    const handelAddToFavorite = (product, id) => dispatch(addTo_Favorite(product, id));
    const handleAddDrinks = (selectedDrinks) => {
      // Add to your existing cart system
     alert('Selected drinks:', selectedDrinks);
    };
  
    return (
        <>
        <div className={styles["Food-desplay"]}>
            <h1 className={styles.QategoryName}>أشهر الأطباق</h1>
            <div className={styles["Food-desplay-list"]}>
                {food_list.slice(-10).map((produit) => (
                    <div key={produit._id} className={styles.Cart}>
                     
                        <div className={`${styles.ImageContainer}   ${produit.statu == 'out_of_stock' ? styles.OutOfStockOverlay : ''} `}>
                            <img 
                                src={produit.image} 
                                alt={produit.name} 
                                className={styles.ProductImage}
                                loading="lazy" 
                            />
                            
                             {produit.statu == 'out_of_stock' && (
                                <div className={styles.OutOfStock}>غير متوفر</div>
                            )}
                             
                            <button
                                className={`${styles.FavoriteButton} ${
                                    isitClicked(produit._id) ? styles.active : ''
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handelAddToFavorite(produit, produit._id);
                                }}
                                disabled={produit.statu =='out_of_stock'}
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
                                    <span dir="ltr" className={styles.ProductPrice}>
                                        <bdi>درهم</bdi> { produit.price }
                                    </span>
                                    {/* {produit.oldPrice && ( */}
                                        {/* <span className={styles.OldPrice}>
                                          {produit.price}
                                        </span> */}
                                    {/* )} */}
                                </div>
                            </div>
                            
                            {produit.description && (
                                <p className={styles.ProductDescription}>
                                    {produit.description}
                                </p>
                            )}
                            
                            <div dir="ltr" className={styles.ProductFooter}>
                                {produit.category && (
                                    <span className={styles.CategoryTag}>
                                        {produit.category}
                                    </span>
                                )}
                                
                                <div dir="ltr" className={styles.ActionButtons}>
                                    <Link 
                                        to={`/product/${produit._id}`}
                                        className={`${styles.IconButton} ${styles.ViewButton}`}
                                    >
                                        <MdVisibility size={20} />
                                    </Link>
                                    
                                     {produit.statu=='out_of_stock' ? (      
                                         <button
                                            className={`${styles.IconButton} ${styles.CartButton} ${styles.DisabledButton}`}
                                            disabled
                                        >
                                            <MdAddShoppingCart size={20} />
                                        </button> 
                                      ) :!isInCart(produit._id) ? (
                                        <button
                                            className={`${styles.IconButton} ${styles.CartButton}`}
                                            onClick={() => {
                                              handelAddItem(produit)
                                            }}
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
        </>
    );
};

export default FoodDisplay;