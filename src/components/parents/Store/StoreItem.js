import React, {Component} from 'react';
import StoreDescription from "./StoreDescription";
import StorePrice from "./StorePrice";
import Fade from "@material-ui/core/Fade/Fade";
import {Button} from "@material-ui/core/index";

class StoreItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hover: false
        };
    }

    mouseEnter = () => {
        if (!this.state.hover)
            this.setState({hover: true});
    };

    mouseLeave = () => {
        this.setState({hover: false});
    };

    render() {
        return (
            <div style={{
                width: this.props.size,
                marginTop: 40,
                position: 'relative'
            }} onMouseMove={this.mouseEnter}
                 onMouseLeave={this.mouseLeave} >
                <div style={{
                    width: this.props.size,
                    height: this.props.size,
                    borderRadius: 15,
                    backgroundColor: this.props.item.color || 'white',
                    padding: 50
                }}>
                    <img style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: this.props.opacity || 1
                    }} src={this.props.item.avatar} alt={''}/>

                </div>
                <StorePrice />
                <StoreDescription label={this.props.item.label}/>
                <Fade in={this.state.hover}>
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        height: this.props.size,
                        width: '100%',
                        position: 'absolute',
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'center',
                        left: 0,
                        top: 0
                    }}>
                        <Button
                            onClick={()=>{
                                this.props.onClick(this.props.item);
                            }}
                            style={{
                                textTransform: 'capitalize',
                                alignSelf: 'center'
                            }}
                            variant={'raised'} color={'primary'}>Get</Button>
                    </div>
                </Fade>
            </div>
        );
    }
}

export default StoreItem;