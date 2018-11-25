import React from 'react';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CheckBox = ({checked, text, checkChanged}) => {
    return (
        <FormControlLabel control={
            <Checkbox color={"secondary"} onChange={checkChanged} checked={checked}/>}
                          label={text}/>

    );
};

export default CheckBox;