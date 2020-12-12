import * as React from 'react';
import {inputValidate} from '../../../utils/utils'
type TypeProps={
    name:string,
    label:string,
}
type TypeError={
    valid:boolean,
    msg:string
}

const Input=({name,label}:TypeProps):JSX.Element=>{
    const [inputValue,setInputValue]=React.useState<string>('');
    const [error,setError]=React.useState<TypeError | null>(null)
    const changeHandler=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setInputValue(e.target.value);
       setError(inputValidate(e.target.value,e.target.name));
    }
    return (
        <div className="input">
            <label htmlFor={label}></label>
            <input type="text" name={name} value={inputValue} onChange={changeHandler}/>
    <small>{error}</small>
        </div>
    )


}

export default Input;