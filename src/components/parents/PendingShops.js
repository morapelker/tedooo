import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/shopActions'
import {bindActionCreators} from 'redux';
import GenericShopsPage from "../common/GenericShopsPage";
import RefreshIndicator from "../common/RefreshIndicator";

class PendingShops extends Component {
    constructor(props, context) {
        super(props, context);
        if (!props.shops.pendingShops) {
            this.state = {busy: true};
            props.actions.findShop({authorized: '0'}).then(() => {
                this.setState({busy: false});
            })
        } else
            this.state = {busy: false};
    }

    render() {
        return (
            <div>
                {this.props.auth.admin ?
                    <div>
                        {this.state.busy ? <RefreshIndicator/> :
                            <GenericShopsPage
                                history={this.props.history}
                                addHistoryAction={this.props.actions.addShopHistory}
                                name={'Pending Shops'}
                                shops={this.props.shops.pendingShops}/>}

                    </div>
                    :
                    <h1>Not Admin</h1>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.saved.authentication,
        shops: state.shops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingShops);