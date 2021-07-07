import React from 'react';
import './style.css';

export default function FillQuestion() {
    return (
        <div className="question">
            <h4>Fill in the Blank: </h4>
            <p>I <span role="textbox" contentEditable className="blankText" name="answer"></span> soccer</p>
            <p>I <span role="textbox" contentEditable className="blankText" name="answer"></span> soccer with <span role="textbox" contentEditable className="blankText" name="answer"></span></p>
        </div>
    )
}
