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
import Button from "@material-ui/core/Button/Button";


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
        return (
            <div>
                <ButtonAppBar openMenu={this.openMenu} />
                <TedooDrawer logout={this.handleOpen} handleNavigation={this.handleNavigation} title={this.props.title} auth={this.props.auth} open={this.state.open} closeMenu={this.closeMenu} />
                <Dialog
                    open={this.state.logoutOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="raised">
                            Stay Logged in
                        </Button>
                        <Button onClick={this.logout} variant="raised" color={'primary'}>
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Header);