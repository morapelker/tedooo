import React, {Component} from 'react';

import TitleLabel from "../common/TitleLabel";
import Img from 'react-image'
import './SpecificShop.css';
import RefreshIndicator from "../common/RefreshIndicator";


const styles = {
    leftDiv: {
        height: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    bigImgDiv: {
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
        padding: 5,
        display: 'flex',
        alignItems: 'flex-end'
    },
    imgList: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'black',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        height: '15%',
        minHeight: 60,
        paddingRight: 5,
        paddingLeft: 5
    }, smallImg: {
        border: '1px black solid',
        minWidth: '25%',
        objectFit: 'cover',
    }, bigImg: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        flex: 1,
    }, refresh: {
        backgroundColor: 'transparent',
        display: 'inline-block',
        position: 'relative'
    }
};

let isDragging = false;
let mouseDown = false;
let startingPos = [];

const mouseMove = (e) => {
    if (mouseDown) {
        if (e.pageX - startingPos[0] > 5)
            isDragging = true;
    }
};

class ImageColumn extends Component {
    constructor(props, context) {
        super(props, context);
        const bigImgUrl = (this.props.shop.img_links.length > 0) ? this.props.shop.img_links[0] : '';
        this.state = {
            bigImgUrl: bigImgUrl
        }
    }

    render() {
        return (
            <div style={styles.leftDiv}>
                <TitleLabel text={this.props.shop.name}/>
                {this.props.shop.img_links.length > 0 ?
                    <div style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column-reverse',
                        display: 'flex',
                    }}>

                        <div onMouseDown={(e) => {
                            mouseDown = true;
                            startingPos = [e.pageX, e.pageY];
                        }} onMouseUp={() => {
                            mouseDown = false;
                        }} onMouseMove={mouseMove} className={'dragscroll'} style={styles.imgList}>
                            {this.props.shop.img_links.map((link, index) => (
                                <Img key={index} className={'smallImg'} style={styles.smallImg}
                                     src={link} loader={
                                    <RefreshIndicator />
                                } onDragStart={e => {
                                    e.preventDefault();
                                }} onClick={() => {
                                    if (!isDragging) {
                                        this.setState({
                                            bigImgUrl: link
                                        })
                                    }
                                    isDragging = false;
                                }}/>

                            ))}
                        </div>
                        <div style={styles.bigImgDiv}>
                            <Img style={styles.bigImg} src={this.state.bigImgUrl}
                                 loader={<RefreshIndicator />}/>

                        </div>
                    </div>
                    : 'no pictures'}

            </div>
        );
    }
}

export default ImageColumn;