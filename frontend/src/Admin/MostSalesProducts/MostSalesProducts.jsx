import './MostaSalesProducts.css'
import { FaDollarSign,FaArrowUp,FaArrowDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
 const MostaSalesProducts=()=> {
    const listorders = useSelector((state) => state.admin.orders || []);
    const CompletedOrders=listorders.filter((complet)=>complet.statu=='Delivered')
    const NamesOrder=CompletedOrders.map((names)=>names.items.map((name)=>name.name))
    
          return (
            <div className="sales-container">
         <div className="card-header">
          <h2 className="card-title" >Most Sales This Day</h2>
                 <div style={{display:'flex'}}>
                 <FaArrowUp size={20} color='green' />
                 <FaArrowDown size={20} color='green'/>
                 </div>
        </div>
        <div className='hr-and-ul'> 
        <hr style={{backgroundColor:'yellowgreen', width: '1px',height: 'auto'}}/> 
    <ul className="sales-list">
        {
            CompletedOrders.map((item,index)=>
        <li key={index}>
            <div className='count-and-name'>
                <div>
                <h3>25</h3>
                <h4>
                    {
                        NamesOrder[index][0]
                    }
                </h4>
                </div>
                <div>
                <p>1200</p>
                <FaDollarSign color='green' size={25}/>
                </div>
            </div>
            <small>{item.date}</small>
        </li>
            )
        }
    </ul>
        </div>
  
</div>
          );
        }
 


export default MostaSalesProducts
