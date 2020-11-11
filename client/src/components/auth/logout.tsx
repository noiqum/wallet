import * as React from 'react';
import axios from 'axios';
import { userContext } from '../../store/context/userContext';
import { Link } from 'react-router-dom';
type Iprops = {
    userName: string;
};

const Logout: React.FC<Iprops> = () => {
    const { state, dispatch } = React.useContext(userContext);
    React.useEffect(() => {
        axios.get('http://localhost:8000/api/user/logout');
        localStorage.setItem('token', '');
        dispatch({
            type: 'USER_LOGOUT',
            user: {
                userName: 'default',
                id: '123456',
                token: null,
                email: '',
            },
        });
    }, []);

    return (
        <div>
            Goodbye {state.user.userName}
            <Link to="/">Homepage</Link>
        </div>
    );
};

export default Logout;
