// Products Actions
export const Add=(id)=>{
    return{
      type:'ADD_PRODUCT',
      payload:id
    }
}
export const Delete=(id)=>{
    return{
      type:'DELETE_PRODUCT',
      payload:id
    }
}
export const Edit=(id,newProduit)=>{
  return{
    type:'UPDATE_PRODUCT',
    payload:{id,newProduit}
  }
}

// Employees Actions

export const AddEmployee=(id)=>{
  return{
    type:'ADD_Employee',
    payload:id
  }
}
export const DeleteEmployee=(id)=>{
  return{
    type:'DELETE_Employee',
    payload:id
  }
}
export const EditEmployee=(id,newEmployee)=>{
return{
  type:'UPDATE_Employee',
  payload:{id,newEmployee}
}
}


export const AddNotification=(notification)=>{
  return{
      type:'AddNotification',
      notification
  }
}
export const ClearNotificationListe=()=>{
  return{
      type:'ClearNotificationListe',
      
  }
}
