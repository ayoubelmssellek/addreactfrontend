import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTo_Cart, DicreaseQuantity } from '../../actions/action';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart, MdArrowBackIos } from "react-icons/md";
import { assets } from '../../assets/assets';
import './FavoriteDishes.css'
import { Navbar } from '../navbar/Navbar';
const FavoriteDishes = () => {
const FavoriteList = useSelector((state) => state.client.Favorite);
  const CartItems = useSelector((state) => state.client.cartItems);
  const food_list = useSelector((state) => state.client.food_list);
    
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
  <>
  <Navbar/>
  {
    FavoriteList.length==0?(
        <div className='ThereISNoDhishes'>
        <img src={"https://static.vecteezy.com/system/resources/previews/048/216/130/non_2x/reminder-list-empty-ui-illustration-free-vector.jpg"} 
        alt="" height={"400"} width={"400"} loading='lazy' />
        <h1 style={{marginButtom:'30px',textAlign:'center'}}>لا يوجد أطباق مفضلة في الوقت الراهن</h1>

        </div>
    ):(
        <div className='FavoriteContent'>
    <div className='GOABCKandtitle'>
    <h1 >أطباقك المفضلة</h1>
   
    </div>
      <div className="FAVfood-display-list">
          {FavoriteList.map((produit) => (
            <div key={produit._id} className="FAVcart" >
            <Link to={`/product/${produit._id}`}>
            <img src={produit.image} alt={produit.name}  loading="lazy"/>
            </Link>
              <div className="FAVfood_item_info">
                <div className="FAVfood_item_img_raiting">
                <Link to={`/product/${produit._id}`}>
                <p>{produit.name}</p>
                </Link>
                </div>
                {/* <p className="food_item_desc">{item.description}</p> */}
                <div className="FAVprice_and_button">
                  <p className="FAVfood_item_price"><bdi style={{marginRight:'7px'}}>درهم</bdi> {produit.price}.00</p>
                  {!isInCart(produit._id) ? (
                    <button
                      className="FAVfood_item_button"
                      onClick={() => handelAddItem(produit)}
                    >
                   <MdAddShoppingCart size={30} />  أضف إلى السلة
                    </button>
                  ) : (
                    <div className="FAVinc_or_dec_amount">
                      <img loading='lazy'
                        onClick={() => DicreaseProdectQauntity(produit._id, produit)}
                        src={assets.remove_icon_red}
                        alt="Remove"
                      />
                      <strong>
                        {CartItems.find((cartitem) => cartitem._id === produit._id)
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
           
          ))}
        </div>
  </div>
    )
  }
  </>
  )
}

export default FavoriteDishes
