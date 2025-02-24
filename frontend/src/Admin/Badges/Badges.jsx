import './Badges.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Badge = () => {
  const {role} = useParams()
  const products = useSelector((state) => state.admin.produits); // Get products from Redux store

  return (
    <>
      <Link to={`/admin/Dashboard/${role}/Products`}>
        <div className="badge-card">
          <div className="badge-header">
            <div className="badge-icon black">P</div>
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
            <div className="badge-icon blue">O</div>
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

      <div className="badge-card">
        <div className="badge-header">
          <div className="badge-icon green">C</div>
          <div className="title-and-number">
            <h2>Customers</h2>
            <h3>71</h3>
          </div>
        </div>
        <p className="growth green">
          Last update <span>2025/02/14</span>
        </p>
      </div>

      <div className="badge-card">
        <div className="badge-header">
          <div className="badge-icon pink">le</div>
          <div className="title-and-number">
            <h2>Bookings</h2>
            <h3>281</h3>
          </div>
        </div>
        <p className="growth green">
          Last update <span>2025/02/14</span>
        </p>
      </div>
    </>
  );
};

export default Badge;