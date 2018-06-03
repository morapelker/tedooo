import React, {Component} from 'react';
import Collapse from "@material-ui/core/Collapse/Collapse";
import Button from "@material-ui/core/Button/Button";
import CartIcon from '@material-ui/icons/ShoppingCart';
import {Badge} from "@material-ui/core/index";
import {MenuItem, MenuList} from "@material-ui/core/es/index";
import './SpecificShop.css'

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
        return (
            <div style={{
                minHeight: 50,
                right: 100,
                top: 30,
                position: 'fixed',
                zIndex: 999
            }}>
                <Badge color="secondary" badgeContent={this.props.transactions.length}>
                    <Button onClick={this.toggleOpen} variant={'fab'} mini style={{
                        backgroundColor: 'white',
                        height: 50,
                        width: 50,
                        margin: '0 auto'
                    }}>
                        <CartIcon />
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
                            {this.props.transactions.map((item, index) => (
                                <MenuItem onClick={()=>{
                                    this.props.selector(item);
                                }} key={index}>
                                    <div style={{display: 'flex'}}>
                                        <img style={{
                                            height: 40,
                                            width: 40,
                                            backgroundColor: 'red'
                                        }} alt={''} />
                                        <span style={{flex: 1, marginRight: 10, marginLeft: 10}}>{item.name}</span>
                                    </div>
                                </MenuItem>
                            ))}
                        </MenuList>

                    </div>
                </Collapse>
            </div>
        );
    }
}

export default CartControl;