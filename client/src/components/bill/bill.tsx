import * as React from 'react';
import axios from 'axios';
import { userContext } from '../../store/context/userContext';

const Bill: React.FC = () => {
    const { state } = React.useContext(userContext);
    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = document.getElementById('file') as HTMLInputElement;
        console.log(file.files[0]);
    };
    const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const file = document.getElementById('file') as HTMLInputElement;
            const formData = new FormData();
            formData.append('file', file.files[0]);
            const savedFile = await axios.post('http://localhost:8000/bill/', formData).then((res) => res.data);
            const bills = [...state.user.bills] || [];
            bills.push(savedFile.filename);
            const updatedUser = await axios
                .post('http://localhost:8000/api/user/bill', {
                    id: state.user.id,
                    user: { bills: [...bills] },
                })
                .then((res) => res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bill">
            <div className="bill__form">
                <form encType="multipart/form-data" onSubmit={uploadFile}>
                    <label htmlFor="file">Chose a file</label>
                    <input type="file" id="file" onChange={upload} />
                    <button type="submit">Upload</button>
                </form>
            </div>
            <div className="bill__display"></div>
        </div>
    );
};

export default Bill;
