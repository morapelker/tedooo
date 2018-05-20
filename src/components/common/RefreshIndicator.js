import React from 'react';
import RefreshIndicator2 from "material-ui/RefreshIndicator";

const style = {
    backgroundColor: 'white',
    display: 'inline-block',
    position: 'relative',
    margin: '0 auto'
};

const RefreshIndicator = (props) => {
    return (
        <RefreshIndicator2
            size={50}
            left={0}
            top={0}
            loadingColor="#3CBF95"
            status="loading"
            style={Object.assign({}, style, props.style)}
        />
    );
};

export default RefreshIndicator;