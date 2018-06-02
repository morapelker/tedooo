import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/manager'
import StoreItem from "./StoreItem";
import RefreshIndicator from "../../common/RefreshIndicator";

class StorePage extends Component {
    constructor(props, context) {
        super(props, context);
        if (!props.items) {
            this.state = {loading: true};
            props.actions.loadStoreItems().then(()=>{
                this.setState({loading: false})
            }).catch(() => {
                this.setState({loading: false, error: "Couldn't load shop"})
            })
        } else
            this.state = {loading: false};

    }

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
                        {this.props.items && this.props.items.map((item, index) => <StoreItem size={300} key={index} item={item} />)}
                    </div>}
                {this.state.error && <h3 color={'red'}>{this.state.error}</h3>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.manager.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);