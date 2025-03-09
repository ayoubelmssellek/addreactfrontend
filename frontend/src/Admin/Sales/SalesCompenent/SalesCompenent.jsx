import SalesChrts from '../SalesCharts/SalesCharts'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import '../SalesCompenent/SalesCompenent.css'
const SalesCompenent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Category = useSelector((state) => state.admin.ListeCategory); // Get ListeCategory from Redux store

    

    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };
    
  return (
              <div className="content">
                  <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
                  <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                      <Navbar  pagePath='Sales'/>
                      <div className='pages Sales-Compenent'>
                         <idv className='Sales-charts-section'>
                           <SalesChrts Categories={Category}/>
                         </idv>
                      </div>
                  </div>  
              </div>
  )
}

export default SalesCompenent
