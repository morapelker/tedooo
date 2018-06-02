import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/storeActions'
import StoreItem from "./StoreItem";

class StorePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [
                {
                    avatar: 'https://imgur.com/uFSFkCG.png',
                    label: 'Maneki neko - lucky cat moving hand -black',
                    color: '#9C9C9C',
                    opacity: 0.76
                },{
                    avatar: 'https://imgur.com/0heYZYu.png',
                    label: 'Maneki neko - lucky cat moving hand-silver',
                    color: '#F8E2F2',
                    opacity: 0.8
                },{
                    avatar: 'https://imgur.com/Ta5kJZT.png',
                    label: 'Maneki neko - lucky cat moving hand-pink',
                    color: '#F8E2F2',
                    opacity: 0.77
                },{
                    avatar: 'https://imgur.com/PfjOFEz.png',
                    label: 'Maneki neko - lucky cat moving hand-gold',
                    color: '#F8E2F2',
                    opacity: 0.83
                },{
                    avatar: 'https://imgur.com/LPYLC1J.png',
                    label: 'Maneki neko - lucky cat moving hand- white',
                    color: '#9C9C9C',
                    opacity: 0.8
                },{
                    avatar: 'https://imgur.com/YkeGtMB.png',
                    label: 'The lucky cat family- maneki neko-gold',
                    color: '#F8E2F2',
                    opacity: 0.83
                },{
                    avatar: 'https://imgur.com/xh5d9vN.png',
                    label: 'Pixiu- dragon for luck & success-gold',
                    color: '#F8E2F2',
                    opacity: 0.75
                },{
                    avatar: 'https://imgur.com/iGqqCsE.png',
                    label: 'Dragon for luck and honor- jade',
                    color: '#AED7A1',
                    opacity: 0.84
                },{
                    avatar: 'https://imgur.com/vQYJGQS.png',
                    label: 'Pixius family-dragon for luck &success-jade',
                    color: '#AED7A1',
                    opacity: 0.84
                },{
                    avatar: 'https://imgur.com/FylOg9z.png',
                    label: 'Handshake for make good business',
                    color: '#9C9C9C',
                    opacity: 0.87
                },{
                    avatar: 'https://imgur.com/qis536e.png',
                    label: 'Good luck frog',
                    color: '#AED7A1',
                    opacity: 0.82
                },{
                    avatar: 'https://imgur.com/omsYX3k.png',
                    label: 'Chinese coins tied with red ribbon for an abundance of wealth and money',
                    color: '#F8E2F2',
                    opacity: 0.84
                },{
                    avatar: 'https://imgur.com/1uyeyA0.png',
                    label: 'The famously lucky number -8 -red',
                    color: '#F8E2F2',
                    opacity: 0.58
                },{
                    avatar: 'https://imgur.com/iCuEOjL.png',
                    label: 'Jade stone for good luck - jade',
                    color: '#AED7A1',
                    opacity: 0.69
                }, {
                    avatar: 'https://imgur.com/bjaverp.png',
                    label: 'Buddha for wealth & success -jade',
                    color: '#AED7A1',
                    opacity: 0.84
                }
            ]
        };
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%', overflow: 'auto'
            }}>
                <p/>
                <h3>Store</h3>
                <p/>
                <div style={{width: '100%', display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around'}}>
                    {this.state.items.map((item, index) => <StoreItem size={300} key={index} item={item} />)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);