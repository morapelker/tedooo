import React from 'react';
import './commonCss.css';

const ProgressBar = ({progress}) => {
    return (
        <div className={'pbar_root'}>
            <div className={'pbar_filler'} style={{width: (progress ? progress + 1 : 0) + '%'}} />
        </div>
    );
};

export default ProgressBar;