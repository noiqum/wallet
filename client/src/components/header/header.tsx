import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../store/context/userContext';

const Header: React.FC = () => {
    const { state } = React.useContext(userContext);

    return (
        <div className="header">
            <div className="header__logo">Wallet</div>
            <div className="header__links">
                <ul>
                    <NavLink to="/logout">Log Out</NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Header;
