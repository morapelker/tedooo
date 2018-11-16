import React from 'react';
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    button: {
        backgroundColor: 'white',
        '&:focus': {
            backgroundColor: 'white',
        },
        padding: 5,
        width: 40,
        height: 40,
    },
    button2: {backgroundColor: 'white',
        '&:focus': {
            backgroundColor: 'white',
        },
        padding: 5,
        width: 40,
        height: 40,
        marginLeft: 70
    },
};

const TripNavigator = props => {
    return (
        <div style={{display: 'flex', margin: 'auto', width: 150}}>
            <Button disabled={!props.left} variant="fab" aria-label="s" className={props.classes.button} onClick={props.leftClicked}>
                <img src={'/assets/left.png'} alt={''} style={{width: '100%', height: '100%'}}/>
            </Button>

            <Button disabled={!props.right} variant="fab" aria-label="s"
                    className={props.classes.button2} onClick={props.rightClicked}>
                <img alt='' src={'/assets/right.png'} style={{width: '100%', height: '100%'}}/>
            </Button>

        </div>
    );
};

export default withStyles(styles)(TripNavigator);