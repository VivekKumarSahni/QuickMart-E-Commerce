import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";

export default function Home()
{
return (
   <Navbar>
    <ProductList></ProductList>
   </Navbar>
);
}