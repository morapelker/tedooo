import React, {Component} from 'react';
import ButtonAppBar from "./ButtonAppBar";
import TedooDrawer from "./TedooDrawer";
import {withRouter} from "react-router-dom";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import TedooButton from "../common/TedooButton";

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
        marginLeft: 10,
        marginRight: 10
    },
    rootActions: {
        marginBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
    },
    rootContent: {
        paddingBottom: 10,
    }, dialogLabel: {
        textAlign: 'center',
        fontSize: '1.2em',
        color: '#3CBF95',
        fontFamily: 'Skia'
    }
};

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {open: false, logoutOpen: false};
    }

    handleNavigation = url => {
        this.props.history.push(url);
    };

    openMenu = () => {
        this.setState({open: true});
    };

    closeMenu = () => {
        this.setState({open: false});
    };

    logout = () => {
        this.props.logOut();
        this.handleClose();
        this.props.history.push('/');
    };

    handleOpen = () => {
        this.setState({logoutOpen: true})
    };

    handleClose = () => {
        this.setState({logoutOpen: false})
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <ButtonAppBar history={this.props.history} openMenu={this.openMenu}/>
                <TedooDrawer pendingCount={this.props.pendingCount}
                             logout={this.handleOpen} handleNavigation={this.handleNavigation}
                             title={this.props.title} auth={this.props.auth} open={this.state.open}
                             closeMenu={this.closeMenu}/>
                <Dialog
                    open={this.state.logoutOpen}
                    onClose={this.handleClose}
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
                    }}>Logout</h4></DialogTitle>
                    <DialogContent classes={{
                        root: classes.rootContent
                    }}>
                        <DialogContentText classes={{
                            root: classes.dialogLabel
                        }} id="alert-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions classes={{
                        root: classes.rootActions
                    }}>
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'white'}
                                     selectedBackground={'#3CBF95'}
                                     onClick={this.handleClose}
                                     text={'Stay logged in'}
                        />
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'#3CBF95'}
                                     selectedBackground={'white'}
                                     onClick={this.logout}
                                     text={'Logout'}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Header));