import React from "react";
import { MdAddShoppingCart, MdRemove, MdAdd, MdVisibility, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from '../FoodDesplay/Fooddesplay.module.css';
import { food_list } from "../../../Admin/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addTo_Cart, DicreaseQuantity, addTo_Favorite } from "../../actions/action";
import { Link } from "react-router-dom";

export const MenuComponnent = () => {
  const CartItems = useSelector((state) => state.client.cartItems);
  const food_list = useSelector((state) => state.client.food_list);
  const FavoriteList = useSelector((state) => state.client.Favorite);
  const dispatch = useDispatch();

  const groupedFood = food_list.reduce((acc, item) => {
    if(!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const groubedArray = Object.entries(groupedFood).map(([category, items]) => ({
    category,
    items
  }));

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
      {groubedArray.map((group) => (
        <div className={styles["Food-desplay"]} key={group.category}>
          <h1 className={styles.QategoryName}>{group.category}</h1>
          <div className={styles["Food-desplay-list"]}>
            {group.items.map((produit) => (
              <div key={produit._id} className={styles.Cart}>
                {/* ${!produit.inStock ? styles.OutOfStockOverlay : ''} */}
                <div className={`${styles.ImageContainer} `}>
                  <img 
                    src={produit.image} 
                    alt={produit.name} 
                    className={styles.ProductImage}
                    loading="lazy" 
                  />
                  
                  {/* {!produit.inStock && (
                    <div className={styles.OutOfStock}>غير متوفر</div>
                  )} */}
                  
                  <button
                    className={`${styles.FavoriteButton} ${
                      isitClicked(produit._id) ? styles.active : ''
                    }`}
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
                         90.00
                        </span>
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
                      {/* {!produit.inStock ? (
                        <button
                          className={`${styles.IconButton} ${styles.CartButton} ${styles.DisabledButton}`}
                          disabled
                        >
                          <MdAddShoppingCart size={20} />
                        </button>
                      ) : */}
                     { !isInCart(produit._id) ? (
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
      ))}
    </>
  );
};