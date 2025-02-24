import { useDispatch, useSelector } from "react-redux";
import "./Notification.css"; // استيراد ملف CSS
import {ClearNotificationListe } from "../Redux/Action";

const Notifiication = () => {
  const dispatch=useDispatch()
    // Fetch Notifications from the state
    const Notifications = useSelector((state) => state.admin.Notifications);
  
  const handelClearAll=()=>{
    localStorage.removeItem('notificationListe')
    dispatch(ClearNotificationListe())
  }

  return (
    <div className="notifications-container">
    <h2 className="notifications-title">📬 الإشعارات</h2>
    <button onClick={handelClearAll}>
        clear all
    </button>
    <div className="notifications-list">
        {
            Notifications.map((item,index)=>
                item.type=='order'?(
                    <div key={index} className="notification-item order">
                      <div className="notification-icon">🛒</div>
                      <div className="notification-content">
                        <h3 className="notification-title">طلب جديد: {item.items.map((prod)=>prod.name)}</h3>
                        <p className="notification-time">{item.date}</p>
                     </div>
                     <span className="notification-badge">Order</span>
                   </div>
                ):(
                    <div key={index} className="notification-item review">
                    <div className="notification-icon">⭐</div>
                    <div className="notification-content">
                        <h3 className="notification-title">مراجعة جديدة: {item.text} </h3>
                        <p className="notification-time"> {item.date} </p>
                    </div>
                    <span className="notification-badge">Review</span>
                </div>
                )
            )
        }
        



        
    </div>
</div>
  );
};

export default Notifiication;