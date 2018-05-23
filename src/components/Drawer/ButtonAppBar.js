import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: -12,
        marginTop: 5
    },
    dot: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 40
    },
    bar: {
        backgroundColor: '#3CBF95',
        boxShadow: 'none',
        height: '10%'
    },
    dotContainer: {
        display: 'flex',
        width: 310,
        marginTop: 10,
        margin: '0 auto',
        justifyContent: 'space-around'
    }
};

function ButtonAppBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" style={styles.bar}>
                <Toolbar>
                    <IconButton onClick={props.openMenu} className={classes.menuButton}
                                style={{alignSelf: 'flex-start'}} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <div style={{flex: 1, marginTop: 10, flexDirection: 'column'}}>
                        <div style={styles.dotContainer}>
                            <span style={styles.dot}/>
                            <span style={styles.dot}/>
                            <span style={styles.dot}/>
                        </div>
                        <h1 style={{marginTop: 5}}>Tedooo</h1>
                    </div>
                    <IconButton disabled={true} onClick={props.openMenu}
                                className={classes.menuButton} color="inherit" aria-label="Menu">
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
