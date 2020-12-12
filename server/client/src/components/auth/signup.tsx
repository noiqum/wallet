import * as React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { inputValidate } from '../../utils/utils';
import Il from '../svg/il.svg';

import { userContext } from '../../store/context/userContext';
const SignUp: React.FC = () => {
    interface Idata {
        userName: string;
        email: string;
        password: string;
    }

    type TypeError = {
        email: string | null;
        password: string | null;
        userName: string | null;
    };
    const [data, setData] = React.useState<Idata | { userName: ''; email: ''; password: '' }>({
        userName: '',
        email: '',
        password: '',
    });
    const [error, setError] = React.useState<TypeError>({ userName: null, email: null, password: null });
    const history = useHistory();
    const { dispatch } = React.useContext(userContext);
    const changeHandler: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const signupHandler: React.FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.persist();
        const emailValidation = inputValidate(data.email, 'email');
        const passwordValidation = inputValidate(data.password, 'password');
        const userNameValidation = inputValidate(data.userName, 'userName');
        if (!userNameValidation.valid) {
            setError({ ...error, userName: userNameValidation.msg });
        } else if (!emailValidation.valid) {
            setError({ ...error, email: emailValidation.msg, userName: null, password: null });
        } else if (!passwordValidation.valid) {
            setError({ ...error, password: passwordValidation.msg, email: null, userName: null });
        } else {
            setError({ ...error, email: null, password: null, userName: null });
            axios
                .post('http://localhost:8000/api/user/', data)
                .then((res) => {
                    dispatch({
                        type: 'USER_LOGIN',
                        user: res.data,
                    });
                    history.push('/');
                })
                .catch((err) => {
                    const errObj = err.response.data.errorObj;
                    setError({ ...errObj });
                });
        }
    };
    return (
        <div className="signup">
            <Link to="/">Home</Link>
            <div className="signup__aside">
                <img src={Il} alt="illustration" />
            </div>
            <form className="signup__form">
                <div className="signup__form__name">
                    <label htmlFor="userName">username</label>
                    <input type="text" value={data.userName} name="userName" onChange={changeHandler} />
                    <small>{error.userName && error.userName}</small>
                </div>
                <div className="signup__form__email">
                    <label htmlFor="email">email</label>
                    <input type="email" value={data.email} name="email" onChange={changeHandler} />
                    <small>{error.email && error.email}</small>
                </div>
                <div className="signup__form__password">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={data.password} onChange={changeHandler} />
                    <small>{error.password && error.password}</small>
                </div>
                <button onClick={signupHandler}>Register</button>
            </form>
        </div>
    );
};

export default SignUp;
