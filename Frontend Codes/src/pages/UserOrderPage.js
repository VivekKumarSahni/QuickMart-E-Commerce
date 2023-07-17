import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/Components/UserOrders";



export default function UserOrderPage(){
    return (
        <>
        <Navbar>
            <h1 className="mx-auto pl-10 text-2xl font-bold">My Orders</h1>
        <UserOrders></UserOrders>
        </Navbar>
        </>
    );

}