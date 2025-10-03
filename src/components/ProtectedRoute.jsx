import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
 

const ProtectedRoute = ({children}) => {
    const {userInfo} = useSelector((state) => state.auth);

    if(!userInfo){
        return <Navigate to='/authPage' replace/>
    }

    return children;
}

export default ProtectedRoute;