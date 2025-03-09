import React, { useState } from "react";
import { FaChevronDown, FaBox, FaCheckCircle, FaMotorcycle, FaRedoAlt, FaArrowRight } from "react-icons/fa";
import styles from "./OrderHistory.module.css";
import { Navbar } from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReorder } from "../../actions/action";
import { Navigate, useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const orders = useSelector((state) => state.client.orders || []);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const toggleOrder = (orderId) => setExpandedOrder(expandedOrder === orderId ? null : orderId);

  const handleTrackOrder = (orderId, e) => {
    e.stopPropagation();
    setTrackingOrder(trackingOrder === orderId ? null : orderId);
  };

  const handleReorder = (order) => {
    dispatch(setReorder(order));
    navigator("/shoupingCart"); 
  };

  

  return (
    <>
    <Navbar/>
      <div className={styles.orderHistoryContainer}>
        <div className={styles.orderHistoryHeader}>
          <h1><FaBox className={styles.headerIcon} /> سجل الطلبات</h1>
          <div className={styles.orderStats}>
            <div className={styles.statItem}>
              <FaCheckCircle className={styles.statIcon} />
              <span>{orders.length} طلب مكتمل</span>
            </div>
          </div>
          <button dir="ltr" className={styles.backButton} onClick={() => navigator(-1)}>
          <FaArrowRight className={styles.backIcon} />
          رجوع
        </button>
        </div>

        <div className={styles.ordersList}>
          {orders.length > 0 ? (
            orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order) => (
              <div className={styles.orderItem} key={order.id}>
                <div className={styles.orderHeader} onClick={() => toggleOrder(order.id)}>
                  <div className={styles.orderMainInfo}>
                    <span className={styles.orderNumber}>{order.orderNumber}</span>
                    <span className={styles.orderDate}>{order.date}</span>
                    <button
                      className={styles.trackOrderBtn}
                      onClick={(e) => handleTrackOrder(order.id, e)}
                    >
                      <FaMotorcycle /> تتبع الطلب
                    </button>
                  </div>
                  <div className={styles.orderStatus}>
                    <span className={`${styles.statusbefore}`}>
                      {order.statusOrder}
                    </span>
                    <FaChevronDown className={`${styles.expandIcon} ${expandedOrder === order.id ? styles.expanded : ""}`} />
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className={styles.orderDetails}>
                    <div className={styles.productsList}>
                      {order.items.map((item, index) => (
                        <div className={styles.productItem} key={index}>
                          <img src={item.image} alt={item.name} className={styles.productImage} />
                          <div className={styles.productInfo}>
                            <h4>{item.name}</h4>
                            <span>{item.Quantity}x  <bdi> درهم </bdi> {item.price} </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderSummary}>
                      <div className={styles.summaryRow}>
                        <span dir="rtl">المجموع: {order.items.reduce((acc, item) => acc + item.Quantity * item.price, 0)} درهم</span>
                      </div>
                      <button className={styles.reorderBtn} onClick={() => handleReorder(order.items)}>
                        <FaRedoAlt /> طلب مرة أخرى
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noOrders}>لا توجد طلبات حاليًا</p>
          )}
        </div>

        {trackingOrder && (
          <div className={styles.trackingModal} onClick={() => setTrackingOrder(null)}>
            <div className={styles.trackingContent} onClick={(e) => e.stopPropagation()}>
              <h3>تتبع الطلب #{orders.find((o) => o.id === trackingOrder)?.orderNumber}</h3>
              <div className={styles.trackingSteps}>
                {orders.find((o) => o.id === trackingOrder)?.tracking.map((step, index) => (
                  <div className={styles.trackingStep} key={index}>
                    <div className={styles.stepIcon}></div>
                    <div className={styles.stepInfo}>
                      <span className={styles.stepStatus}>{step.status}</span>
                      <span className={styles.stepTime}>{step.time} - {step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.closeTrackingBtn} onClick={() => setTrackingOrder(null)}>
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
