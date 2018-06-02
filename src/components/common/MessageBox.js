import React from 'react';
import {Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@material-ui/core/index";
import TedooButton from "./TedooButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    paper: {
        borderRadius: 20
    },
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none',
        width: 150,
        height: 40,
        margin: 'auto'
    },
    rootActions: {
        marginBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
    },
    rootContent: {
        paddingBottom: 10,
    },dialogLabel: {
        textAlign: 'center',
        fontSize: '1.2em',
        color: '#3CBF95',
        fontFamily: 'Skia'
    }
};

const MessageBox = props => {
    const classes = props.classes;
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{
                paper: classes.paper,
            }}
        >
            <DialogTitle id="form-dialog-title" disableTypography={true}><h4 style={{
                textAlign: 'center',
                width: '100%',
                color: '#3CBF95',
                fontWeight: 'bold'
            }}>{props.title}</h4></DialogTitle>
            <DialogContent classes={{
                root: classes.rootContent
            }}>
                <DialogContentText classes={{
                    root: classes.dialogLabel
                }} id="alert-dialog-description">
                    {props.label}
                </DialogContentText>
            </DialogContent>
            <DialogActions classes={{
                root: classes.rootActions
            }}>
                {props.cancelText &&
                <TedooButton style={styles.button} selected={true}
                             selectedTextColor={'white'}
                             selectedBackground={'#3CBF95'}
                             onClick={props.onClose}
                                                  text={props.cancelText || 'Cancel'}
                />}
                <TedooButton style={styles.button} selected={true}
                             selectedTextColor={'#3CBF95'}
                             selectedBackground={'white'}
                             onClick={props.onOk}
                             text={props.okText || 'Ok'}
                />
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(MessageBox);