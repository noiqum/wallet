import * as React from 'react';
import axios from 'axios';
import { userContext } from '../../store/context/userContext';
import Header from '../header/header';

const Bill: React.FC = () => {
    const { state } = React.useContext(userContext);
    const [file, setFile] = React.useState<{ file: File; preview: string }>();
    const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = document.getElementById('file') as HTMLInputElement;
        setFile({ file: file.files[0], preview: URL.createObjectURL(file.files[0]) });
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
            <Header />
            <div className="bill__form">
                <form encType="multipart/form-data" onSubmit={uploadFile}>
                    <label htmlFor="file">
                        <span>Browse</span>
                    </label>
                    <input type="file" id="file" onChange={saveFile} />
                    <button type="submit">Upload</button>
                </form>
                <div className="bill__form__preview">
                    {file ? <img src={file.preview} alt="preview" /> : <div>Preview</div>}
                </div>
            </div>
            <div className="bill__display">
                <h3>Bills</h3>
                {state.user.bills &&
                    state.user.bills.map((bill, idx) => {
                        return (
                            <div key={idx}>
                                <img
                                    src={`http://localhost:8000/bill/${bill}`}
                                    alt="bill_image"
                                    width="250px"
                                    height="200px"
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Bill;
