import React, {Component} from 'react';
import Collapse from "@material-ui/core/Collapse/Collapse";
import Button from "@material-ui/core/Button/Button";
import CartIcon from '@material-ui/icons/ShoppingCart';
import {Badge} from "@material-ui/core/index";
import {MenuItem, MenuList} from "@material-ui/core/es/index";
import './SpecificShop.css'
import ImgWithLoader from "../common/ImgWithLoader";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  badge: {
      backgroundColor: 'red',
      position: 'absolute',
      left: 0,
      top: 0
  }
};

class CartControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        let badgeNumber = 0;
        const actualTransactions = [];
        this.props.transactions.forEach(transaction => {
            if (!transaction.used) {
                badgeNumber++;
                const index = actualTransactions.map(t => t.img).indexOf(transaction.img);
                if (index === -1)
                    actualTransactions.push(Object.assign({}, transaction, {count: 1}));
                else
                    actualTransactions[index].count++;
            }
        });
        actualTransactions.sort((a,b) => {
            if (a.name > b.name)
                return -1;
            else if (b.name > a.name)
                return 1;
            return 0;
        });
        return (
            <div style={{
                minHeight: 50,
                right: 100,
                top: 30,
                position: 'fixed',
                zIndex: 999
            }}>
                <Badge color="secondary" badgeContent={badgeNumber}>
                    <Button onClick={this.toggleOpen} variant={'fab'} mini style={{
                        backgroundColor: 'white',
                        height: 50,
                        width: 50,
                        margin: '0 auto'
                    }}>
                        <CartIcon/>
                    </Button>
                </Badge>
                <Collapse in={this.state.open}>
                    <div id={'cartScroll'} style={{
                        backgroundColor: 'white',
                        height: 200,
                        overflowY: 'auto',
                        marginTop: 10,
                        width: 300,
                        borderRadius: 10,
                    }}>
                        <MenuList>
                            {actualTransactions.map((item, index) => (
                                !item.used &&
                                (item.count > 1 ? <Badge key={index} classes={{
                                        badge: this.props.classes.badge
                                    }}  color="secondary" badgeContent={item.count}>
                                    <MenuItem onClick={() => {
                                        this.props.selector(item);
                                    }} key={index}>
                                        <div style={{display: 'flex'}}>
                                            <ImgWithLoader style={{
                                                height: 40,
                                                width: 40,
                                                objectFit: 'contain'
                                            }} src={item.img} alt={''}/>
                                            <span style={{
                                                flex: 1,
                                                marginRight: 10,
                                                marginLeft: 10
                                            }}>{item.name}</span>
                                        </div>
                                    </MenuItem>
                                </Badge> :
                                    <MenuItem onClick={() => {
                                        this.props.selector(item);
                                    }} key={index}>
                                        <div style={{display: 'flex'}}>
                                            <ImgWithLoader style={{
                                                height: 40,
                                                width: 40,
                                                objectFit: 'contain'
                                            }} src={item.img} alt={''}/>
                                            <span style={{
                                                flex: 1,
                                                marginRight: 10,
                                                marginLeft: 10
                                            }}>{item.name}</span>
                                        </div>
                                    </MenuItem>)
                            ))}
                        </MenuList>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(CartControl);