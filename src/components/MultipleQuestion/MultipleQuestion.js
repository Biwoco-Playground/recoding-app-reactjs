import React from 'react';
import './style.css';

export default function MultipleQuestion() {
    return (
        <div className="question">
            <h4>Multiple Choice: </h4>
            <ul className="answers">
                <li>
                    <label for="mc1">
                        <input type="checkbox" id="mc1" name="answer" value="incorrect" /> Incorrect
                    </label>
                </li>
                <li>
                    <label for="mc2">
                        <input type="checkbox" id="mc2" name="answer" value="correct" /> Correct
                    </label>
                </li>
            </ul>
        </div>
    )
}
