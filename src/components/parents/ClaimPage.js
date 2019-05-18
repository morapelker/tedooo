import React, {useState} from 'react';
import {connect} from 'react-redux';
import TedooButton from "../common/TedooButton";
import {Link} from "react-router-dom";
import {bgColor} from "../../api/apiConstants";
import {CircularProgress} from "material-ui";
import ShopApi from "../../api/shopApi";
import {withRouter} from "react-router";

const ClaimPage = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const claim = () => {
        setLoading(true);
        setError(false);
        ShopApi.claimShop(props.match.params.shopId,
            props.match.params.linkId,
            props.auth.userId,
            props.auth.token)
            .then(() => {
                props.history.push('/myshops');
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to claim shop');
                setLoading(false);
            })
    };

    return <div>
        {props.auth.token.length > 0 ?
            <div style={{flexDirection: 'column', display: 'flex', width: 200, margin: '0 auto'}}>
                <h4 style={{marginTop: 20}}>Claim Your shop</h4>
                {loading ? <CircularProgress style={{margin: '0 auto'}}/> :
                    <TedooButton text={'Claim'}
                                 selected={true}
                                 onClick={claim}
                                 selectedBackground={bgColor}
                                 selectedTextColor={'white'}/>}
                <Link to={'/results/' + props.match.params.shopId}
                      style={{width: '100%', marginTop: 10}}>
                    <TedooButton text={'Go to shop'} selected={true} style={{width: '100%'}}/>
                </Link>
                {error && <h4 style={{color: 'red', marginTop: 10}}>{error}</h4>}
            </div> : <div>
                Login/Register
            </div>}
    </div>
};

function mapStateToProps(state) {
    return {
        auth: state.saved.authentication
    };
}


export default withRouter(connect(mapStateToProps)(ClaimPage));