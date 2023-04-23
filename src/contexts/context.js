import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = React.createContext({});

export const LoginProvider = (props) => {
    const lsUser=JSON.parse(localStorage.getItem("usuario"))
    const [usuario, setUsuario] = useState(lsUser!==null?lsUser:{});
    const navigate=useNavigate()

    useEffect(()=>{
        if(lsUser===null){
            navigate("/")
        }else{
            navigate("/home")
        }
    },[])
    
    return (
        <LoginContext.Provider value={{ usuario, setUsuario }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => React.useContext(LoginContext)