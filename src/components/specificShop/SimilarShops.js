import React, {useEffect, useState} from 'react';
import ShopLine from "../common/ShopLine";
import ShopApi from "../../api/shopApi";
import RefreshIndicator from "../common/RefreshIndicator";

const SimilarShops = ({text, historyAction, history, currentId}) => {

    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    const shopClicked = index => () => () => {
        if (shops.length > index) {
            historyAction(shops[index]);
            history.push('/results/' + shops[index]._id);
        }
    };

    useEffect(() => {
        setLoading(true);
        ShopApi.getSimilarShops(text).then(res => {
            if (Array.isArray(res))
                setShops(res.filter(item => item._id !== currentId));
        }).finally(() => {
            setLoading(false);
        });
    }, [text]);

    return (
        <div style={{flex: 1, flexDirection: 'column', marginTop: 30, minHeight: 500}}>
            <h4 style={{visibility: loading ? 'hidden' : ''}}>Customers who viewed this also viewed</h4>
            {loading ? <RefreshIndicator/> :
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {shops.map((item, index) => <ShopLine className={'similar_root'}
                                                          shopSelected={shopClicked(index)}
                                                          key={index}
                                                          shop={item}/>)}
                    {[1, 1, 1, 1, 1].map((item, index) => <div key={index}
                                                               style={{height: 0, width: 200}}/>)}
                </div>}
        </div>
    );
};

export default SimilarShops;