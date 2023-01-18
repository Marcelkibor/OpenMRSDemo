import React from 'react';

const Button = (props) => {
    const { size, backgroundColor,color, radius, noOutline ,onClick } = props;
    const outline = noOutline ? 'none' : 'initial';

    return (
        <button style={{ fontSize: size, backgroundColor: backgroundColor, color:color, borderRadius:radius, outline:outline}} onClick={onClick}>
            {props.children}
        </button>
    );
}

export default Button;