import React from 'react';
import ShopLine from "./ShopLine";
import Pagination from "react-js-pagination";
import RefreshIndicator from "./RefreshIndicator";
import {connect} from "react-redux";
import '../common/commonCss.css';

const style = {
    width: '40%',
    minWidth: 300,
    marginTop: '20px',
    margin: 'auto',
};

const shopSelected = (props, shop) => {
    return () => {
        props.history.push("/results/" + shop._id);
        props.addHistoryAction(shop);
    };

};

const MAX_SHOPS = 10;

const GenericShopsPage = (props) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll'
        }}>
            <div style={style}>
                <p/>
                <h3>{props.name}</h3>
                <p/>
                {props.shops && props.shops.length > 0 ? props.shops.map((result, index) => (
                    <div key={index}>
                        <ShopLine
                            auth={props.auth}
                            deleteMethod={props.deleteMethod} parentData={props}
                            shopSelected={shopSelected}
                            shop={result}/>
                        <br/>
                    </div>
                )) : <h2>No shops</h2>}
                {props.totalPages > MAX_SHOPS &&
                <Pagination
                    hideFirstLastPages={false}
                    activeLinkClass={'active'}
                    activePage={props.currentPage}
                    itemsCountPerPage={MAX_SHOPS}
                    totalItemsCount={props.totalPages}
                    pageRangeDisplayed={5}
                    onChange={props.pageChangeSelector}
                />
                }
                <p/>
                {props.smallLoading && <RefreshIndicator/>}
            </div>
        </div>
    );
};


function mapStateToProps(state) {
    return {
        auth: state.saved.authentication,
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericShopsPage);