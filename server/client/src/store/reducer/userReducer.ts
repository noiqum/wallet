import * as React from 'react';

type userType={
    userName:string,
    id:string,
    email:string,
    token:string,
    bills?:string[],
}

export const userReducer=(state:userType,action:{type:string,user:{}})=>{
    switch (action.type) {
        case "USER_LOGIN":
            
            return{
                ...state,
                ...action.user
            }
        case "USER_LOGOUT":
            return  {
                ...state,
               ...action.user

            }
    
        default:
            return state;
    }
}