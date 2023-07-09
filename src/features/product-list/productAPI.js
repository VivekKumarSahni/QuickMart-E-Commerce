import { ITEMS_PER_PAGE } from "../../app/constants";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/products');
   //Server will fetch deleted products
   const data = await response.json()
   resolve({data}); 
  }
  )
}
export function createProduct(product) {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/products/',{
   
   method:'POST',
   body: JSON.stringify(product),
   headers:{'content-type':'application/json'}
   
  })
   const data = await response.json()
   resolve({data});
  
  }
  )
}
export function updateProduct(update) {
  return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/products/'+update.id,{
    method:'PATCH',
    body:JSON.stringify(update),
    headers:{'content-type':'application/json'}
   })
   const data = await response.json()
   resolve({data});
  
  }
  )
}
export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/products/'+id)
   const data = await response.json()
   resolve({data});
  
  }
  )
}


export function fetchProductsByFilters(filter,page) {
//filter = {"category ": "smartphone"}
//_page=1&_limit=10
//TODO : on server we will support multivalues in filter
//TODO: Server will filter deleted products
let queryString ='';
for(let key in filter){
  queryString +=`${key}=${filter[key]}&`
}
const pagination= {_page:page,_limit:ITEMS_PER_PAGE}
for(let key in pagination){
  queryString +=`${key}=${pagination[key]}&`
}

  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/products?'+ queryString)
   const data = await response.json()
   const totalItems = await response.headers.get('X-Total-Count')
   resolve({data:{products:data ,totalItems:+totalItems}});
  
  }
  )
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/categories')
   const data = await response.json()
   resolve({data});
  
  }
  )
}
export function fetchBrands() {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/brands')
   const data = await response.json()
   resolve({data});
  
  }
  )
}