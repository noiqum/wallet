import * as React from 'react';
import Logout from './components/auth/logout';
import axios from 'axios';
import Main from './components/main/main';
import { userContext } from './store/context/userContext';
import { Redirect } from 'react-router-dom';
import { LoaderOptionsPlugin } from 'webpack';
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
                return res.data;
            })
            .catch((err) => console.log(err));
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
        } else if (localStorage.getItem('token') !== '') {
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
                            },
                        });
                        setLogin(true);
                    });
                })
                .catch((err) => console.log(err));
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
