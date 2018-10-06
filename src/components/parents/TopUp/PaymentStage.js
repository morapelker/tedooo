import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {Input} from "reactstrap";
import '../../../App.css'
import Payment from 'payment';
import TedooButton from "../../common/TedooButton";
import {bgColor} from "../../../api/apiConstants";
import RefreshIndicator from "../../common/RefreshIndicator";

class PaymentStage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            number: '',
            cvc: '',
            expiry: '',
            loading: false
        };
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }

    handleInputFocus = ({target}) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({target}) => {
        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/ /g, ''),
            });
        }
        else if (target.name === 'expiry') {
            this.setState({
                [target.name]: target.value.replace(/ |\//g, ''),
            });
        }
        else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    blurred = () => {
        this.setState({focused: ''});
    };

    render() {
        // let allValid = true;
        // if (!Payment.fns.validateCardNumber(this.state.number))
        //     allValid = false;
        // else {
        //     const type = Payment.fns.cardType(this.state.number);
        //     if (!Payment.fns.validateCardCVC(this.state.cvc, type))
        //         allValid = false;
        // }
        const allValid = this.state.name.length > 0 && this.state.number.length > 0 && this.state.cvc > 0;
        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', marginTop: 20}}>
                    <div style={{flex: 1, minWidth: 300, marginRight: 10, alignSelf: 'center'}}>
                        <input className={'inputField'} name={'name'}
                               onKeyUp={this.handleInputChange}
                               onFocus={this.handleInputFocus}
                               onBlur={this.blurred}
                               placeholder={'Name on Card'} style={{borderRadius: 7}}/>

                        <input className={'inputField'}
                               name={'number'}
                               type={'tel'}
                               onKeyUp={this.handleInputChange}
                               onFocus={this.handleInputFocus}
                               onBlur={this.blurred}
                               placeholder={'Card Number'}
                               style={{borderRadius: 7, marginTop: 10}}/>

                        <div style={{display: 'flex', width: '100%', marginTop: 10}}>
                            <input className={'inputField'}
                                   name="expiry"
                                   type={'tel'}
                                   onKeyUp={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                                   onBlur={this.blurred}
                                   placeholder={'Valid Through'}
                                   style={{borderRadius: 7, flex: 3}}/>
                            <Input className={'inputField'}
                                   name={'cvc'}
                                   type={'tel'}
                                   onKeyUp={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                                   onBlur={this.blurred}
                                   placeholder={'CVC'}
                                   style={{borderRadius: 7, marginLeft: 5, flex: 1}}/>
                        </div>
                    </div>
                    <Cards
                        number={this.state.number}
                        name={this.state.name}
                        expiry={this.state.expiry}
                        cvc={this.state.cvc}
                        focused={this.state.focused}
                    />
                </div>
                {this.state.error && <h4 style={{
                    marginTop: 10,
                    alignSelf: 'flex-end',
                    color: 'red'
                }}>{this.state.error}</h4>}
                {this.state.loading ?
                    <RefreshIndicator style={{marginTop: 10, alignSelf: 'flex-end', marginRight: 60}}/>
                    :
                    <TedooButton style={{
                        fontSize: '1.3em',
                        marginTop: 10,
                        alignSelf: 'flex-end'
                    }}
                                 selected={allValid}
                                 disabled={!allValid}
                                 selectedBackground={bgColor}
                                 selectedTextColor={'white'} text={'Complete Purchase'}
                                 onClick={() => {
                                     this.setState({loading: true, error: ''});
                                     this.props.onProceed(this.state).catch(error => {
                                         this.setState({loading: false, error});
                                     });
                                 }}/>
                }
            </div>
        );
    }
}

export default PaymentStage;