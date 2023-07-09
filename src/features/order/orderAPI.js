import { ITEMS_PER_PAGE } from "../../app/constants";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function updateOrder(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllOrders({sort,page}) {
  
  let queryString ='';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  const pagination= {_page:page,_limit:ITEMS_PER_PAGE}
  for(let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  
    return new Promise(async(resolve) =>{
      
     const response = await fetch('http://localhost:8080/orders?'+ queryString)
     const data = await response.json()
     const totalOrders = await response.headers.get('X-Total-Count')
     resolve({data:{orders:data ,totalOrders:+totalOrders}});
    
    }
    )
  }