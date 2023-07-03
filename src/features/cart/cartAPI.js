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
    console.log(userId+'main kon hu')
   const response = await fetch('http://localhost:8080/cart?user='+userId)
   const data = await response.json()
   resolve({data});
  
  }
  )
}