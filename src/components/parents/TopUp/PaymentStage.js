import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {Input} from "reactstrap";
import '../../../App.css'

class PaymentStage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            number: '',
            cvc: '',
            expiry: '',
        };
    }

    handleCardNumberChange = e => {
        this.setState({number: e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()});
    };

    nameChanged = e => {
        this.setState({name: e.target.value});
    };

    handleExpiryChange = e => {
        let ex = e.target.value;
        if (ex.length === 2 && !ex.includes('/'))
            ex = ex + '/';
        this.setState({expiry: ex});
    };

    cvcChanged = e => {
        this.setState({cvc: e.target.value});
    };

    render() {
        return (
            <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', marginTop: 20}}>
                <div style={{flex: 1, minWidth: 300, marginRight: 10, alignSelf: 'center'}}>
                    <Input className={'inputField'} value={this.state.name}
                           onChange={this.nameChanged}
                           onFocus={() => {
                               this.setState({focused: 'name'});
                           }}
                           onBlur={() => {
                               this.setState({focused: ''});
                           }}
                           placeholder={'Name on Card'} style={{borderRadius: 7}}/>

                    <Input className={'inputField'} value={this.state.number}
                           onChange={this.handleCardNumberChange}
                           onFocus={() => {
                               this.setState({focused: 'number'});
                           }}
                           onBlur={() => {
                               this.setState({focused: ''});
                           }}
                           placeholder={'Card Number'} style={{borderRadius: 7, marginTop: 10}}/>

                    <div style={{display: 'flex', width: '100%', marginTop: 10}}>
                        <Input className={'inputField'} value={this.state.expiry}
                               onChange={this.handleExpiryChange}
                               onFocus={() => {
                                   this.setState({focused: 'expiry'});
                               }}
                               onBlur={() => {
                                   this.setState({focused: ''});
                               }}
                               placeholder={'Valid Through'}
                               style={{borderRadius: 7, flex: 3}}/>
                        <Input className={'inputField'} value={this.state.cvc}
                               onChange={this.cvcChanged}
                               onFocus={() => {
                                   this.setState({focused: 'cvc'});
                               }}
                               onBlur={() => {
                                   this.setState({focused: ''});
                               }}
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
        );
    }
}

export default PaymentStage;