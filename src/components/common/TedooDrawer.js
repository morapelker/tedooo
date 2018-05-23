import React from 'react';
import {ListItem, ListItemText, List, IconButton, Drawer, Divider, Badge} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const TedooDrawer = props => {
    return (
        <Drawer open={props.open} onClose={props.closeMenu}>
            <div
                tabIndex={0}
                role="button"
                onClick={props.closeMenu}
                onKeyDown={props.closeMenu}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end'
                }}>
                    <h3 style={{flex: 1, marginLeft: 15}}>{props.title}</h3>
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {props.auth.token === '' ?
                        <ListItem button onClick={() => {
                            props.handleNavigation('/login')
                        }}>
                            <ListItemText primary="Login"/>
                        </ListItem> :
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <ListItem button onClick={() => {
                                props.logout();
                            }}>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                props.handleNavigation('/myshops')
                            }}>
                                <ListItemText primary="My Shops"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                props.handleNavigation('/addshop')
                            }}>
                                <ListItemText primary="Add Shop"/>
                            </ListItem>
                        </div>}
                    <ListItem button onClick={() => {
                        props.handleNavigation('/')
                    }}>
                        <ListItemText primary="Search"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        props.handleNavigation('/favorites')
                    }}>
                        <ListItemText primary="Favorites"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        props.handleNavigation('/history')
                    }}>
                        <ListItemText primary="History"/>
                    </ListItem>
                    {props.auth.admin === true && <div>
                        <Divider />
                        <h3 style={{marginTop: 5, color: 'red', marginLeft: 15}}>Admin</h3>
                        <ListItem button onClick={() => {
                            props.handleNavigation('/categories')
                        }}>
                            <ListItemText primary="Manage Categories"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            props.handleNavigation('/markets')
                        }}>
                            <ListItemText primary="Manage Markets"/>
                        </ListItem>
                        <Badge badgeContent={4} color="secondary">
                            <ListItem button onClick={() => {
                                props.handleNavigation('/pending')
                            }}>
                                <ListItemText primary="Pending Shops"/>
                            </ListItem>
                        </Badge>

                    </div>}
                </List>
                <Divider/>
            </div>
        </Drawer>
    );
};

export default TedooDrawer;