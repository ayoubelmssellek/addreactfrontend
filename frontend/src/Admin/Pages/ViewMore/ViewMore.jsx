import { useSelector,useDispatch} from "react-redux";
import { useParams , Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import { Delete } from "../../Redux/Action";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import './ViewMore.css'
import { FaTrash, FaEdit ,FaBackward } from 'react-icons/fa';

const ViewMore = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useSelector((state) => state.admin.produits); // Get products from Redux store
    const { role, Code } = useParams();
    const SelectedProduct=products.find((item)=>item._id==Code)
    const dispatch=useDispatch()
    const Navigate=useNavigate()
   
    // Function to update the state when Sidebar changes
    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };


    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            dispatch(Delete(id)); // Dispatch delete action to Redux
            Navigate(`/admin/Dashboard/${role}/Products`)
        }
    };
  return (
    
    <div className="content">
        <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
       <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar  pagePath='View More'/>
        <div className="pages">
        <div className="View-More-About-Product">
      
           <div key={SelectedProduct._id} className="Product-info" >
               <img src={SelectedProduct.image} alt={SelectedProduct.name}loading="lazy"/>
                <div className="product-and-back-button">               
                     <div className="Product-detailes">
                     <div>
                        <label>Name : </label>
                        <span>{SelectedProduct.name}</span>
                     </div>
                     <div>
                        <label>Category : </label>
                        <span>{SelectedProduct.category}</span>
                     </div>
                     <div>
                        <label>Price : </label>
                        <span>{SelectedProduct.price}</span>
                     </div>
                     <div>
                        <label>Stock : </label>
                        <span>{SelectedProduct.stock}</span>
                     </div>
                     <div>
                        <label>Date added : </label>
                        <span>{SelectedProduct.date_add_product}</span>
                     </div>
                     <div>
                        <label>Description : </label>
                        <span>{SelectedProduct.description}</span>
                     </div>
                     </div>
                     <div className="back-button">
                            <div className="Back-to-Products-page ">
                            <Link to={`/admin/Dashboard/${role}/Products`}><FaBackward size={25} color="Black"/></Link>
                            </div>
                            <div  className="Update--Products-page">
                            <Link to={`/admin/Dashboard/${role}/UpdateSelectedProduct/${SelectedProduct._id}`}><FaEdit size={25} color="#2563eb"/></Link>
                            </div>
                            <div className="Delete-product">
                            <button onClick={()=>handleDelete(SelectedProduct._id)} ><FaTrash size={25} color="rgb(244, 67, 54)"/></button>
                            </div>
                     </div>

          
            </div>
       </div>
     
       
</div>
        </div>
       </div>
   </div>
       
  )
}
export default ViewMore
