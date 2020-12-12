import * as React from 'react';
import { expenseType, userContext } from '../../store/context/userContext';
import Modal from '../modal/modal';
import Confirm from '../confirm/confirm';
import Triangle from '../svg/triangle.svg';
import Search from '../svg/search.svg';
import Plus from '../svg/plus.svg';
import Delete from '../svg/delete.svg';
import Edit from '../svg/edit.svg';
import axios from 'axios';

const List: React.FC<{ expenses: expenseType[] }> = ({ expenses }) => {
    const [addExpense, setAddExpense] = React.useState<boolean>(false);
    const [listCategory, setListCategory] = React.useState(false);
    const [listFrequency, setListFrequency] = React.useState(false);
    const [expenseList, setExpenseList] = React.useState<expenseType[]>();
    const [searchKey, setSearchKey] = React.useState<string>('Search');
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = React.useState(null);
    const [update, setUpdate] = React.useState<boolean>(false);
    const { state } = React.useContext(userContext);
    const [burger, setBurger] = React.useState<boolean>(false);
    React.useEffect(() => {
        setExpenseList(expenses);
    }, [expenses]);
    const closeModal = () => {
        setAddExpense(false);
        setUpdate(false);
    };
    const filterCategory = (e: React.MouseEvent<HTMLOptionElement>) => {
        if (e.currentTarget.value === 'none') {
            return setExpenseList(expenses);
        }
        const newlist = expenseList.filter((expense) => {
            return expense.category === e.currentTarget.value ? expense : null;
        });
        setExpenseList(newlist);
    };
    const filterFrequency = (e: React.MouseEvent<HTMLOptionElement>) => {
        if (e.currentTarget.value === 'none') {
            return setExpenseList(expenses);
        }
        const newList = expenseList.filter((expense) => {
            return expense.frequency === e.currentTarget.value ? expense : null;
        });
        setExpenseList(newList);
    };
    const filterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
        if (searchKey.length >= 2) {
            const newList = expenseList.filter((expense) => {
                return expense.name.includes(searchKey);
            });
            setExpenseList(newList);
        } else {
            setExpenseList(expenses);
        }
    };
    const deleteExpense = (expense?: any, token?: string): any => {
        axios
            .post(
                `http://localhost:8000/api/expense/delete/${expense._id}`,
                { id: expense._id },
                { headers: { 'x-auth-token': token } },
            )
            .then((res) => {
                console.log('deleted');
                console.log(res);
            })
            .catch((err) => console.log(err.response));
    };
    return (
        <div className="list">
            {addExpense && <Modal close={closeModal} mood="Add Expense" />}
            {update && (
                <Modal close={closeModal} mood="Update" dataFromParent={selectedExpense} id={selectedExpense._id} />
            )}
            {confirm && (
                <Confirm
                    question="Do you want to delete the expense ?"
                    close={() => {
                        setConfirm(false);
                    }}
                    funcToRun={() => deleteExpense(selectedExpense, state.user.token)}
                />
            )}
            <div className="list__header">
                <span>Expenses</span>

                <div className="list__header__buttons">
                    <div
                        onClick={() => {
                            setListCategory(!listCategory);
                        }}
                    >
                        <span>category</span>
                        <img src={Triangle} alt="dropdown_icon" />
                        {listCategory && (
                            <div className="list__header__dropdown">
                                <option value="none" onClick={filterCategory}>
                                    none
                                </option>
                                <option onClick={filterCategory} value="house">
                                    house
                                </option>
                                <option onClick={filterCategory} value="utilies">
                                    utilies
                                </option>
                                <option onClick={filterCategory} value="food">
                                    food
                                </option>
                                <option onClick={filterCategory} value="transportation">
                                    transportation
                                </option>
                                <option onClick={filterCategory} value="insurance">
                                    insurance
                                </option>
                                <option onClick={filterCategory} value="household">
                                    household items
                                </option>
                                <option onClick={filterCategory} value="entertainment">
                                    entertainment
                                </option>
                                <option onClick={filterCategory} value="other">
                                    other
                                </option>
                            </div>
                        )}
                    </div>

                    <div
                        onClick={() => {
                            setListFrequency(!listFrequency);
                        }}
                    >
                        <span>frequency</span>
                        <img src={Triangle} alt="dropdown_icon" />
                        {listFrequency && (
                            <div className="list__header__dropdown">
                                <option value="none" onClick={filterFrequency}>
                                    none
                                </option>
                                <option value="once" onClick={filterFrequency}>
                                    once
                                </option>
                                <option value="weekly" onClick={filterFrequency}>
                                    weekly
                                </option>
                                <option value="monthly" onClick={filterFrequency}>
                                    monthly
                                </option>
                                <option value="yearly" onClick={filterFrequency}>
                                    yearly
                                </option>
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="search"
                            value={searchKey}
                            onFocus={() => {
                                setSearchKey('');
                            }}
                            onChange={filterByName}
                            onMouseLeave={() => {
                                setSearchKey('search');
                            }}
                        />
                        <img src={Search} alt="search_icon" id="search" />
                    </div>
                </div>
                <div
                    className="list__header__add"
                    onClick={() => {
                        setAddExpense(true);
                    }}
                >
                    <img src={Plus} alt="plus_icon" />
                    Add Expense
                </div>
            </div>
            <div className="list__main">
                {expenseList &&
                    expenseList.map((expense) => {
                        return (
                            <div key={expense.id}>
                                <span>date</span>
                                <span>{expense.date}</span>
                                <span>name</span>
                                <span>{expense.name}</span>
                                <span>category</span>
                                <span>{expense.category}</span>
                                <span>price</span>
                                <span>{expense.price}</span>
                                <span>frequency</span>
                                <span>{expense.frequency}</span>
                                <div className="expense__buttons">
                                    <img
                                        src={Delete}
                                        alt="delete_icon"
                                        onClick={() => {
                                            setSelectedExpense(expense);
                                            setConfirm(true);
                                        }}
                                    />
                                    <img
                                        src={Edit}
                                        alt="edit_icon"
                                        onClick={() => {
                                            setSelectedExpense(expense);
                                            setUpdate(true);
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
