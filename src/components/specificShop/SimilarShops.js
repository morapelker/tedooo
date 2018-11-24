import React, {useEffect, useState} from 'react';
import ShopLine from "../common/ShopLine";
import ShopApi from "../../api/shopApi";
import RefreshIndicator from "../common/RefreshIndicator";

export const cancellablePromise = promise => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) => {
                if (!hasCanceled_)
                    resolve(val)
            }
        );
        promise.catch(error => {
                if (!hasCanceled_)
                    reject(error);
            }
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

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
        const t = text;
        const a = cancellablePromise(ShopApi.getSimilarShops(text));
        a.promise.then(res => {
            if (t === text && loading) {
                if (Array.isArray(res))
                    setShops(res.filter(item => item._id !== currentId));
            }
        }).finally(() => {
            setLoading(false);
        });
        return () => {
            a.cancel();
        };
    }, [text]);

    return (
        <div style={{flex: 1, flexDirection: 'column', marginTop: 30, minHeight: 500}}>
            <h4 style={{
                visibility: loading ? 'hidden' : '',
                fontWeight: 'bold',
                marginTop: 50
            }}>Customers who
                viewed this also viewed</h4>
            {loading ? <RefreshIndicator/> :
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: 40
                }}>
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