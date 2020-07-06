import React from 'react';
import './Button.css';

function Button(props) {
    let classes = '';
    classes = 'Button ' + props.btnType
    return (
        <button
            className={classes}
            disabled={props.disabled}
            onClick={props.clicked}>
            {props.children}
        </button>
    )
}

export default Button
