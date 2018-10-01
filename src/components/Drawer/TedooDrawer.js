import React from 'react';
import {ListItem, ListItemText, List, Drawer} from "@material-ui/core";
import DrawerTitle from "./DrawerTitle";
import {withStyles} from '@material-ui/core/styles';
import {Divider} from "@material-ui/core/index";

const styles = {
    divider: {
        backgroundColor: '#3CBF95',
        opacity: 0.4,
        height: 3
    },
    primary: {
        color: '#3CBF95',
        opacity: 1,
        fontFamily: 'Skia, sans-serif',
        fontWeight: 'lighter'
    }
};

const TedooDrawer = props => {
    let data = [];
    data.push({text: 'Home', selector: props.handleNavigation, parameter: '/'});

    if (props.auth.token === '')
        data.push({text: 'Login', selector: props.handleNavigation, parameter: '/login'});

    data.push({text: 'Favorites', selector: props.handleNavigation, parameter: '/favorites'});

    if (props.auth.token !== ''){
        data.push({text: 'My Shops', selector: props.handleNavigation, parameter: '/myshops'});
        data.push({text: 'Add Shop', selector: props.handleNavigation, parameter: '/addshop'});
        data.push({text: 'Store', selector: props.handleNavigation, parameter: '/store'});
    }
    data.push({text: 'History', selector: props.handleNavigation, parameter: '/history'});

    if (props.auth.token !== '') {
        data.push({text: 'Account Settings', selector: props.handleNavigation, parameter: '/settings'});
    }
    data.push({text: 'About Us', selector: props.handleNavigation, parameter: '/about'});

    if (props.auth.token !== '') {
        data.push({text: 'Logout', selector: props.logout});
    }

    if (props.auth.admin === true) {
        data.push({
            text: 'Manage Markets',
            selector: props.handleNavigation,
            parameter: '/markets'
        });
        data.push({text: 'Pending Shops', selector: props.handleNavigation, parameter: '/pending'});
    }
    const { classes } = props;


    return (
        <Drawer open={props.open} onClose={props.closeMenu}>
            <div
                tabIndex={0}
                role="button"
                onClick={props.closeMenu}
                onKeyDown={props.closeMenu}
            >
                <DrawerTitle title={props.title}/>
                <List style={{paddingTop: 0}}>
                    {data.map((item, index) => {
                        if (item.parameter === '/markets') {
                            return <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                <h3 style={{color: 'red', textAlign: 'center', marginTop: 10}}>Admin actions</h3>
                                <ListItem button divider={false}  onClick={() => {
                                    item.selector(item.parameter);
                                }}>
                                    <ListItemText classes={{
                                        primary: classes.primary
                                    }} primary={item.text}/>
                                </ListItem>
                                <Divider style={styles.divider}/>
                            </div>
                        } else {
                            return <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                <ListItem divider={false} button onClick={() => {
                                    item.selector(item.parameter);
                                }}>
                                    <ListItemText classes={{
                                        primary: classes.primary
                                    }} primary={item.text}/>
                                </ListItem>
                                <Divider style={styles.divider}/>
                            </div>
                        }


                    })}
                </List>
            </div>
        </Drawer>
    );
};

export default withStyles(styles)(TedooDrawer);