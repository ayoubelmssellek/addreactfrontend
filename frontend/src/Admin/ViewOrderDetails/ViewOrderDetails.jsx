import { useState } from 'react';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import './ViewOrderDetails.css';
import { FaFileExport } from "react-icons/fa6";

const ViewOrderDetails = () => {
  const listorders = useSelector((state) => state.admin.orders);
  const [isOpen, setIsOpen] = useState(false);
  const { Code } = useParams();
  const SelectedOrder = listorders.find((item) => item.id == Code);

  const exportfact = () => {
    const element = document.getElementById('Factore');
    html2pdf().from(element).save('factore.pdf');
  };

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  if (!SelectedOrder) {
    return <div>Order not found</div>;
  }

  return (
    <div className="content">
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar pagePath="Liste Orders" />
        <div className="pages">
          <div className='export-fact'>
            <span>
            <FaFileExport onClick={exportfact} size={40} color='#1a73e8'/>
            </span>
          </div>
          <div className="View-More-About-order">
            <div style={{ direction: 'ltr' }} className="order-container">
              <div className="order-header">
                <h1>Order Information</h1>
                <p>Order id: <span className="order-id">{SelectedOrder.id}</span></p>
              </div>

              <div className="customer-details">
                <h2>Client Information</h2>
                <p><strong>Name:</strong> {SelectedOrder.name}</p>
                <p><strong>Phone Number:</strong> {SelectedOrder.phonenumber}</p>
                <p><strong>Order Date:</strong> {SelectedOrder.date}</p>
                <p><strong>Number House:</strong> {SelectedOrder.housenumber}</p>
              </div>

              <div className="items-list">
                <h2>Liste Orders</h2>
                <div className="items-container">
                  {SelectedOrder.items && SelectedOrder.items.map((item, index) => (
                    <div key={index} className="item-card">
                      <img src={item.image} alt={item.name} className="item-img" />
                      <div className="item-info">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">{item.price} DH</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="total-amount">
                <h3>Total Price: {SelectedOrder.items.reduce((acc, item) => acc + item.price, 0)} DH</h3>
              </div>
            </div>

            <div className='Factore' id='Factore' style={{direction:'ltr'}}>
               <div  className="Factore-container">
                  <div className='Store-Name-and-Phone'>
                      <h4>GUSTO FAST-FOOD</h4>
                      <div>
                        <span>Tel : </span>
                        <span>06-40-60-62-82</span>
                      </div>
                  </div>

                  <div className='Date-Sort-and-type'>
                      <span>24/03/2025 19:34</span>
                      <div>
                        <h4>Caissier o caissier</h4>
                      </div>
                  </div>
                <div className='Logo-and-name'>
                      <span>
                        <img src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg" alt="" />
                      </span>
                      <div>
                        <h4>GUSTO</h4>
                      </div>
                 </div>
                 <div className='Article-and-Q-and-M'>
                    <table>
                        <thead>
                            <tr>
                                <th className="article-column">Article</th>
                                <th className="qte-column">Qte</th>
                                <th className="montant-column">MOntant</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>tacos polet</td>
                            <td>2</td>
                            <td>35</td>
                          </tr>  
                          <tr>
                            <td>salade veg</td>
                            <td>1</td>
                            <td>28</td>
                          </tr>  
                        </tbody>
                    </table>
                </div>
                <div className='total-price-fact'>
                      <div>
                      <h4>TOTAL TTC</h4>
                      <h5>120,00</h5>
                      </div>
                      <div>
                      <span>DONNEE</span>
                      <span>120,00</span>
                      </div>
                      <div>
                      <span>A RENDRE</span>
                      <span>0,00</span>
                      </div>
                  </div>
                  <div className='Qr-code'>
                      <div>
                      <span>Merci pour votre achat</span>
                      <div>
                        <img src='data:image/png;base64,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'/>
                       </div>
                      </div>
                  </div>
              </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;