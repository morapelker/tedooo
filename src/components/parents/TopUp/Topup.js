import React, {Component} from 'react';
import {connect} from 'react-redux';
import TedooButton from "../../common/TedooButton";
import {bgColor} from "../../../api/apiConstants";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Stage2 from "./Stage2";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import PaymentStage from "./PaymentStage";


const styles = {
    button: {
        backgroundColor: 'white',
        '&:focus': {
            backgroundColor: 'white',
        },
        padding: 5,
        width: 40,
        height: 40,
        position: 'absolute',
        left: 0,
        top: 5
    }
};

class Topup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            stage: 1,
            topUp: true,
            wechatId: '',
            money: ''
        };
    }

    proceedToStage3 = (wechatId, money) => {
        this.setState({stage: 3, wechatId, money});
    };

    render() {
        return (
            <div style={{
                width: '90vmin',
                maxWidth: 600,
                height: '100%',
                position: 'relative',
                margin: 'auto'
            }}>
                <h2>WeChat Money Services</h2>
                <Collapse in={this.state.stage === 1}>
                    <img src={'/assets/yuan.jpeg'} alt={''}
                         style={{
                             width: 200,
                             height: 200,
                             marginTop: 10
                         }}/>
                    <p/>
                </Collapse>

                {this.state.stage > 1 &&
                <Button variant="fab" aria-label="s"
                        className={this.props.classes.button} onClick={() => {
                    this.setState({stage: this.state.stage - 1});
                }}>
                    <img src={'/assets/left.png'} alt={''} style={{width: '100%', height: '100%'}}/>
                </Button>}

                <TedooButton selected={this.state.stage === 1 || this.state.topUp}
                             selectedBackground={bgColor}
                             selectedTextColor={'white'} text={'Top Up'} onClick={() => {
                    this.setState(Object.assign({}, {topUp: true}, this.state.stage === 1 ? {stage: 2} : {}));
                }}/>
                <TedooButton style={{marginLeft: 10}}
                             selected={this.state.stage === 1 || !this.state.topUp}
                             selectedBackground={bgColor}
                             selectedTextColor={'white'} text={'Pay Direct'} onClick={() => {
                    this.setState(Object.assign({}, {topUp: false}, this.state.stage === 1 ? {stage: 2} : {}));
                }}/>
                {this.state.stage === 2 &&
                <Stage2
                    money={this.state.money}
                    wechatId={this.state.wechatId}
                    topUp={this.state.topUp}
                    onProceed={this.proceedToStage3}
                />
                }
                {this.state.stage === 3 && <PaymentStage/>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
    };
}

function mapDispatchToProps() {
    return {};
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Topup));