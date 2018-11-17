import React from 'react';
import Button from "@material-ui/core/Button/Button";
import ReactTooltip from 'react-tooltip'

const TipView = (props) => {
    return (
        <div style={props.style}>
            <Button style={{width: '100%', height: '100%', backgroundColor: props.color}} className={'btnSubmit'}
                    variant={'fab'}>
                <img src={props.imageSource} alt='' id='tipImg'/>
            </Button>
            <ReactTooltip globalEventOff='click' place='left' type={props.type} effect='solid' />
        </div>
    );
};

export default TipView;