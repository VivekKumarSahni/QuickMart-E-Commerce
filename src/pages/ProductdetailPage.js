import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";



export default function ProductdetailPage(){
    return (
        <>
        <Navbar>
        <ProductDetail></ProductDetail>
        </Navbar>
        <Footer></Footer>
        </>
    );

}

{/* <Grid
  height="80"
  width="80"
  color="#0077b6"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> */}