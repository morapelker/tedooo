import React from 'react';
import {bgColor} from "../../../api/apiConstants";

const LabelInput = props => {
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}>
            <span style={{
                fontSize: '1.2em',
            }}>{props.label}</span>
            <input value={props.value}
                   style={{
                       flex: 1,
                       borderWidth: 1,
                       borderRadius: 10,
                       height: 30,
                       fontSize: '1.3em',
                       color: bgColor,
                       marginLeft: 10,
                       paddingLeft: 10
                   }}
                   onChange={props.onChange}
            />
        </div>
    );
};

export default LabelInput;