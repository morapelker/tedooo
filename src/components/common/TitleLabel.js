import React from 'react';

const TitleLabel = (props) => {
    return (
        <div>
            <h1 className={'titleLabel'}>{props.text}</h1>
        </div>

    );
};

export default TitleLabel;