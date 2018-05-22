import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import './SpecificShop.css'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@material-ui/core/index";
import {Input} from "reactstrap";
import TedooButton from "../common/TedooButton";

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        flexDirection: 'column',
        width: '80%',
        height: '5%'
    }
};

const shopNumber = str => {
    if (str.length === 0)
        return '';
    return ' (' + (str.toUpperCase() || str) + ')';
};

class FavoriteManagement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: props.shop.name + shopNumber(props.shop.shop_number),
            open: false
        };

        this.txtChanged = this.txtChanged.bind(this);
        this.submit = this.submit.bind(this);
        this.openFavoritesWindow = this.openFavoritesWindow.bind(this);
        this.closeFavoritesWindow = this.closeFavoritesWindow.bind(this);
    }

    txtChanged(e) {
        this.setState({name: e.target.value})
    }

    submit() {
        this.props.addFavoritesAction(this.props.shop._id, this.props.shop.name, this.state.name, this.props.shop.shop_number);
        this.setState({open: false})
    }

    closeFavoritesWindow() {
        this.setState({open: false})
    }

    openFavoritesWindow() {
        this.setState({open: true})
    }

    render() {
        return (
            <div style={styles.root}>
                <p/>
                <TedooButton style={{minWidth: 200}} id={'addToFavoritesButton'}
                             selected={true}
                             selectedTextColor={'#3CBF95'}
                             selectedBackground={'white'}
                             onClick={this.openFavoritesWindow} text={'Add to favorites'}/>
                <Dialog
                    open={this.state.open}
                    onClose={this.closeFavoritesWindow}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add to favorites</DialogTitle>
                    <DialogContent>
                        <Input onChange={this.txtChanged} value={this.state.name}
                               placeholder={'Name'}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeFavoritesWindow} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.submit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FavoriteManagement;