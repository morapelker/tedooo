import React, {useState} from 'react';
import ShopApi from "../../api/shopApi";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {CircularProgress} from "material-ui";
import TedooButton from "../common/TedooButton";
import {bgColor} from "../../api/apiConstants";

const ClaimWindow = ({shopId, linkId, auth}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [claimed, setClaimed] = useState(false);

    const claim = () => {
        setLoading(true);
        setError(false);
        ShopApi.claimShop(shopId,
            linkId,
            auth.userId,
            auth.token)
            .then(() => {
                setClaimed(true);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to claim shop');
                setLoading(false);
            })
    };

    return (
        auth.token.length > 0 ?
            <div style={{flexDirection: 'column', display: 'flex', width: 200, margin: '0 auto'}}>
                {claimed ? <h4 style={{marginTop: 20}}>Shop Claimed</h4> : <>
                    <h4 style={{marginTop: 20}}>Control Your shop</h4>
                    {loading ? <CircularProgress style={{margin: '0 auto'}}/> :
                        <TedooButton text={'My Shop'}
                                     selected={true}
                                     onClick={claim}
                                     selectedBackground={bgColor}
                                     selectedTextColor={'white'}/>}
                    {error && <h4 style={{color: 'red', marginTop: 10}}>{error}</h4>}
                </>}
            </div> : <div>
                Login/Register
            </div>
    );
};

function mapStateToProps(state) {
    return {
        auth: state.saved.authentication
    };
}

export default withRouter(connect(mapStateToProps)(ClaimWindow));