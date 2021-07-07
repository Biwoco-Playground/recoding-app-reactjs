import React from 'react';
import './style.css';

export default function SingleQuestion() {
    return (
        <div className="question">
            <h4>Single Question: </h4>
            <ul className="answers">
                <li>
                    <label for="id1">
                        <input type="radio" id="id1" name="answer" value="incorrect" /> Incorrect
                    </label>
                </li>
                <li>
                    <label for="id2">
                        <input type="radio" id="id2" name="answer" value="correct" /> Correct
                    </label>
                </li>
            </ul>
        </div>
    )
}
