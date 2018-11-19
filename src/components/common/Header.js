import React from 'react';
import {bgColor} from "../../api/apiConstants";
import './header.css';

const Header = () => {
    return (
        <div style={{borderBottom: '1px solid #c3c3c3', width: '100%', height: 200, background: 'white', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '100%', flex: 1, background: 'red'}} />
            <div style={{width: '100%', flex: 1, display: 'flex'}}>
                <div className={'logo_parent'} style={{background: bgColor}} />
                <div className={'search_parent'} style={{background: 'red'}} />
                <div className={'action_parent'} style={{background: 'blue'}} />
            </div>
        </div>
    );
};

export default Header;