import React from 'react';
import ShopLine from "./ShopLine";

const style = {
    width: '40%',
    marginTop: '20px',
    margin: 'auto'
};

const shopSelected = (props, shop) => {
    return () => {
        props.history.push("/results/" + shop._id);
        props.addHistoryAction(shop);
    };

};

const GenericShopsPage = (props) => {
    return (
        <div style={style}>
            <p/>
            <h1>{props.name}</h1>
            <p/>
            {props.shops ? props.shops.map((result, index) => (
                <div key={index}>
                    <ShopLine deleteMethod={props.deleteMethod} parentData={props} shopSelected={shopSelected}
                              shop={result}/>
                    <br/>
                </div>

            )) : <h2>No pending shops</h2>};
        </div>
    );
};

export default GenericShopsPage;