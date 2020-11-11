import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './store/context/userContext';
import App from './App';
import './index.scss';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import Report from './components/report/Report';
import Logout from './components/auth/logout';
import Expenses from './components/expense/expense';

ReactDOM.render(
    <Router>
        <UserProvider>
            <Switch>
                <Route path="/" exact component={App}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/report" component={Report} />
                <Route path="/logout" component={Logout} />
                <Route path="/expenses" component={Expenses} />
                <Route component={App}></Route>
            </Switch>
        </UserProvider>
    </Router>,
    document.getElementById('app'),
);
