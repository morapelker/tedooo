import React, {Component} from 'react';

import ImgWithLoader from "../common/ImgWithLoader";

const maxSmallImages = 6;

class ImageColumn extends Component {
    constructor(props, context) {
        super(props, context);
        const bigImgUrl = (this.props.shop.img_links && this.props.shop.img_links.length > 0) ? this.props.shop.img_links[0] : '';
        this.state = {
            bigImgUrl,
            startIndex: 0
        }
    }

    componentWillReceiveProps(props, context) {
        if (props.shop && this.props.shop && props.shop._id !== this.props.shop._id) {
            const bigImgUrl = (props.shop.img_links && props.shop.img_links.length > 0) ? props.shop.img_links[0] : '';
            this.setState({bigImgUrl, startIndex: 0});
        }
    }

    render() {
        return (
            <div className={'specific_image_root'} style={{
                height: 500
            }}>
                <div style={{
                    display: 'flex',
                    paddingRight: 20,
                    paddingLeft: 20,
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {this.state.startIndex === 0 ? <div style={{width: 40, height: 40}} /> :
                    <img style={{
                        width: 30,
                        height: 30,
                        alignSelf: 'center',
                        cursor: 'pointer',
                        background: 'white'
                    }} src={'/assets/up.png'} alt={''} onClick={() => {
                        this.setState(prevState => ({
                            startIndex: prevState.startIndex - maxSmallImages < 0 ? 0 : prevState.startIndex - maxSmallImages
                        }));
                    }} />}
                    {this.props.shop.img_links.map((link, index) => {
                        if (index >= this.state.startIndex && index < this.state.startIndex + maxSmallImages) {
                            return <ImgWithLoader key={index} style={{
                                width: 60,
                                height: 60,
                                marginTop: (index === this.state.startIndex ? 0 : 10),
                                borderRadius: 10,
                                border: '1px black solid',
                                objectFit: 'cover',
                                borderWidth: 3,
                                cursor: 'pointer',
                                borderColor: (this.state.bigImgUrl === link ? '#3CBF95' : 'black')
                            }} src={link}
                                                  otherProps={{
                                                      onDragStart: e => {
                                                          e.preventDefault();
                                                      }, onClick: () => {
                                                          this.setState({
                                                              bigImgUrl: link
                                                          });
                                                      }
                                                  }}/>
                        }
                        return undefined;
                    })}
                    {this.state.startIndex + maxSmallImages < this.props.shop.img_links.length  &&
                    <img style={{
                        width: 30,
                        height: 30,
                        marginTop: 10,
                        alignSelf: 'center',
                        background: 'white',
                        cursor: 'pointer'
                    }} src={'/assets/down.png'} alt={''} onClick={() => {
                        this.setState(prevState => ({
                          startIndex: prevState.startIndex + maxSmallImages
                        }));
                    }} />}
                </div>
                <ImgWithLoader otherProps={{className: 'main_image'}}
                    src={this.state.bigImgUrl}/>
            </div>
        );
    }
}

export default ImageColumn;