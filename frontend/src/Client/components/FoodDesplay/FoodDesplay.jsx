import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { MdAddShoppingCart } from "react-icons/md";
import './Fooddesplay.css'
import { assets, food_list } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addTo_Cart, DicreaseQuantity } from "../../actions/action";
import { Link } from "react-router-dom";

const FoodDisplay = () => {
  const CartItems = useSelector((state) => state.client.cartItems);
  const listorders = useSelector((state) => state.client.orders);
    
 

  const isInCart = (id) => {
    return CartItems.some((item) => item._id === id);
  };



  const dispatch = useDispatch();

  const handelAddItem = (produit) => {
    dispatch(addTo_Cart(produit));
  };

  const DicreaseProdectQauntity = (id, item) => {
    dispatch(DicreaseQuantity(id, item));
  };


   
  return (
  
        <div className="Food-desplay">
      <hr/>
      
      <h1 dir="rtl"  className="QategoryName">أشهر الأطباق</h1>
        <div className="Food-desplay-list">
          {listorders.map((produit) => (
             produit.items.map((produit)=>(
              <div key={produit.id} className="Cart" >
              <Link to={`/product/${produit.id}`}>
               <img src={produit.image} alt={produit.name}  loading="lazy"/>
              </Link>
            
              <div className="Food_item_info">
                <div className="Food_item_img_raiting">
                
                <p><Link to={`/product/${produit.id}`}>{produit.name} </Link></p>
               
                </div>
                {/* <p className="food_item_desc">{item.description}</p> */}
                <div className="Price_and_button">
                  <p className="Food_item_price"><bdi style={{marginRight:'7px'}}>درهم</bdi> {produit.price}.00</p>
                  {!isInCart(produit.id) ? (
                    <button
                      className="Food_item_button"
                      onClick={() => handelAddItem(produit)}
                    >
                   <MdAddShoppingCart size={30} />  أضف إلى السلة
                    </button>
                  ) : (
                    <div className="Inc_or_dec_amount">
                      <img loading='lazy'
                        onClick={() => DicreaseProdectQauntity(produit.id, produit)}
                        src={assets.remove_icon_red}
                        alt="Remove"
                      />
                      <strong>
                        {CartItems.find((cartitem) => cartitem.id === produit.id)
                          ?.Quantity}
                      </strong>
                      <img loading='lazy'
                        onClick={() => handelAddItem(produit)}
                        src={assets.add_icon_green}
                        alt="Add"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
             ))
          ))}
        </div>
    </div>
      
    
    
  );
};

export default FoodDisplay;
