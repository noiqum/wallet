import * as React from 'react';
import { userContext } from '../../store/context/userContext';
import Header from '../header/header';
import Side from '../side/side';
import Content from '../content/content';
import axios from 'axios';
const Main: React.FC = () => {
    const { state, dispatch } = React.useContext(userContext);
    React.useEffect(() => {
        axios
            .post(
                'http://localhost:8000/api/expense/list',
                { user: state.user.id },
                { headers: { 'x-auth-token': state.user.token } },
            )
            .then((res) => {
                dispatch({
                    type: 'GET_EXPENSES',
                    expenseList: res.data,
                });
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="main">
            <Header />
            <div className="main__body">
                <Side username={state.user.userName} />
                <Content />
            </div>
        </div>
    );
};

export default Main;
