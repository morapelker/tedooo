import React from 'react';
import Button from "@material-ui/core/Button/Button";
import Img from 'react-image'
import './commonCss.css'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import white from '@material-ui/core/colors/grey';

const styles = () => ({
    cssRoot: {
        backgroundColor: white[50],
        '&:hover': {
            backgroundColor: white[400],
        },
        alignSelf: 'center'
    }
});

const SubmitButton = (props) => {
    const { classes } = props;
    const imgSrc = '/assets/' + (props.image || 'check') + '.png';
    return (
        <Button disabled={props.disabled}
                variant='fab'
                color="primary"
                className={classNames(classes.margin, classes.cssRoot)}
                onClick={props.submit}
                style={Object.assign({},props.style, {
                    boxShadow: 'none'
                })}
                mini={true}>
            <Img style={{
                maxWidth: '100%',
                maxHeight: '100%'
            }} src={imgSrc}/>
        </Button>
    );
};

export default withStyles(styles)(SubmitButton);