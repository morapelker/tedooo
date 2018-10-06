import React from 'react';
import Pagination from "react-js-pagination";
import RefreshIndicator from "./RefreshIndicator";
import {connect} from "react-redux";
import '../common/commonCss.css';
import ShopLineV2 from "./ShopLineV2";

const shopSelected = (props, shop) => {
    return () => {
        props.history.push("/results/" + shop._id);
        props.addHistoryAction(shop);
    };

};

const MAX_SHOPS = 10;

const filterIrrelevant = line => {
    if (line.includes('  '))
        return filterIrrelevant(line.replace('  ', ' '));
    if (line.includes(','))
        return filterIrrelevant(line.replace(',', ' '));
    return line.trim();
};

const GenericShopsPage = (props) => {
    const words = props.text ? filterIrrelevant(props.text).split(' ').filter(item => item.length > 1) : undefined;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h3>{props.name}</h3>
            <div style={{
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly'
            }}>
                {props.shops && props.shops.length > 0 ? props.shops.map((result, index) => (
                    <div key={index}>
                        <ShopLineV2
                            words={words}
                            auth={props.auth}
                            deleteMethod={props.deleteMethod} parentData={props}
                            shopSelected={shopSelected}
                            shop={result}/>
                        <br/>
                    </div>
                )) : <h2>No shops</h2>}
                <p/>
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
            </div>
            {props.smallLoading && <RefreshIndicator/>}
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