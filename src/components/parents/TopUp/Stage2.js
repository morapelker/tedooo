import React, {Component} from 'react';
import {bgColor} from "../../../api/apiConstants";
import Collapse from "@material-ui/core/Collapse/Collapse";
import TedooButton from "../../common/TedooButton";

class Stage2 extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            wechatId: props.wechatId,
            neverEnteredWeChat: props.wechatId === '',
            neverEnteredMoney: props.money === '',
            money: props.money
        };
    }

    render() {
        const money = parseFloat(this.state.money) || 0;
        const stage2Invalid = this.state.wechatId === '' || money < 1;
        return (
            <div style={{
                width: '90%',
                height: 500,
                maxWidth: 600,
                margin: 'auto',
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                <h3 style={{
                    color: 'black',
                    marginTop: 40,
                    textAlign: 'start',
                    marginLeft: 10
                }}>{this.props.topUp ? 'My ' : 'Recipient '}WeChat
                    ID</h3>
                <input value={this.state.wechatId}
                       style={{
                           width: '100%',
                           borderWidth: 1,
                           borderRadius: 10,
                           height: 60,
                           color: bgColor,
                           fontSize: '2em',
                           textAlign: 'center'
                       }}
                       onChange={e => {
                           this.setState({wechatId: e.target.value, neverEnteredWeChat: false});
                       }}/>
                <p/>
                <Collapse in={!this.state.neverEnteredWeChat} style={{width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{
                            color: 'black',
                            textAlign: 'start',
                            marginLeft: 10
                        }}>{this.props.topUp ? 'TopUp Amount:' : 'Transfer Amount: '}</span>
                            <input value={this.state.money}
                                   type={'tel'}
                                   style={{
                                       width: 100,
                                       borderWidth: 1,
                                       borderRadius: 10,
                                       height: 60,
                                       color: bgColor,
                                       fontSize: '2em',
                                       marginLeft: 10,
                                       textAlign: 'center'
                                   }}
                                   onBlur={() => {
                                       if (money !== 0 && money < 1)
                                           this.setState({error: 'The Minimum for requests is 1¥'});
                                       else
                                           this.setState({error: undefined});
                                   }}
                                   onChange={e => {
                                       this.setState({
                                           money: e.target.value,
                                           error: undefined,
                                           neverEnteredMoney: false
                                       });
                                   }}/>
                            <span style={{fontSize: '3em', marginLeft: 10}}>¥</span>
                            {this.state.error && <span style={{
                                color: 'red',
                                marginLeft: 10
                            }}>{this.state.error}</span>}
                        </div>

                        {!this.state.neverEnteredMoney && <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'flex-end'
                        }}>

                            <span>{this.props.topUp ? 'TopUp Amount: ' : 'Recipient will receive: '} {money.toFixed(2)} ¥</span>
                            <span>Fee: {(money * 0.05).toFixed(2)} ¥</span>
                            <span style={{
                                fontStyle: 'bold',
                                fontSize: '1.2em'
                            }}>Total: {(money * 1.05).toFixed(2)} ¥</span>

                            <TedooButton style={{
                                fontSize: '1.3em',
                                marginTop: 10,
                                alignSelf: 'flex-end'
                            }}
                                         selected={!stage2Invalid}
                                         disabled={stage2Invalid}
                                         selectedBackground={bgColor}
                                         selectedTextColor={'white'} text={'Proceed to Payment'}
                                         onClick={() => {
                                             this.props.onProceed(this.state.wechatId, this.state.money)
                                         }}/>
                        </div>}


                    </div>
                </Collapse>
            </div>
        );
    }
}

export default Stage2;