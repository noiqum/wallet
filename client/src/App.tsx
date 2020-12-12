import * as React from 'react';

import axios from 'axios';
import Main from './components/main/main';
import { userContext } from './store/context/userContext';
import { Redirect } from 'react-router-dom';

type props = {
    name: string;
};
function App({ name }: props): JSX.Element {
    const [login, setLogin] = React.useState<boolean>(false);
    const { state, dispatch } = React.useContext(userContext);
    const [redirect, setRedirect] = React.useState<boolean>(false);
    const check = async (token: string) => {
        const result = await axios
            .post('http://localhost:8000/api/user/verify', { token })
            .then((res) => {
                if (res.data.name === 'TokenExpiredError') {
                    setRedirect(true);
                }
                return res.data;
            })
            .catch((err) => console.log('check-err', err));
        return result;
    };
    const getUser = async (id: string) => {
        const user = await axios
            .get('http://localhost:8000/api/user/' + id)
            .then((res) => res.data)
            .catch((err) => console.log(err));
        return user;
    };
    React.useEffect(() => {
        if (state.user.token !== null) {
            check(state.user.token)
                .then(() => {
                    setLogin(true);
                })
                .catch((err) => console.log(err));
        } else if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            check(token)
                .then((res) => {
                    const user = getUser(res.id).then((res) => {
                        dispatch({
                            type: 'USER_LOGIN',
                            user: {
                                email: res.email,
                                userName: res.userName,
                                id: res._id,
                                token: token,
                                bills: res.bills,
                            },
                        });
                        setLogin(true);
                    });
                })
                .catch((err) => console.log('token-local', err));
        } else {
            setRedirect(true);
        }
    }, []);

    return (
        <div className="app">
            {login ? <Main /> : 'loading...'}
            {redirect && <Redirect to="/login" />}
        </div>
    );
}

export default App;
