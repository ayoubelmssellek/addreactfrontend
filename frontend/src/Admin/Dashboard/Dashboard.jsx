import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import './Dashboard.css';
import Badge from "../Badges/Badges";
import OrderTable from "../OrderTable/OrderTable";
import Navbar from "../Navbar/Navbar";
import ProductTypes from "../Types/Types";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to update the state when Sidebar changes
  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      </div>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'push-main-content' : ''}`}>
        <Navbar pagePath='Dashboard' />

        <div className="first-section">
          <div className="card">
            <Badge />
          </div>
        </div>

        <div className="second-section">
        <div className="orders-table">
            <OrderTable />
          </div>
          <div className="Most-Sales-Product">
            <ProductTypes/>
          </div>

        </div>
        {/* <div className="therd-section">
        <div className="Most-Ordered-Product">
            <MostOrderProduct/>
          </div>
          <div className="orders-and-sales-chart">
            <OverViewChart />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;