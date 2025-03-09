import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { ADDCategory } from '../Redux/Action';
const AddCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { role } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [Name_Category,setName_Category] = useState('');
    const [error, setError] = useState('');
  
    const isFormValid = Name_Category   ;
  
  
      // Function to update the state when Sidebar changes
        const handleSidebarStateChange = (newState) => {
          setIsOpen(newState);
      };
  
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
  
        if (!isFormValid) {
            setError('Please fill all fields');
            return;
        }
  
  
        const w ={
            menu_name: Name_Category,
            menu_image: '',
            statu:'avalaible'
        }
            
        
        dispatch(
            ADDCategory(w)
        )
        navigate(`/admin/Dashboard/${role}/Categoreis`);
    };
   

      return (
                <div className="content">
                    <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
                    <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                        <Navbar  pagePath='Add Category'/>
                        <div className="pages">
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <p className="form-title">Add Category</p>
                    {error && <span className="error-message">{error}</span>}
        
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Category Name"
                            value={Name_Category}
                            onChange={(e) => setName_Category(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`submit-button ${isFormValid ? 'active' : 'disabled'}`}
                        disabled={!isFormValid}
                    >
                        Add Category
                    </button>
                </form>
                        </div>
                    </div>
                </div>
      )
    
}

export default AddCategory
