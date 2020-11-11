import * as React from 'react';
import { expenseType } from '../../store/context/userContext';
import Modal from '../modal/modal';
import Triangle from '../svg/triangle.svg';
import Search from '../svg/search.svg';
import Plus from '../svg/plus.svg';

const List: React.FC<{ expenses: expenseType[] }> = ({ expenses }) => {
    const [addExpense, setAddExpense] = React.useState<boolean>(false);
    const [listCategory, setListCategory] = React.useState(false);
    const [listFrequency, setListFrequency] = React.useState(false);
    const [expenseList, setExpenseList] = React.useState<expenseType[]>();

    React.useEffect(() => {
        setExpenseList(expenses);
    }, [expenses]);
    const closeModal = () => {
        setAddExpense(false);
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
    return (
        <div className="list">
            {addExpense && <Modal close={closeModal} mood="" />}
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
                        <input type="text" name="search" value="search" />
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
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
