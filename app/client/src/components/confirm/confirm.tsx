import * as React from 'react';

type TypeConfirmProps = {
    data?: {};
    question: string;
    funcToRun: () => any;
    close: () => void;
};

const Confirm: React.FC<TypeConfirmProps> = ({ data, question, funcToRun, close }) => {
    const confirmHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        funcToRun();
        close();
    };
    const rejectHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        close();
    };

    return (
        <div className="confirm">
            <p>{question}</p>
            <div className="confirm__buttons">
                <button onClick={confirmHandler}>Yes</button>
                <button onClick={rejectHandler}>No</button>
            </div>
        </div>
    );
};

export default Confirm;
