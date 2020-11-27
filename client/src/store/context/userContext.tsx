import * as React from 'react';
import { useReducer } from 'react';
import { expenseReducer, expenseState } from '../reducer/expenseReducer';
import { userReducer } from '../reducer/userReducer';
type userType = {
    userName: string;
    id: string;
    email: string;
    token: string;
    bills?: string[];
};
export type expenseType = {
    name: string;
    price: number;
    date: string;
    id: string;
    user: string;
    frequency: string;
    category: string;
};
type initialStateType = {
    user: userType;
    expenses: expenseState;
};

type Props = {
    children: React.ReactNode;
};
const initialState: initialStateType = {
    user: {
        userName: 'default',
        id: '123456',
        email: 'test@test.com',
        token: null,
    },
    expenses: {
        expenses: [
            { price: 11, name: 'pc', date: '2020-11-10', id: '1', user: '11', frequency: 'once', category: 'utilies' },
        ],
    },
};

export const userContext = React.createContext<{ state: initialStateType; dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null,
});

const mainReducer = ({ user, expenses }: { user: userType; expenses: { expenses: expenseType[] } }, action: any) => ({
    user: userReducer(user, action),
    expenses: expenseReducer(expenses, action),
});

export const UserProvider: React.FC = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <userContext.Provider value={{ state, dispatch }}>{children}</userContext.Provider>;
};
