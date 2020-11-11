import * as React from 'react';
import { JsxAttribute } from 'typescript';
import './report.scss';

import {userContext} from '../../store/context/userContext'


function Report():JSX.Element{
    const {state,dispatch}=React.useContext(userContext)
    console.table(state)
    return (
        <div className="report">
            <h2>report</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eveniet quas eius?</p>
            
    <pre>{JSON.stringify(state)}</pre>
        <button onClick={()=>{dispatch({
            type:'ADD_EXPENSE',
            expense:{
                name:'mouse',
                price:11,
                date:'12/10/2020'
            }
        })}}>clicky</button>
        </div>
    
    )
}

export default Report