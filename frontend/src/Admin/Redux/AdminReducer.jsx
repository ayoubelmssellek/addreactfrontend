import { food_list } from "../../Client/assets/assets";
import { Employees } from "../assets/assets";
const initialState = {
    produits:localStorage.getItem('products')?
    JSON.parse(localStorage.getItem('products')):[],
    Employees:Employees,
    Notifications:localStorage.getItem('notificationListe')?
    JSON.parse(localStorage.getItem('notificationListe')):[],
    ListeCategory:localStorage.getItem('ListeCategories')?
    JSON.parse(localStorage.getItem('ListeCategories')):[],
    reviews: localStorage.getItem('review')?
    JSON.parse(localStorage.getItem('review')) :[]  ,
    orders:localStorage.getItem('orders')?
    JSON.parse(localStorage.getItem('orders')) :[]
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':{
            let allproducts=[...state.produits,action.payload]
            localStorage.setItem('products',JSON.stringify(allproducts))
            return { ...state, produits:allproducts  };
        }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                produits: state.produits.filter((product) => product._id !== action.payload),
            };

        case 'UPDATE_PRODUCT':{
            let updatedproduit=state.produits.map((product) =>
                Number(product._id) === Number(action.payload.id ) ? { ...product, ...action.payload.newProduit } : product)
            localStorage.setItem('products',JSON.stringify(updatedproduit))
            return {
                ...state,
                produits: updatedproduit
                
            };
    }
        case 'ADD_Employee':
            return { ...state, Employees: [...state.Employees,action.payload] };

        case 'DELETE_Employee':
            return {
                ...state,
                Employees: state.Employees.filter((Employee) => Employee.Id_Employee !== action.payload),
            };
    
        case 'UPDATE_Employee':
            return {
                ...state,
                Employees: state.Employees.map((Employee) =>
                    Number(Employee.Id_Employee) === Number(action.payload.id ) ? { ...Employee, ...action.payload.newEmployee } : Employee
                ),
            };

        case 'AddNotification':{
            let notificationListe= [...state.Notifications,action.notification]
            localStorage.setItem('notificationListe',JSON.stringify(notificationListe))
            return { ...state, Notifications: notificationListe };

          }
             

        case 'ClearNotificationListe':
            return { ...state, Notifications: [] };


        case 'UPDATE_CATEGORY_STATUS': {
            const { name, status } = action.payload;
        
            // Update the category status
            const updatedCategories = state.ListeCategory.map((category) =>
                category.menu_name === name
                    ? { ...category, statu: status }
                    : category
            );
        
       
             localStorage.setItem('ListeCategories', JSON.stringify(updatedCategories));
        
            return {
                ...state,
                ListeCategory: updatedCategories,
            };
            }
            
  
        case 'ADD_Category':{
            const newCC=[...state.ListeCategory, action.payload.newCategory]
            localStorage.setItem('ListeCategories',JSON.stringify(newCC))
            return {
                ...state,
                ListeCategory:newCC
              };
        }

        case 'HANDEL_REVIEW':{
              const updatedReviews = state.reviews.map((review) =>
              review.id === action.payload.id
                ? { ...review, statu: action.payload.statu }
                : review
            );
      
            localStorage.setItem('review', JSON.stringify(updatedReviews));
      
            return {
              ...state,
              reviews: updatedReviews,
            };
        }
          
        case 'UPDATE_PRODUCT_state':{
            const update_Prod_state = state.produits.map((prod) =>
                prod.category === action.payload.name
              ? { ...prod, statu: action.payload.newState }
              : prod
          );
        
          return {
            ...state,
            produits: update_Prod_state,
          };
      }
      
                
    case 'UPDATE_ORDER_STATUS':{
        const update_Order_state = state.orders.map((order) =>
            order.id === action.payload.orderId
          ? { ...order, statu: action.payload.newStatus }
          : order
      );
        localStorage.setItem('orders', JSON.stringify(update_Order_state));
        return {
            ...state,
            orders: update_Order_state
            
        };
    }
      
    default:
            return state;
    }
};


export default reducer; // ✅ Ensure export default