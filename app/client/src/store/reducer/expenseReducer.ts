import * as React from 'react';
import {expenseType} from '../context/userContext'

export type expenseState={
    expenses:expenseType[]
}

export const expenseReducer=(state:expenseState,action:{type:string,expense:expenseType,expenseList?:expenseType[]})=>{
    switch (action.type) {
        case 'ADD_EXPENSE':
            
            return{
                ...state,
                expenses:[...state.expenses,action.expense]
            }
        case 'DELETE_EXPENSE':
            return{
                ...state,
                expenses:state.expenses.filter((expense)=>{
                    return expense.id !==action.expense.id
                })
            }
        case 'GET_EXPENSES':
            return{
                ...state,
                expenses:[...action.expenseList]
            }
        default:
            return state
    }
}

