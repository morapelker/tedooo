import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import shopApi from '../../api/shopApi';
import ImgWithLoader from "./ImgWithLoader";


const styles = () => ({
    root: {
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        marginLeft: 10,
        alignSelf: 'center'
    }, root2: {
        backgroundColor: 'white',
        color: '#3CBF95',
        cursor: 'pointer',
        marginLeft: 10,
        alignSelf: 'center'
    }
});

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '30vmin',
        marginTop: 10,
        maxWidth: 300,
        background: '#e6e6e6',
        cursor: 'pointer'
    },
    removeIcon: {
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#3CBF95',
        color: 'white',
        boxShadow: 'none',
        height: 40,
        width: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 5,
        alignSelf: 'center'
    },
    btnStyle: {
        width: '100%',
        minWidth: 0,
        height: 45,
        margin: 'auto'
    }
};

const capitalize = str => {
    return str.toUpperCase() || str;
};


class ShopLine extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            ratingLoading: false
        };
    }

    changeRating = rating => {
        if (!this.state.ratingLoading) {
            this.setState({ratingLoading: true});
            shopApi.changeRating(this.props.shop._id, rating, this.props.auth.token).then(() => {
                this.setState({ratingLoading: false});
            }).catch(() => {
                this.setState({ratingLoading: false});
            });
        }
    };

    render() {
        const text = (this.props.shop.favName || this.props.shop.name) + (this.props.shop.shop_number ? capitalize(this.props.shop.shop_number) : '');
        const avatarUrl = (this.props.shop.avatar ? this.props.shop.avatar : (
            this.props.shop.img_links && this.props.shop.img_links.length > 0 ? this.props.shop.img_links[0] : ''
        ));
        let height1, height2;

        if (this.props.shop.description && this.props.shop.description.length === 0) {
            height1 = 120;
            height2 = 0;
        } else {
            if (this.props.shop.category && this.props.shop.category.length === 0) {
                height1 = 0;
                height2 = 120;
            } else {
                height1 = 50;
                height2 = 70;
            }
        }

        return (
            <div style={style.container}
                 onClick={this.props.shopSelected(this.props.parentData, this.props.shop)}>
                <span style={{fontWeight: 'bold', paddingBottom: 5}}>{text}</span>
                <ImgWithLoader src={avatarUrl} style={{
                    width: '80%',
                    margin: '0 auto',
                    height: 150,
                    objectFit: 'cover'
                }}/>
                <span style={{
                    fontSize: '1.1em',
                    textAlign: 'left',
                    marginTop: 10,
                    paddingLeft: 5,
                    height: height1,
                    overFlow: 'hidden'
                }}>{this.props.shop.category}</span>
                <span style={{
                    textAlign: 'left',
                    marginTop: 10,
                    paddingLeft: 5,
                    width: '100%',
                    overflow: 'hidden',
                    height: height2
                }}>{this.props.shop.description}</span>
                <span style={{
                    textAlign: 'center',
                    fontSize: '1.1em',
                    fontWeight: 'bold',
                    marginTop: 10,
                    width: '100%',
                }}>{this.props.shop.city}</span>

            </div>
        );
    }
}

export default withStyles(styles)(ShopLine);