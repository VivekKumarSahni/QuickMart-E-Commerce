import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/Components/UserProfile";



export default function UserProfilePage(){
    return (
        <>
        <Navbar>
            {/* <h1 className="mx-auto pl-10 text-2xl font-bold">My Orders</h1> */}
        <UserProfile></UserProfile>
        </Navbar>
        </>
    );

}