import PropTypes from 'prop-types';
import './ViewMore.css';

const ViewMore = ({ product, onClose }) => {
    // Handle case where product is not provided or is invalid
    if (!product) {
        return (
            <div className="View-More-About-Product">
                <p>No product data available.</p>
                <button className="cancel-product-btn" type="button" onClick={onClose}>
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="View-More-About-Product">
            <div key={product._id} className="Product-info">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-and-back-button">
                    <div className="Product-detailes">
                        <div>
                            <label>Name: </label>
                            <span>{product.name}</span>
                        </div>
                        <div>
                            <label>Category: </label>
                            <span>{product.category}</span>
                        </div>
                        <div>
                            <label>Price: </label>
                            <span>{product.price}</span>
                        </div>
                        <div>
                            <label>Stock: </label>
                            <span>{product.stock}</span>
                        </div>
                        <div>
                            <label>Date Added: </label>
                            <span>{product.date_add_product}</span>
                        </div>
                        <div>
                            <label>Description: </label>
                            <span>{product.description}</span>
                        </div>
                    </div>
                    <div className='action-and-cancel-View-btn'>
                        <button className="cancel-View-btn" type="button" onClick={onClose}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMore;

ViewMore.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};