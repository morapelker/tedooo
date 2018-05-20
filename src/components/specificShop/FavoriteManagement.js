import React, {Component} from 'react';
import {Input} from "reactstrap";
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import Button from "@material-ui/core/Button/Button";
import './SpecificShop.css'
import SubmitButton from "../common/SubmitButton";

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        flexDirection: 'column',
        width: '80%',
        height: '20%'
    }
};

class FavoriteManagement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: props.name,
            addingToFavorites: false
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
        console.log('submit', this.state.name);
        this.props.addFavoritesAction(this.props.shop._id, this.props.shop.name, this.state.name);
        this.setState({addingToFavorites: false})
    }

    closeFavoritesWindow() {
        this.setState({addingToFavorites: false, name: this.props.name})
    }

    openFavoritesWindow() {
        this.setState({addingToFavorites: true})
    }

    render() {
        return (
            <div style={styles.root}>
                <p/>
                <Button id={'addToFavoritesButton'} variant={'raised'} color={'primary'}
                        onClick={this.openFavoritesWindow}>Add
                    to favorites</Button>
                <p/>
                {this.state.addingToFavorites &&
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Input style={{width: '60%'}}
                           onChange={this.txtChanged}
                           placeholder='Name' value={this.state.name}/>
                    <Button variant={'fab'} id={'favRemoveButton'} color={'secondary'}
                            onClick={this.closeFavoritesWindow}>
                        <RemoveIcon/>
                    </Button>
                    <SubmitButton style={{
                        marginLeft: 10
                    }} id={'favAddButton'} submit={this.submit}/>
                </div>}

            </div>
        );
    }
}

export default FavoriteManagement;