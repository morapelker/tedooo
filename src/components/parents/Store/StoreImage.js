import React, {Component} from 'react';
import ImgWithLoader from "../../common/ImgWithLoader";
import RefreshIndicator from "../../common/RefreshIndicator";
import {Fade, Button} from "@material-ui/core/index";
import RemoveIcon from '@material-ui/icons/Remove';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: {
        height: 20,
        width: 20,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        position: 'absolute',
        top: 5,
        left: 5,
    }
};

const baseStyle = {
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'solid',
};

class StoreImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMinus: false
        };
    }

    mouseMove = () => {
      if (!this.state.showMinus && !this.props.edit && this.props.ownShop)
          this.setState({showMinus: true})
    };

    mouseLeave = () => {
        if (this.state.showMinus)
            this.setState({showMinus: false})
    };

    render() {
        return (
            <div
                onMouseMove={this.mouseMove}
                onMouseLeave={this.mouseLeave}
                onClick={this.props.onClick}
                style={Object.assign({}, this.props.edit && baseStyle, this.props.style, {
                    position: 'absolute',
                    height: 100,
                    zIndex: 11,
                    display: this.props.edit || (this.props.item && this.props.item.img) || this.props.loading ? 'unset' : 'none',
                    width: 100
                })}>
                {this.props.loading ? <RefreshIndicator style={{
                        marginTop: 25
                    }}/> :
                    <div>
                        <ImgWithLoader
                            style={{
                                height: 100,
                                width: 100,
                                objectFit: 'contain'
                            }}
                            src={this.props.item && this.props.item.img}
                            alt={''}
                        />
                        <Fade in={this.state.showMinus}>
                            <Button onClick={()=>{
                                this.props.deleteImage(this.props.index);
                            }} mini variant="fab" color="inherit" aria-label="add" classes={{
                                root: this.props.classes.root
                            }}>
                                <RemoveIcon style={{
                                    height: 20, width: 20
                                }} />
                            </Button>
                        </Fade>
                    </div>
                   }

            </div>
        );
    }
}

export default withStyles(styles)(StoreImage);