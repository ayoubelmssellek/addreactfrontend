import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import './ProductPageDiskTopVersion.css'
import { BsBagFill } from "react-icons/bs";
import { MdArrowBackIos, MdFavoriteBorder } from "react-icons/md";
import { assets } from '../../assets/assets';
import { MdAddShoppingCart } from "react-icons/md";
import { addTo_Cart, addTo_Favorite, DicreaseQuantity } from '../../actions/action';

const ProductPageDiskTopVersion = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const food_list = useSelector((state) => state.client.food_list);
    const CartItems = useSelector((state) => state.client.cartItems);
     const FavoriteList = useSelector((state) => state.client.Favorite);
    const FoundedProduct=food_list.find(item=>item._id==id) 
    const IsInCart = (id) => {
        return CartItems.some((item) => item._id === id);
      };
    
  const handelAddItem = (produit) => {
    dispatch(addTo_Cart(produit));
  };

  const DicreaseProdectQauntity = (id, item) => {
    dispatch(DicreaseQuantity(id, item));
  };  
    const handelAddToFavorite = (product,id) => {
      dispatch(addTo_Favorite(product,id))
    };  
  const isitClicked=(id)=>{
    return FavoriteList?.some(item=>item._id==id)
} 

  return (
     <div className='DISKProductContent' >
        <div className='DISKHeaderContent'>
        
        <div className='DISKimag'>
            <img src={FoundedProduct.image} alt="" loading='lazy' />
        </div>
        </div>
       <div className='DISKmainContent'>
       <div className='DISKproductInfo'>
           <h1>{FoundedProduct.name}</h1>
           <h4>{FoundedProduct.category}</h4>
           <p>{FoundedProduct.description}</p>
        </div>
        <div className='DISKpriceandbutton'>
            <h1><bdi> درهم</bdi> {FoundedProduct.price}</h1>
            <i className={isitClicked(FoundedProduct._id) ?'active' : 'favoriteIcon'} onClick={()=>handelAddToFavorite(FoundedProduct,FoundedProduct._id)}> 
            <MdFavoriteBorder  size={'40px'} />
             </i>
              {
                !IsInCart(FoundedProduct._id) ?
                    (<button onClick={() => handelAddItem(FoundedProduct)}><MdAddShoppingCart size={30} />  أضف إلى السلة</button>
                    )
                    :(
                        <div className="DISKInc_or_dec_amount">
                      <img loading='lazy'
                         onClick={() => DicreaseProdectQauntity(FoundedProduct._id, FoundedProduct)}
                         src={assets.remove_icon_red}
                        alt="Remove"
                      />
                      <strong>
                        {CartItems.find((cartitem) => cartitem._id === FoundedProduct._id)
                          ?.Quantity}
                      </strong>
                      <img loading='lazy'
                       onClick={() => handelAddItem(FoundedProduct)}
                        src={assets.add_icon_green}
                        alt="Add"
                      />
                    </div>                    )
                 }
        </div>
       </div>

        
      
    </div>
  )
}

export default ProductPageDiskTopVersion
