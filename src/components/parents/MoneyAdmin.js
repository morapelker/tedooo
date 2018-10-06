import React, {Component} from 'react';
import {connect} from 'react-redux';
import managerApi from "../../api/managerApi";
import SubmitButton from "../common/SubmitButton";
import RefreshIndicator from "../common/RefreshIndicator";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {bgColor} from "../../api/apiConstants";
import shopApi from "../../api/shopApi";
import {resize} from "./AddShop/ImgUploaderAmazon";
import Modal from "@material-ui/core/Modal/Modal";
import ImgWithLoader from "../common/ImgWithLoader";

class MoneyAdmin extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            requests: [],
            loadingItem: -1,
            mainLoading: true,
            pendingOnly: true,
        };
        managerApi.fetchPendingMoneyRequests(props.token, 'pending=true').then(items => {
            this.setState({requests: items.data, mainLoading: false});
        })
    }

    checkboxChanged = (e) => {
        this.setState({
            pendingOnly: e.target.checked,
            mainLoading: true,
            loadingItem: -1,
            requests: []
        });
        managerApi.fetchPendingMoneyRequests(this.props.token, e.target.checked ? 'pending=true' : '').then(items => {
            this.setState({requests: items.data, mainLoading: false});
        })
    };

    imgSelected = e => {
        console.log(e.target.files, this.state.index);
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            this.setState({loadingItem: this.state.index});
            resize(file, img => {
                shopApi.uploadImage(img, this.props.token).then(res => {
                    managerApi.completeMoneyRequest(this.state.req._id, this.props.token, 'https://tedooo.s3.amazonaws.com/' + res.id).then(res => {
                        if (res) {
                            const {requests, req, pendingOnly} = this.state;
                            const index = requests.map(r => r._id).indexOf(req._id);
                            if (index !== -1) {
                                if (pendingOnly)
                                    requests.splice(index, 1);
                                else
                                    requests[index].pending = false;
                            }
                            this.setState({
                                requests,
                                loadingItem: -1
                            });
                        } else
                            this.setState({loadingItem: -1});
                    });
                }).catch(() => {
                    this.setState({loadingItem: -1});
                });
            });
        }
    };

    completeTransaction = (req, index) => {
        this.setState({req, index});
        this.inputRef.value = '';
        this.inputRef.click();
    };

    closeModal = () => {
        this.setState({proof: undefined});
    };

    render() {
        return (
            <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.pendingOnly}
                            onChange={this.checkboxChanged}
                        />
                    }
                    label="Pending Requests Only"
                />
                <table style={{margin: 'auto', width: '90%', maxWidth: 500}}>
                    <thead>
                    <tr>
                        <th style={{width: 10}}>#</th>
                        <th>Recipient</th>
                        <th style={{width: 50}}>¥</th>
                        <th style={{width: 30}}>Action</th>
                    </tr>
                    </thead>
                    {!this.state.mainLoading && <tbody>
                    {this.state.requests.map((req, index) =>
                        <tr key={index}
                            style={{background: req.pending ? undefined : bgColor, height: 40}}>
                            <td style={{fontSize: '1.3em'}}>{index + 1}</td>
                            <td>{req.wechatId}</td>
                            <td>{req.money}</td>
                            <td style={{padding: 5}}>
                                {req.pending ?
                                    this.props.admin ? (this.state.loadingItem === index ?
                                        <RefreshIndicator size={40}/> :
                                        <SubmitButton style={{height: 40, width: 40}}
                                                      submit={() => {
                                                          this.completeTransaction(req, index);
                                                      }}/>) : <span>Pending</span>

                                    :
                                    req.receipt && req.receipt.length > 0 ?
                                        <SubmitButton image={'priceTag'}
                                                      style={{height: 40, width: 40}}
                                                      submit={() => {
                                                          this.setState({proof: req.receipt});
                                                      }}/> : <span/>
                                }

                            </td>
                        </tr>
                    )}
                    </tbody>}
                </table>
                {this.state.mainLoading && <RefreshIndicator style={{margin: 'auto'}}/>}
                <input style={{display: 'none'}} onChange={this.imgSelected} type={'file'}
                       ref={input => {
                           this.inputRef = input
                       }}/>
                <Modal open={!!this.state.proof} onClose={this.closeModal}>
                    <div onClick={this.closeModal} style={{
                        width: '100%',
                        flexDirection: 'column',
                        background: '#503CBF95',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ImgWithLoader src={this.state.proof}
                                       style={{
                                           width: '90vmin', height: '90vmin',
                                           alignSelf: 'center'
                                       }}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.saved.authentication.token,
        admin: state.saved.authentication.admin
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyAdmin);