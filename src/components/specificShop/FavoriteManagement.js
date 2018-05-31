import React, {Component} from 'react';
import './SpecificShop.css'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@material-ui/core/index";
import {Input} from "reactstrap";
import TedooButton from "../common/TedooButton";
import withStyles from "@material-ui/core/styles/withStyles";

const shopNumber = str => {
    if (str.length === 0)
        return '';
    return ' (' + (str.toUpperCase() || str) + ')';
};

const styles = {
    paper: {
        borderRadius: 20
    },
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none',
        width: 150,
        height: 40,
        marginLeft: 10,
        marginRight: 10
    },
    rootActions: {
        marginBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
    },
    rootContent: {
        paddingBottom: 10,
    }
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
        const avatar = this.props.shop.avatar ? this.props.shop.avatar : (
            this.props.shop.img_links && this.props.shop.img_links.length > 0 ? this.props.shop.img_links[0] : ''
        );
        this.props.addFavoritesAction(this.props.shop._id, this.props.shop.name, this.state.name, avatar);
        this.setState({open: false})
    }

    closeFavoritesWindow() {
        this.setState({open: false})
    }

    openFavoritesWindow() {
        this.setState({open: true})
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={this.props.style}>
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
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <DialogTitle id="form-dialog-title" disableTypography={true}><h4 style={{
                        textAlign: 'center',
                        width: '100%',
                        color: '#3CBF95'
                    }}>Add to favorites</h4></DialogTitle>
                    <DialogContent classes={{
                        root: classes.rootContent
                    }}>
                        <Input style={{
                            borderRadius: 10,
                        }} onChange={this.txtChanged} value={this.state.name}
                               placeholder={'Name'}/>
                    </DialogContent>
                    <DialogActions classes={{
                        root: classes.rootActions
                    }}>
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'white'}
                                     selectedBackground={'#3CBF95'}
                                     onClick={this.closeFavoritesWindow}
                                     text={'Cancel'}
                        />
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'#3CBF95'}
                                     selectedBackground={'white'}
                                     onClick={this.submit}
                                     text={'Add'}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FavoriteManagement);