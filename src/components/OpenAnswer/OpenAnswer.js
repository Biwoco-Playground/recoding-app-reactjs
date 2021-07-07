import React, { Fragment, useState } from 'react';
import './style.css';

export default function OpenAnswer() {
    const [mode, setMode] = useState(1);

    const renderQuestion = () => {
        if(mode == 1) {
            return(
                <textarea rows="10"></textarea>
            );
        }else{
            return(
                <Fragment>
                    <label for="uploadFile" className="uploadFile">Upload File</label>
                    <input type="file" name="uploadFile" id="uploadFile" />                    
                </Fragment>
            );
        }
    }

    const changeMode = (e) => {
        const {value} = e.target;

        setMode(value);
    }

    return (
        <div className="question">
            <h3>Open Answer: </h3>
            <select onChange={changeMode}>
                <option value="1">TextBox</option>
                <option value="2">Upload</option>
            </select>
            {renderQuestion()}
        </div>
    )
}
