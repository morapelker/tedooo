import React, {Component} from 'react';

import TitleLabel from "../common/TitleLabel";
import Img from 'react-image'
import './SpecificShop.css';
import RefreshIndicator from "../common/RefreshIndicator";


const styles = {
    bigImgDiv: {
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
        padding: 5,
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'black'
    },
    imgList: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'black',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        height: 60,
        paddingRight: 5,
        paddingLeft: 5
    }, smallImg: {
        border: '1px black solid',
        width: 50,
        height: 50,
        marginLeft: 12,
        objectFit: 'cover',
        borderWidth: 3,
        cursor: 'pointer'
    }, bigImg: {
        maxWidth: '100%',
        maxHeight: '100%',
        marginBottom: 5,
        objectFit: 'contain',
        flex: 1,
    }, refresh: {
        backgroundColor: 'transparent',
        display: 'inline-block',
        position: 'relative'
    }
};

class ImageColumn extends Component {
    constructor(props, context) {
        super(props, context);
        const bigImgUrl = (this.props.shop.img_links && this.props.shop.img_links.length > 0) ? this.props.shop.img_links[0] : '';
        this.state = {
            bigImgUrl: bigImgUrl
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <TitleLabel text={this.props.shop.name}/>
                {this.props.shop.img_links && this.props.shop.img_links.length > 0 ?
                    <div style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column-reverse',
                        display: 'flex',
                    }}>

                        <div style={styles.imgList}>
                            {this.props.shop.img_links.map((link, index) => (
                                <Img key={index} className={'smallImg'}
                                     style={Object.assign({}, styles.smallImg, {borderColor: (this.state.bigImgUrl === link ? '#3CBF95' : 'black')})}
                                     src={link} loader={
                                    <RefreshIndicator/>
                                } onDragStart={e => {
                                    e.preventDefault();
                                }} onClick={() => {
                                    this.setState({
                                        bigImgUrl: link
                                    });
                                }}/>

                            ))}
                        </div>
                        <div style={styles.bigImgDiv}>
                            <Img style={styles.bigImg} src={this.state.bigImgUrl}
                                 loader={<RefreshIndicator style={{
                                     margin: '0 auto'
                                 }}/>}/>

                        </div>
                    </div>
                    : 'no pictures'}

            </div>
        );
    }
}

export default ImageColumn;