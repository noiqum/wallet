import* as React from 'react';
import axios from 'axios';

const Expense:React.FC=()=>{

    const [expense,setExpense]=React.useState<string>('name your expense');
    const [price,setPrice]=React.useState<number>(0);
    const [frequency,setFrequency]=React.useState<string>('')
    const [date,setDate]=React.useState<string>('today');

    const addHandler=(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        const payload={name:expense,price,frequency,date};
        axios.post('http://localhost:8000/api/expense/',payload).then(res=>console.log(res.data)).catch(err=>console.log(err))
        console.log('add expense')
        console.table(payload)

    }
    return <div>
        <input type="text" value={expense} onChange={(e)=>{setExpense(e.target.value)}}/>
        <input type="text" value={price} onChange={(e)=>{setPrice(+e.target.value)}}/>
        <input type="text"value={frequency} onChange={e=>setFrequency(e.target.value)}/>
        <input type="text" value={date} onChange={e=>setDate(e.target.value)}/>
        <button onClick={addHandler}>add Expense</button>
    </div>
}

export default Expense;