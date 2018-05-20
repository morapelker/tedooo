import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Drawer, FlatButton, MenuItem} from "material-ui";
import * as actions from '../../actions/authenticationActions'
import {bindActionCreators} from 'redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, DialogTitle } from '@material-ui/core/';

class TedooDrawer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {open: false};
        this.logout = this.logout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    logout() {
        this.props.actions.logOut();
        this.handleClose();
        this.props.history.push('/');
    }

    handleOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.open}>
                    <FlatButton label="Close" onClick={this.props.closeMethod} primary={true}/>
                    {this.props.state.token === '' ?
                        <MenuItem onClick={this.props.navBarClicked('/login')}>Login</MenuItem> :
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <h3>{this.props.state.admin ? 'Hey boss ' : 'Welcome '} {this.props.state.firstName}</h3>
                            <MenuItem onClick={this.handleOpen}>Logout</MenuItem>
                            <MenuItem onClick={this.props.navBarClicked('/myshops')}>My Shops</MenuItem>
                            <MenuItem onClick={this.props.navBarClicked('/addshop')}>Add Shop</MenuItem>
                        </div>}
                    <MenuItem onClick={this.props.navBarClicked('/')}>Search</MenuItem>
                    <MenuItem onClick={this.props.navBarClicked('/favorites')}>Favorites</MenuItem>
                    <MenuItem onClick={this.props.navBarClicked('/history')}>History</MenuItem>
                </Drawer>
                <Dialog
                    open={this.state.open}
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

function mapStateToProps(state) {
    return {
        state: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TedooDrawer);