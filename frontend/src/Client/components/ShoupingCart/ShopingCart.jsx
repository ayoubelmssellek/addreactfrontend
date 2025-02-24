import  { useState } from "react";
import "./ShopingCart.css"; 
import { useDispatch, useSelector } from "react-redux";
import { addorder, addTo_Cart, DicreaseQuantity, shoping_cart } from "../../actions/action";
import { Link, useNavigate } from "react-router-dom";
import { AddNotification } from "../../../Admin/Redux/Action";
import { FaArrowRight } from "react-icons/fa";

const ShopingCart = () => {
  const [checkoutClicked,setcheckoutClicked]=useState(false)
  const [name,setname]=useState('')
  const [phonenumber,setphonenumber]=useState('')
  const [street,setstreet]=useState('')
  const [housenumber,sethousenumber]=useState('')
  const [error,seterror]=useState({})
  

  const navigation=useNavigate()

  const dispatch=useDispatch()
  const cartItems=useSelector(state=>state.client.cartItems)
  const cartAmount=useSelector(state=>state.client.cartAmount)
  const Orders=useSelector(state=>state.client.orders)
 
  
  const IncreaseProdectQauntity=(prodect)=>{
        dispatch(addTo_Cart(prodect)) 
      }
        

  const productTotalPricePerItem= cartItems.map(item => item.price * item.Quantity);  
  const totalDebut=productTotalPricePerItem.reduce((total,item)=>total+item ,0)

  const  DicreaseProdectQauntity=(id,item)=>{
          dispatch(DicreaseQuantity(id,item))

  }

   const handelCheckoutclick=()=>{
          setcheckoutClicked(true)
   }
   const handelbackclick=()=>{
    setcheckoutClicked(false)
} 
     const HandelSubmit=(event)=>{
        event.preventDefault()
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; 
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const minutes = currentDate.getMinutes();
        const hour = currentDate.getHours();


        const addMinutes = (date, minutes) => {
          const newDate = new Date(date);
          newDate.setMinutes(newDate.getMinutes() + minutes);
          return newDate;
      };
      const fulldate= `${year}-${day}-0${month} | ${hour} : ${minutes}`

        let errors={};
        if(!name.trim()) errors.name="الاسم مطلوب!";
        if(!phonenumber.trim()) errors.phonenumber="رقم الهاتف مطلوب!";
        if(!street.trim()) errors.street= "اسم الشارع مطلوب!";
          
        seterror(errors)
        if (Object.keys(errors).length==0) {
          const generateOrderNumber = () => {
            return `#${Math.floor(10000 + Math.random() * 90000)}`; 
          };
          
          const Myorder = {
            id: Orders.length + 1, 
            orderNumber:generateOrderNumber(),
            type: 'order',
            date: fulldate,
            name: name,
            phonenumber: phonenumber,
            street: street,
            housenumber: housenumber,
            items: cartItems,
            statusbefore: 'قيد التوصيل',
            statusafter: 'تم التوصيل',
            tracking: [
              { 
                status: 'تم الطلب', 
                time: currentDate.getHours() + ':' + currentDate.getMinutes(), 
                date: `${month}/${day}` 
            },
            { 
                status: 'جاري التحضير', 
                time: addMinutes(currentDate, 15).getHours() + ':' + addMinutes(currentDate, 15).getMinutes(), 
                date: `${month}/${day}` 
            },
            { 
                status: 'في الطريق', 
                time: addMinutes(currentDate, 30).getHours() + ':' + addMinutes(currentDate, 30).getMinutes(), 
                date: `${month}/${day}` 
            },
            ],
        };
          dispatch(addorder(Myorder))
          dispatch(AddNotification(Myorder))
          navigation('/orderSuccess')
          localStorage.removeItem('cartItems');
          localStorage.removeItem('cartAmount');
          dispatch(shoping_cart());          
          
        }

     }


  return (
    <div className="container">
    {
      cartItems.length==0 ?(
       <div className="EmptyCart">
        <img src={"https://static.vecteezy.com/system/resources/previews/005/006/007/non_2x/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"}
         alt="" srcSet="" />
        <h1>الحقيبة فارغة</h1>

        <Link to={'/menu'}>
        <div class="back-container">
        <div class="back-button" >
            <span class="back-button__icon"></span>
            <span class="back-button__text">Back to Menu</span>
        </div></div>
        </Link>

       </div>
      ):(
        <div className="shopping-cart">
      <div className="cart-items">
        <div className="cart-header">
          <h1>السلة</h1>
          <button dir="ltr" className={'backButton'} onClick={() => navigator(-1)}>
          <FaArrowRight className={'backIcon'} />
          رجوع
        </button>
        </div>
        {cartItems.map((item,index)=>
             <div className="cart-item" key={index}>
            <div className="item-info">
           <img src={item.image} alt="img"/>
            <h6>{item.name}</h6>
          </div>
          <div className="itemprix">
          <p><bdi>درهم</bdi> {productTotalPricePerItem[index]} </p>
          </div>
          <div className="quantity-control">           
            <button onClick={()=>DicreaseProdectQauntity(item._id,item)} >-</button>
            <strong>{item.Quantity}</strong>
            <button onClick={()=>IncreaseProdectQauntity(item)}>+</button>
          </div>
          </div>
  
          )
        }
          </div>
        
  
      <div className="summary">
        { checkoutClicked?
            <button dir="ltr" className={'backButton'} onClick={() => navigator(-1)}>
            <FaArrowRight className={'backIcon'} />
            رجوع
          </button>
        
        : null
        }
          {
            checkoutClicked 
            ?
            (<form onSubmit={HandelSubmit} >
            < div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
            <div className="clientinfomation">
            <span ><h4 style={{display:'flex',width:'100%',fontSize:'20px'}}>الاسم والهاتف للتوصيل  
            <i style={{color:'red'}}>*</i></h4><u><Link to={'/login'}>تسجيل الدخول</Link></u></span>

          <input type="text" name="name" id="" placeholder="أكتب إسمك الكامل" onChange={(e)=>setname(e.target.value)} />
          {error.name && <p style={{ color: "red" }}>{error.name}</p>}
          <input type="text" name="phonenumber" id="" placeholder="أكتب رقم هاتفك" onChange={(e)=>setphonenumber(e.target.value)}  />
          {error.phonenumber && <p style={{ color: "red" }}>{error.phonenumber}</p>}

          </div>
          <div className="clientlocation">
          <span style={{display:'flex',fontSize:'20px'}} ><h4>عنوان التسليم<span style={{color:'red'}}>*</span></h4></span>
          <input type="text" name="street" id="" placeholder="الشارع" onChange={(e)=>setstreet(e.target.value)}  />
          {error.street && <p style={{ color: "red" }}>{error.street}</p>}
          <input type="text" name="housenumber" id="" placeholder="رقم المنزل (اختياري)" onChange={(e)=>sethousenumber(e.target.value)}  /> 
          </div>

            </div>
                     <button type="submit" className="orderplaced" >شراء</button>
            </form>
           
          )
            :
          ( <>
          <div className="summaryInfo">
          <div className="summaryHeader" >
          <h3>تفاصيل السلة</h3>
             <p> {cartAmount}  عناصر </p>
   
          </div>
           <div className='promo-code'>
             <label htmlFor="codepromo"> كود خصم</label>
            <div className='input-promo-code'>
            <input  name="codepromo" type="text" placeholder="هل لديك كود خصم ؟"/>
            <button className="applybutton">تفعيل</button>
            </div>
           </div>
           <div className="priceDetail">
             <div> 
           <p >المجموع الفرعي</p>
           <p >{totalDebut} <bdi>درهم</bdi></p>
           
           </div>
           <hr />
             <div>
           <p>الخصم</p>
           <p>0.00 <bdi>درهم</bdi></p>
           </div>
           <hr />
             <div>
             <p className="total-price">الإجمالي</p>
             <p className="total-price">{totalDebut} <bdi>درهم</bdi> </p></div>
           </div>
          </div>
            <button onClick={()=>handelCheckoutclick()} >التالي</button>
          </>
          
          
        )

          }
      </div>
    </div>
      )
    }
  </div>
  )
};


export default ShopingCart
