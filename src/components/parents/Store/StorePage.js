import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/manager'
import * as transactionActions from '../../../actions/storeActions'
import StoreItem from "./StoreItem";
import RefreshIndicator from "../../common/RefreshIndicator";
import MessageBox from "../../common/MessageBox";

class StorePage extends Component {
    constructor(props, context) {
        super(props, context);
        if (!props.items) {
            this.state = {loading: true, buying: 0};
            props.actions.loadStoreItems().then(()=>{
                this.setState({loading: false})
            }).catch(() => {
                this.setState({loading: false, error: "Couldn't load shop"})
            })
        } else
            this.state = {loading: false, buying: 0};
    }

    buyItem = item => {
        const item2 = {
            name: item.label,
            img: item.avatar,
            used: false
        };
        this.setState({buying: 1});
        this.props.transactionActions.purchaseItem(item2, this.props.authentication.token).then(()=>{
            this.setState({buying: 2});
            setTimeout(()=>{
                this.setState({buying: 0});
            }, 2000);
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div style={{height: '100%', width: '100%', overflow: 'auto'
            }}>
                <p/>
                <h3>Store</h3>
                <p/>
                {this.state.loading ?
                    <RefreshIndicator style={{margin: '0 auto'}}/> :
                    <div style={{width: '100%', display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'}}>
                        {this.props.items && this.props.items.map((item, index) =>
                            <StoreItem
                                onClick={this.buyItem}
                                size={300} key={index} item={item} />)}
                    </div>}
                {this.state.error && <h3 color={'red'}>{this.state.error}</h3>}
                <MessageBox open={this.state.buying > 0} okText={''}
                            title={this.state.buying === 1 ? 'Buying Item..' : 'Item Bought'}
                            loading={this.state.buying} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.manager.items,
        authentication: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        transactionActions: bindActionCreators(transactionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);