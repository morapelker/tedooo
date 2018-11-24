import React from 'react';
import Pagination from "react-js-pagination";
import RefreshIndicator from "./RefreshIndicator";
import {connect} from "react-redux";
import '../common/commonCss.css';
import ShopLine from "./ShopLine";

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
        <div style={{width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className={'generic_shops_root'}>
                <h3 style={{textAlign: 'left', marginLeft: '10%', padding: '30px 0 10px 0'}}>{props.name}</h3>
                <div className={'shop_list'} style={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {props.shops && props.shops.length > 0 ? props.shops.map((result, index) => (
                        <ShopLine
                            words={words}
                            auth={props.auth}
                            key={index}
                            deleteMethod={props.deleteMethod} parentData={props}
                            shopSelected={shopSelected}
                            shop={result}/>
                    )) : <h2>No shops</h2>}
                    {[1,1,1,1,1,1,1,1,1].map((_, index) => <div className={'empty_grid_filler'} key={index} />)}
                </div>
                <div style={{height: 40}} />
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