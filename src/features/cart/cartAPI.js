// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/cart',{
    method:'POST',
    body:JSON.stringify(item),
    headers:{'content-type':'application/json'}
   })
   const data = await response.json()
   resolve({data});
  
  }
  )
}
export function updateCartItem(update) {
  return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/cart/'+update.id,{
    method:'PATCH',
    body:JSON.stringify(update),
    headers:{'content-type':'application/json'}
   })
   const data = await response.json()
   resolve({data});
  
  }
  )
}
export function getCartItemsByUserId(userId) {
  return new Promise(async(resolve) =>{
    
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const data = await response.json()
    resolve({data});
    
  }
  )
}
export function deleteCartItem(itemId) {
  return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/cart/'+itemId,{
    method:'DELETE',
    headers:{'content-type':'application/json'}
   })
   const data = await response.json()
   console.log(data)
   resolve({ data:{id:itemId} });
  
  }
  )
}
export function resetCart(userId){
  //get all items of user's cart --> add then delete each
  return new Promise(async (resolve)=>{
    const response = await getCartItemsByUserId(userId);
    const items = response.data;
    for(let item of items){
      await deleteCartItem(item.id);
    }
    resolve({status:'success'})
  })
}