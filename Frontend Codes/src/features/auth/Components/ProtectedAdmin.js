import { useSelector } from "react-redux";
import { selectLoggedInuser, selectLoggedInuserToken } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export default function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInuserToken)
  const userInfo =useSelector(selectUserInfo);
    if(!user){
return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && userInfo.role!=='admin'){
        return <Navigate to='/' replace={true}></Navigate>
 
    }
    return children;
}