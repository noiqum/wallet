import * as React from 'react';
import axios from 'axios';
import { userContext } from '../../store/context/userContext';
import { Link } from 'react-router-dom';
import Door from '../svg/door.svg';
type Iprops = {
    userName: string;
};

const Logout: React.FC<Iprops> = () => {
    const { state, dispatch } = React.useContext(userContext);
    React.useEffect(() => {
        axios.get('http://localhost:8000/api/user/logout');
        localStorage.clear();
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
        <div className="logout">
            <Link to="/">Homepage</Link>
            Goodbye
            <img src={Door} alt="door_illustration" />
        </div>
    );
};

export default Logout;
