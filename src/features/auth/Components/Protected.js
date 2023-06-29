import { useSelector } from "react-redux";
import { selectLoggedInuser } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function Protected({children}) {
    const user = useSelector(selectLoggedInuser)
  
    if(!user){
return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}