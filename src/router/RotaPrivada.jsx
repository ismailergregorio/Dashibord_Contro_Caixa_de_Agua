import { Navigate } from "react-router-dom";

export default function RotaPrivada({children}){
    const token =  localStorage.getItem("accessToken");

    return token?children : <Navigate to="/"/>
}