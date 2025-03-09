import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdAddShoppingCart, MdRemove, MdAdd, MdVisibility, MdFavorite, MdFavoriteBorder, MdArrowBackIos } from "react-icons/md";
import { assets } from "../../assets/assets";
import { Navbar } from "../navbar/Navbar";
import styles from './FilterByQatigory.module.css';
import { addTo_Cart, DicreaseQuantity, addTo_Favorite } from "../../actions/action";

const FilterByQatigory = () => {
  const CartItems = useSelector((state) => state.client.cartItems);
  const FavoriteList = useSelector((state) => state.client.Favorite);
    const food_list = useSelector((state) => state.admin.produits);
  const { category } = useParams();
  const dispatch = useDispatch();
  
  const filtredList = food_list.filter(item => item.category === category);
  const isInCart = (id) => CartItems.some((item) => item._id === id);
  const isitClicked = (id) => FavoriteList?.some(item => item._id === id);

  const handleAddItem = (product) => dispatch(addTo_Cart(product));
  const decreaseProductQuantity = (id) => dispatch(DicreaseQuantity(id));
  const handelAddToFavorite = (product, id) => dispatch(addTo_Favorite(product, id));

  return (
    <>
      <Navbar/>
      <div className={styles["Food-display"]}>
        <div className={styles.HeaderContainer}>
          <Link to="/" className={styles.BackButton}>
            <MdArrowBackIos size={24} />
            <span>العودة</span>
          </Link>
          <h1 className={styles.QategoryName}>{filtredList.length === 0 ? '' : category}</h1>
        </div>

        <div className={styles["Food-display-list"]}>
          {filtredList.length === 0 ? (
            <div className={styles.EmptyContainer}>
              <img 
                src="https://static.vecteezy.com/system/resources/previews/048/216/130/non_2x/reminder-list-empty-ui-illustration-free-vector.jpg" 
                alt="No items" 
                className={styles.EmptyImage}
              />
              <h2 className={styles.EmptyText}>لا توجد عناصر في هذا التصنيف</h2>
            </div>
          ) : (
            filtredList.map((product) => (
              <div key={product._id} className={styles.Cart}>
                <div className={styles.ImageContainer}>
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={styles.ProductImage}
                      loading="lazy" 
                    />
                  </Link>
                  <button
                    className={`${styles.FavoriteButton} ${isitClicked(product._id) ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handelAddToFavorite(product, product._id);
                    }}
                  >
                    {isitClicked(product._id) ? (
                      <MdFavorite className={styles.favoriteIcon} size={24} />
                    ) : (
                      <MdFavoriteBorder className={styles.favoriteIcon} size={24} />
                    )}
                  </button>
                </div>

                <div className={styles.ProductContent}>
                  <div className={styles.ProductHeader}>
                    <Link to={`/product/${product._id}`} className={styles.ProductTitle}>
                      {product.name}
                    </Link>
                    <div className={styles.PriceContainer}>
                      <span className={styles.ProductPrice}>
                        <bdi>درهم</bdi> {product.price}.00
                      </span>
                      {product.oldPrice && (
                        <span className={styles.OldPrice}>
                          <bdi>درهم</bdi> {product.oldPrice}.00
                        </span>
                      )}
                    </div>
                  </div>

                  {product.description && (
                    <p className={styles.ProductDescription}>
                      {product.description}
                    </p>
                  )}

                  <div className={styles.ProductFooter}>
                    <span className={styles.CategoryTag}>
                      {product.category}
                    </span>
                    <div className={styles.ActionButtons}>
                      <Link 
                        to={`/product/${product._id}`}
                        className={`${styles.IconButton} ${styles.ViewButton}`}
                      >
                        <MdVisibility size={20} />
                      </Link>
                      
                      {!isInCart(product._id) ? (
                        <button
                          className={`${styles.IconButton} ${styles.CartButton}`}
                          onClick={() => handleAddItem(product)}
                        >
                          <MdAddShoppingCart size={20} />
                        </button>
                      ) : (
                        <div className={styles.QuantityControls}>
                          <button
                            className={styles.QuantityButton}
                            onClick={() => decreaseProductQuantity(product._id)}
                          >
                            <MdRemove size={20} />
                          </button>
                          <span>
                            {CartItems.find(item => item._id === product._id)?.Quantity}
                          </span>
                          <button
                            className={styles.QuantityButton}
                            onClick={() => handleAddItem(product)}
                          >
                            <MdAdd size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FilterByQatigory;