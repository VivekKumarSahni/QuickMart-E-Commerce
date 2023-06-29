import { ITEMS_PER_PAGE } from "../../app/constants";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    
   const response = await fetch('http://localhost:8080/products')
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