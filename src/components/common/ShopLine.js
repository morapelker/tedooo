import React, {Component} from 'react';
import TedooButton from "./TedooButton";
import Button from "@material-ui/core/Button/Button";
import Img from 'react-image'
import RefreshIndicator from "./RefreshIndicator";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import withStyles from "@material-ui/core/styles/withStyles";
import shopApi from '../../api/shopApi';
import stem from 'stem-porter';

const deleteHelper = (realFunc, id) => (
    () => {
        realFunc(id);
    }
);


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
        display: 'flex'
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

const doesFieldContainStemWord = (text, sWord) => {
    const arr = text.split(' ');
    return arr.some(item => {
        return stem(item).toLowerCase().includes(sWord);
    });
};

const stemLine = line => {
    return line.split(' ').reduce((total, value) => {
        if (value.length > 1)
            return total + stem(value).toLowerCase();
        return total;
    });
};

const missingWords = (shop, words) => {
    return words.filter(word => {
        const s = stem(word).toLowerCase();
        const w = word.toLowerCase();
        if (shop.description && (doesFieldContainStemWord(shop.description, s) ||
            shop.description.toLowerCase().includes(w)))
            return false;
        if (shop.category && (doesFieldContainStemWord(shop.category, s) ||
            shop.category.toLowerCase().includes(w)))
            return false;
        if (shop.keywords && (shop.keywords.some(kw => stemLine(kw).includes(s))))
            return false;
        if (shop.city && shop.city.toLowerCase().includes(w))
            return false;
        return !(shop.market_name && shop.market_name.toLowerCase().includes(w));

    });
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
        const text = (this.props.shop.favName || this.props.shop.name) + (this.props.shop.shop_number ? ' (' + capitalize(this.props.shop.shop_number) + ')' : '');
        const avatarUrl = (this.props.shop.avatar ? this.props.shop.avatar : (
            this.props.shop.img_links && this.props.shop.img_links.length > 0 ? this.props.shop.img_links[0] : ''
        ));
        const mWords = this.props.words ? missingWords(this.props.shop, this.props.words) : [];
        return (
            <div style={style.container}>
                {this.props.deleteMethod !== undefined ?
                    <Button style={style.removeIcon}
                            onClick={deleteHelper(this.props.deleteMethod, this.props.shop._id)}
                            variant={'fab'}
                            color={'inherit'}>
                        <img src={'assets/x.png'} alt={'delete'} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}/></Button>
                    : null}

                {avatarUrl.length > 0 &&
                <Img style={{
                    borderRadius: '50%',
                    width: 70,
                    height: 70,
                    objectFit: 'cover',
                    marginRight: 10,
                    marginLeft: 10,
                    alignSelf: 'center'
                }}
                     src={avatarUrl}
                     loader={<RefreshIndicator style={{
                         margin: '0 auto',
                         alignSelf: 'center',
                         marginLeft: 10,
                         marginRight: 10,
                     }} size={70}/>}
                />
                }

                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TedooButton
                        style={style.btnStyle}
                        selected={true}
                        selectedTextColor={'#3CBF95'}
                        selectedBackground={'white'}
                        onClick={this.props.shopSelected(this.props.parentData, this.props.shop)}
                        text={text}/>
                    <span style={{
                        color: '#0059b3',
                        alignSelf: 'flex-end',
                    }}>{mWords.length > 0 &&
                    <span>Missing: </span>} {mWords.length > 0 && mWords.map((item, index) =>
                        <span style={{
                            textDecoration: 'line-through',
                        }}
                              key={index}>{item} {index === mWords.length - 1 ? '' : ', '}</span>)}</span>
                </div>

                {this.props.auth.admin && false &&
                <div
                    style={{
                        display: 'flex',
                    }}>
                    <Button onClick={() => {
                        this.changeRating(-1);
                    }} mini variant="fab" color="inherit" aria-label="add" classes={{
                        root: this.props.classes.root
                    }}>
                        <RemoveIcon style={{
                            height: 25, width: 25
                        }}/>
                    </Button>

                    <Button onClick={() => {
                        this.changeRating(1);
                    }} mini variant="fab" color="inherit" aria-label="add" classes={{
                        root: this.props.classes.root2
                    }}>
                        <AddIcon style={{
                            height: 25, width: 25
                        }}/>
                    </Button>
                </div>}

                {this.state.ratingLoading && <RefreshIndicator style={{marginLeft: 10}}/>}
            </div>
        );
    }
}

export default withStyles(styles)(ShopLine);