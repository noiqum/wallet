import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { inputValidate } from '../../utils/utils';
import Axios from 'axios';
import laci from '../png/laci.png';
import { userContext } from '../../store/context/userContext';

interface Iprops {
    text?: string;
}
type TypeError = {
    email: string | null;
    password: string | null;
    login: string | null;
};
const Login: React.FC<Iprops> = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<TypeError>({ email: null, password: null, login: null });
    const { dispatch } = React.useContext(userContext);
    const history = useHistory();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const emailValidation = inputValidate(email, 'email');
        const passwordValidation = inputValidate(password, 'password');
        if (!emailValidation.valid) {
            setError({ ...error, email: emailValidation.msg });
        } else if (!passwordValidation.valid) {
            setError({ ...error, password: passwordValidation.msg });
        } else {
            setError({ ...error, email: null, password: null });
            Axios.post('http://localhost:8000/api/user/login', { email, password })
                .then((res) => {
                    dispatch({
                        type: 'USER_LOGIN',
                        user: res.data,
                    });
                    localStorage.setItem('token', res.data.token);
                    history.push('/');
                })
                .catch((err) => {
                    const errObj = err.response.data;
                    setError({ ...errObj });
                });
        }
    };

    return (
        <>
            <div className="login">
                <header style={{ backgroundImage: `url(${laci})` }}>
                    <h2>Welcome Back!</h2>
                </header>
                <Link to="/">home</Link>

                <form onSubmit={submitHandler} className="login__form">
                    <div>{error.login}</div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <small>{error.email ? error.email : null}</small>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <small>{error.password ? error.password : null}</small>
                    <button type="submit">Submit</button>
                    <p>
                        Wanna{' '}
                        <span
                            onClick={() => {
                                history.push('/signup');
                            }}
                        >
                            Register ?
                        </span>
                    </p>
                </form>
                <div className="login__aside" style={{ backgroundImage: `url(${laci})` }}>
                    <span>wallet</span>
                    <span>Track your expenses</span>
                    <span>Efficient personal budget management</span>
                </div>
            </div>
        </>
    );
};

export default Login;
