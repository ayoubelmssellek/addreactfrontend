import './Badges.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegStar,FaBoxOpen,FaUsers,FaChartLine,FaHamburger } from 'react-icons/fa';

const Badge = () => {
  const {role} = useParams()
  const products = useSelector((state) => state.admin.produits); // Get products from Redux store
  return (
    <>
      <Link to={`/admin/Dashboard/${role}/Products`}>
        <div className="badge-card">
          <div className="badge-header">
            <div className="badge-icon black">
              <FaHamburger color='#fff' size={20}/>
            </div>
            <div className="title-and-number">
              <h2>Products</h2>
              <h3>{products.length}</h3>
            </div>
          </div>
          <p className="growth green">
            Last update <span>2025/02/22</span>
          </p>
        </div>
      </Link>

      <Link to={`/admin/Dashboard/${role}/ListeOrders`}>
        <div className="badge-card">
          <div className="badge-header">
            <div className="badge-icon blue">
              <FaBoxOpen color='#fff' size={20} />
              <span  className={'add-ntf-all'} style={{color:'red'}}>
              {
               4
              }
            </span>
            </div>
            <div className="title-and-number">
              <h2>Orders</h2>
              <h3>21</h3>
            </div>
          </div>
          <p className="growth green">
            Last update <span>2025/02/14</span>
          </p>
        </div>
      </Link>
       <Link to={`/admin/Dashboard/${role}/Customers`}>
       <div className="badge-card">
        <div className="badge-header">
          <div className="badge-icon green">
            <FaUsers color='#fff' size={20}/>
          </div>
          <div className="title-and-number">
            <h2>Customers</h2>
            <h3>71</h3>
          </div>
        </div>
        <p className="growth green">
          Last update <span>2025/02/14</span>
        </p>
      </div>
       </Link>
      <Link to={`/admin/Dashboard/${role}/Reviews`}>
      <div className="badge-card">
        <div className="badge-header">
          <div className="badge-icon pink">
            <FaRegStar color='#fff' size={20}/>
            <span className={'add-ntf-all'}  style={{color:'red'}}>
              {
               2
              }
            </span>
          </div>
          <div className="title-and-number">
            <h2>Reviews</h2>
            <h3>21</h3>
          </div>
        </div>
        <p className="growth green">
          Last update <span>2025/02/14</span>
        </p>
      </div>
      </Link>
      <Link to={`/admin/Dashboard/${role}/SalesCompenent`}>
      <div className="badge-card">
        <div className="badge-header">
          <div className="badge-icon zzz">
            <FaChartLine color='#fff' size={20}/>
            <span className={'add-ntf-all'}  style={{color:'red'}}>
              {
               7
              }
            </span>
          </div>
          <div className="title-and-number">
            <h2>Sales</h2>
            <h3>13</h3>
          </div>
        </div>
        <p className="growth green">
          Last update <span>2025/02/14</span>
        </p>
      </div>
      </Link>
    </>
  );
};

export default Badge;