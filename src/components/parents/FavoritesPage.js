import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import {Dialog, FlatButton} from "material-ui";

class FavoritesPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dialogOpen: false,
            idToDelete: 0
        };

        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.deleteFavConfirmed = this.deleteFavConfirmed.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    render() {
        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeAlert}
            />,
            <FlatButton
                label="Remove"
                primary={true}
                onClick={this.deleteFavConfirmed}
            />,
        ];
        console.log(this.props.shops);
        return (
            <div>
                <GenericShopsPage
                    history={this.props.history}
                    addHistoryAction={this.props.actions.addShopHistory}
                    name={'Favorites'} deleteMethod={this.deleteFavorite}
                                  shops={this.props.shops}/>
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.closeAlert}
                >
                    Are you sure you want to remove this shop from your favorites?
                </Dialog>
            </div>

        );
    }

    deleteFavConfirmed() {
        this.props.actions.deleteFavoriteShop(this.state.idToDelete);
        this.closeAlert();
    }

    closeAlert() {
        this.setState({dialogOpen: false})
    }

    deleteFavorite(id) {
        this.setState({dialogOpen: true, idToDelete: id});
    }
}

function mapStateToProps(state) {
    return {
        shops: state.saved.local.favorites
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);