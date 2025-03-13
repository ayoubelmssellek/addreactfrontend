import { useState} from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTimes, FaStar, FaRegStar } from "react-icons/fa";
import { HandelReview } from "../Redux/Action";
import './Reviews.css'

const Reviews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reviews=useSelector((stat)=>stat.client.reviews)
  const dispatch = useDispatch();

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  const handleAcceptReview = (id) => {
    dispatch(HandelReview(id, 'Accepted'));
  };
 
  const handleRejectReview = (id) => {
    dispatch(HandelReview(id, 'Rejected'));
  };

  return (
    <div className="content">
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar pagePath="Reviews" />
        <div className="pages">
          {reviews.length != 0 ? (
            <div className="products-container">
              <div className="table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Product</th>
                      <th>Opinion</th>
                      <th>Rating</th>
                      <th>Date</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((item) => (
                      <tr key={item.id}>
                        <td>{item.personName}</td>
                        <td>{item.plateName}</td>
                        <td>{item.text}</td>
                        <td>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              i < item.rating ? 
                                <FaStar key={i} className="star filled" /> : 
                                <FaRegStar key={i} className="star" />
                            ))}
                          </div>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          <img
                            src={item.image}
                            alt="img"
                            title="image"
                            width={60}
                            height={60}
                          />
                        </td>
                        <td>
                          {item.statu === 'Accepted' ? (
                            <span style={{ background: 'green', padding: '10px', color: '#fff' ,borderRadius:'5px'}}>Accepted</span>
                          ) : item.statu === 'Rejected' ? (
                            <span style={{ background: 'red', padding: '10px', color: '#fff',borderRadius:'5px' }}>Rejected</span>
                          ) : (
                            <div className="Accept-and-reject-icons">
                              <button onClick={() => handleAcceptReview(item.id)}>
                                <FaCheck size={30} color="#4CAF50" />
                              </button>
                              <button onClick={() => handleRejectReview(item.id)}>
                                <FaTimes size={30} color="red" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h3 className="no-products">No Reviews available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews