import React from 'react';
import './style.css';

export default function FreeQuestion() {
    return (
        <div className="question">
            <h4>Free Choice: </h4>
            <input type="text" name="answer" placeholder="Answer ..." />
        </div>
    )
}
