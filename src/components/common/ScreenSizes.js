import React from 'react';
import MediaQuery from 'react-responsive';

export const SmallScreen = ({children}) => {
    return (
        <MediaQuery maxWidth={850}>
            {children}
        </MediaQuery>
    );
};

export const LargeScreen = ({children}) => {
    return (
        <MediaQuery minWidth={850}>
            {children}
        </MediaQuery>
    );
};