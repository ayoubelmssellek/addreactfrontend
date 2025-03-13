import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../Types/Types.module.css';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UpdateStatusByType } from '../Redux/Action';
import { UpdateStatusFromType } from '../Redux/Action';
const ProductTypes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const Types = useSelector((state) => state.admin.ListeTypes);
  const dispatch = useDispatch();


  

  const filteredData = Types.filter(item => {
    const matchesSearch = item.type_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handlePrevious = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNext = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Fixed status toggle logic
  const handleStatusToggle = (type, currentStatus) => {
    const newStatus = currentStatus === 'avalaible' ? 'out_of_stock' : 'avalaible';
    dispatch(
      UpdateStatusFromType(
        type,
        newStatus
      )
    )
    dispatch(UpdateStatusByType(
      type,
      newStatus
    ));
    console.log(type,newStatus);
    
  };

  return (
    <div className={styles.tableContainer}>
    <div className={styles.tableHeader}>
      <h2>Types Management</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.statusFilter}
        >
          <option value="all">All Statuses</option>
          <option value="Available">Available</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        <button onClick={clearFilters} className={styles.clearButton}>
          X
        </button>
      </div>
    </div>

    <table className={styles.typesTable}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => (
          <tr key={item.type_name}>
            <td>{item.type_name}</td>
            <td>
              <button
                className={`${styles.statusBadge} ${item.status === 'avalaible' ? styles.available : styles.outOfStock}`}
                onClick={() => handleStatusToggle(item.type_name, item.status)}
              >
                {item.status.replace(/_/g, ' ')}
              </button>
            </td>
            <td>
              <Link to={`/types/${item.type}`}>
                <FaEye color='#1A73E8'/>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className={styles.paginationControls}>
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className={styles.paginationButton}
      >
        Next
      </button>
    </div>
  </div>
  );
};

export default ProductTypes;