import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ListItem, ListItemText} from "@material-ui/core/index";
import {withRouter} from "react-router-dom";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core/index";
import Button from "@material-ui/core/Button/Button";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        boxShadow: 'none',
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#3CBF95'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        marginTop: 50,
        flexGrow: 1,
        backgroundColor: '#3CBF95',
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});



class TopBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {logoutOpen: false, open: false, anchor: 'left'};
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleNavigation = url => {
        this.props.history.push(url);
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
        const {open} = this.state;
        const title = (this.props.auth.token === '' ? 'Tedooo' : ((this.props.auth.admin ? 'Hey boss ' : 'Welcome ') + this.props.auth.firstName));
        const drawer = (
            <Drawer
                variant="persistent"
                anchor={'left'}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end'
                }}>
                    <h3 style={{flexGrow: 1}}>{title}</h3>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {this.props.auth.token === '' ?
                        <ListItem button onClick={() => {
                            this.handleNavigation('/login')
                        }}>
                            <ListItemText primary="Login"/>
                        </ListItem> :
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <ListItem button onClick={() => {
                                this.handleOpen()
                            }}>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                this.handleNavigation('/myshops')
                            }}>
                                <ListItemText primary="My Shops"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                this.handleNavigation('/addshop')
                            }}>
                                <ListItemText primary="Add Shop"/>
                            </ListItem>
                        </div>}
                    <ListItem button onClick={() => {
                        this.handleNavigation('/')
                    }}>
                        <ListItemText primary="Search"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        this.handleNavigation('/favorites')
                    }}>
                        <ListItemText primary="Favorites"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        this.handleNavigation('/history')
                    }}>
                        <ListItemText primary="History"/>
                    </ListItem>
                    {this.props.auth.admin === true && <div>
                        <Divider />
                        <h3 style={{marginTop: 5, color: 'red'}}>Admin</h3>
                        <ListItem button onClick={() => {
                            this.handleNavigation('/categories')
                        }}>
                            <ListItemText primary="Manage Categories"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            this.handleNavigation('/markets')
                        }}>
                            <ListItemText primary="Manage Markets"/>
                        </ListItem>
                    </div>}
                </List>
                <Divider/>
            </Drawer>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-left`]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main style={{marginTop: 100}}
                        className={classNames(classes.content, classes[`content-left`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-left`]]: open,
                        })}
                    >
                        {this.props.children}
                    </main>
                </div>
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

export default withRouter(withStyles(styles, {withTheme: true})(TopBar));
