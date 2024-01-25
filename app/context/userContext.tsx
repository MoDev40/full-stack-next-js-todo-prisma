'use client'
import jwt,{JwtPayload } from "jsonwebtoken";
import {createContext, useContext, useEffect, useState} from "react"
import  * as Cookies from "js-cookie"


interface ContextType{
    userId:number | null;
    setUserId:(user:number )=> void;
    verifyAndSetUser: (token: string) => void;
    logOut:()=>void;
}

const UserContext = createContext<ContextType | undefined>(undefined)

export const ContextProvider = ({children}:{children:React.ReactNode})=>{

    const [userId,setUserId] =  useState<number | null>(null)
    const verifyAndSetUser = (token: string) => {
        try {
            const dec = jwt.decode(token) as JwtPayload 
            setUserId(dec?.id)
        } catch (error:any) {
          console.error('Token verification failed:', error.message);
        }
      };
      
      const logOut = ()=>{
        Cookies.default.remove("token")
      }

      useEffect(() => {
        const token = Cookies.default.get("token");
        if (token) {
          verifyAndSetUser(token);
        }
      }, []);

    return(
        <UserContext.Provider value={{userId,setUserId,verifyAndSetUser,logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  };