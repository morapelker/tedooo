import React from 'react';
import Button from "@material-ui/core/Button/Button";
import Img from 'react-image'
import './commonCss.css'

const SubmitButton = (props) => {
    return (
        <Button style={props.style} className={'btnSubmit'} color={"inherit"}
                variant='fab'
                onClick={props.submit}
                mini={true}>
            <Img style={{
                maxWidth: '100%',
                maxHeight: '100%'
            }} src='/assets/check.png'/>
        </Button>
    );
};

export default SubmitButton;