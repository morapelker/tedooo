import React from 'react';
import {AppBar} from "material-ui";

const style = {
    bar: {
        backgroundColor: '#3CBF95',
        boxShadow: 'none',
        width: '5%'
    },
    dot: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 40
    },
    dotContainer: {
        display: 'flex',
        width: 310,
        marginTop: 10,
        margin: '0 auto',
        justifyContent: 'space-around'
    }

};

const Header = (props) => {
    return (
        <div style={{display: 'flex'}}>
            <AppBar
                onLeftIconButtonClick={props.menuClicked}
                style={style.bar}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <div style={{flexGrow: 1, marginRight: 100, marginTop: 10}}>
                <div style={style.dotContainer}>
                    <span style={style.dot} />
                    <span style={style.dot} />
                    <span style={style.dot} />
                </div>
            </div>
        </div>
    );
};

export default Header;