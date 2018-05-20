import React from 'react';
import {AppBar} from "material-ui";

const style = {
    backgroundColor: '#3CBF95'
};

const Header = (props) => {
    return (
        <div>
            <AppBar
                onLeftIconButtonClick={props.menuClicked}
                title="Tedooo"
                style={style}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        </div>
    );
};

export default Header;