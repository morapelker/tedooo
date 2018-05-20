import React from 'react';
import ShopLine from "./ShopLine";

const style = {
    width: '60%',
    margin: '0 auto',
    marginTop: '20px'
};

const GenericShopsPage = (props) => {
    return (
        <div style={style}>
            <p/>
            <h1>{props.name}</h1>
            <p/>
            {props.shops.map((result, index) => (
                <div key={index}>
                    <ShopLine deleteMethod={props.deleteMethod} shopSelected={props.shopSelected}
                              shop={result}/>
                    <br/>
                </div>

            ))}
        </div>
    );
};

export default GenericShopsPage;