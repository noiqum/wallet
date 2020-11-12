import * as React from 'react';
import { modalFormValidate } from '../../utils/utils';
import axios from 'axios';
import { userContext } from '../../store/context/userContext';
type TypeExpenseData = {
    name: string;
    price: number;
    date: string;
    frequency: string;
    category: string;
    user: string;
};
type TypeFormError = {
    field: string | null;
    msg: string | null;
};

const Modal: React.FC<{ mood: string; close: () => void }> = ({ mood, close }) => {
    const [data, setData] = React.useState<TypeExpenseData>({
        name: '',
        price: 0,
        date: '',
        frequency: '',
        user: '',
        category: '',
    });
    const [error, setError] = React.useState<TypeFormError>({
        field: null,
        msg: null,
    });
    const { state, dispatch } = React.useContext(userContext);
    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const checkFormData = (data: TypeExpenseData) => {
        let checkResult = modalFormValidate(data);
        if (checkResult.msg === 'done') {
            setError({ field: null, msg: null });
        } else {
            setError(checkResult);
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkFormData(data);
        if (!error.msg) {
            console.log(error.msg);
            const expense = { ...data, user: state.user.id };
            axios
                .post('http://localhost:8000/api/expense/', expense, { headers: { 'x-auth-token': state.user.token } })
                .then((res) => {
                    dispatch({
                        type: 'ADD_EXPENSE',
                        expense: res.data,
                    });
                    close();
                })
                .catch((err) => console.log(err.response));
        } else {
            return;
        }
    };
    return (
        <div className={'modal' + ' ' + mood}>
            <span>{error.msg}</span>
            <span
                onClick={() => {
                    close();
                }}
            >
                close
            </span>
            <h2>Add Expense</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={data.name} onChange={changeInputHandler} />
                </div>
                <div>
                    <label htmlFor="category">category</label>
                    <select name="category" id="category" onChange={changeSelectHandler}>
                        <option value="" selected>
                            Pick an option
                        </option>
                        <option value="house">house</option>
                        <option value="utilies">utilies</option>
                        <option value="food">food</option>
                        <option value="transportation">transportation</option>
                        <option value="insurance">insurance</option>
                        <option value="household">household items</option>
                        <option value="entertainment">entertainment</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input name="price" type="text" value={data.price} onChange={changeInputHandler} />
                </div>
                <div>
                    <label htmlFor="frequency">Frequency</label>
                    <select name="frequency" id="frequency" onChange={changeSelectHandler}>
                        <option value="" selected>
                            Pick an option
                        </option>
                        <option value="once">Once</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Purchase Date</label>
                    <input type="date" name="date" id="date" value={data.date} onChange={changeInputHandler} />
                </div>
                <input type="submit" value="Add Expense" />
            </form>
        </div>
    );
};

export default Modal;
