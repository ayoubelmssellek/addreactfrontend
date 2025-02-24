import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addTo_Cart, DicreaseQuantity } from "../../actions/action";
import { MdAddShoppingCart } from "react-icons/md";
import { assets } from "../../assets/assets";
import './FilterByQatigory.css'
import { Navbar } from "../navbar/Navbar";
const FilterByQatigory = () => {
  const CartItems = useSelector((state) => state.client.cartItems);
  const food_list = useSelector((state) => state.client.food_list);
  const { category } = useParams(); 
  const dispatch = useDispatch();
  const filtredList=food_list.filter(item=>item.category===category)
  const isInCart = (id) => CartItems.some((item) => item._id === id);

  const handleAddItem = (product) => dispatch(addTo_Cart(product));
  const decreaseProductQuantity = (id, item) => dispatch(DicreaseQuantity(id, item));
  return (
    
    <>
  <Navbar/>
    <div className="food-display">
      <hr className="Hr" />
      <h1 className="categoryName">{filtredList.length ===0?'' : category}</h1>
      <div className="food-display-list">
        
        {  filtredList.length ===0?(
            <p>no items found for this category</p>
        ):(
            filtredList.map((product) => (
                <div key={product._id} className="cart">
                  <Link to={`/product/${product._id}`}><img src={product.image} alt={product.name} /></Link>
                  <div className="food_item_info">
                    <div className="food_item_img_rating">
                    <p><Link to={`/product/${product._id}`}>{product.name}</Link></p>
                    </div>
                    <div className="price_and_button">
                      <p className="food_item_price">
                        <span style={{ marginRight: "7px" }}>درهم</span> {product.price}.00
                      </p>
                      {!isInCart(product._id) ? (
                        <button className="food_item_button" onClick={() => handleAddItem(product)}>
                          <MdAddShoppingCart size={30} /> أضف إلى السلة
                        </button>
                      ) : (
                        <div className="inc_or_dec_amount">
                          <img onClick={() => decreaseProductQuantity(product._id, product)} src={assets.remove_icon_red} alt="Remove" />
                          <strong>{CartItems.find((cartItem) => cartItem._id === product._id)?.Quantity}</strong>
                          <img onClick={() => handleAddItem(product)} src={assets.add_icon_green} alt="Add" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
        )
     }
      </div>
    </div>
    </>
  );
};

export default FilterByQatigory;
