import { useState } from "react"

export const useProvideAuth = () =>{
    const[user , setUser] = useState(null);
    const[loading , setLoading] = useState(null);

    const login = (email , password) =>{};
    const logout = (email , password) =>{};

    return{
        user,
        login,
        logout,
        loading
    }

}