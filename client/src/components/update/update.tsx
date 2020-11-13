import * as React from 'react';

const Update: React.FC<{ expense: { name: string } }> = (expense): JSX.Element => {
    const [data, setData] = React.useState(expense);

    return (
        <div className="update">
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name" value={data.expense.name} />
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
                <option value=""></option>
            </select>
        </div>
    );
};

export default Update;
