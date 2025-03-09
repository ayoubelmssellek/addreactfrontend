import { useDispatch, useSelector } from "react-redux";
import "./Notification.css"; // استيراد ملف CSS
import {ClearNotificationListe } from "../Redux/Action";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Notifiication = () => {
  const dispatch=useDispatch()
    // Fetch Notifications from the state
    const Notifications = useSelector((state) => state.admin.Notifications);
    const [isOpen, setIsOpen] = useState(false);
    const { role } = useParams();

    const handleSidebarStateChange = (newState) => {
      setIsOpen(newState);
    };
    
  const handelClearAll=()=>{
    localStorage.removeItem('notificationListe')
    dispatch(ClearNotificationListe())
  }

  return (
    <div className="content">
    <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
    <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar  pagePath='Notification'/>
        <div className="pages">
        <div className="notifications-container">
        <h2 className="notifications-title">📬 Notification</h2>
        {/* Clear Filters Button */}
        <button  style={{marginBottom:'20px'}}
                onClick={handelClearAll}
                className="clear-button"
        >
                Clear All Notification
         </button>
        <div className="notifications-list">
            {
                Notifications.map((item,index)=>
                    item.type=='order'?(
                       <Link key={index} to={`/admin/Dashboard/${role}/ViewOrderDetails/${item.id}`}>
                        <div  className="notification-item order">
                          <div className="notification-icon">🛒</div>
                          <div className="notification-content">
                            <h3 className="notification-title">طلب جديد: {item.items.map((prod)=>prod.name)}</h3>
                            <p className="notification-time">{item.date}</p>
                         </div>
                         <span className="notification-badge">Order</span>
                       </div>
                       </Link>
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
        </div>
    </div>
    </div>
  );
};

export default Notifiication;

