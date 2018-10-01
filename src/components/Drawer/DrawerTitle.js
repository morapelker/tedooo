import React from 'react';
import {IconButton} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = {
    dot: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 40
    },
    dotContainer: {
        display: 'flex',
        flex: 1,
        width: 310,
        marginTop: 10,
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
};

const DrawerTitle = (props) => {
    return (
        <div style={{
            display: 'flex',
            backgroundColor: '#3CBF95',
            flexDirection: 'column',
            opacity: 0.8,
            height: 140
        }}>
            <div style={{display: 'flex'}}>
                <h3 style={{
                    flex: 1,
                    color: 'white',
                    marginTop: 10,
                    textAlign: 'center',
                    marginRight: 2,
                    marginLeft: 50
                }}>{props.title}</h3>
                <IconButton>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <div style={{flex: 1, flexDirection: 'column', display: 'flex'}}>
                <div style={styles.dotContainer}>
                    <span style={styles.dot}/>
                    <span style={styles.dot}/>
                    <span style={styles.dot}/>
                </div>
            </div>

        </div>
    );
};

export default DrawerTitle;