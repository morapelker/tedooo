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

    getHeight = () => {
        if (!this.props.shop.img_links)
            return 0;
        if (this.props.shop.img_links.length > 6)
            return 500;
        return this.props.shop.img_links.length * 70
    };

    render() {
        const h = this.getHeight();
        const imgLinks = this.props.shop.img_links || [];
        return (
            <div className={'specific_image_root'} style={{height: h}}>
                <div style={{
                    display: 'flex',
                    paddingRight: 20,
                    paddingLeft: 20,
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {h === 500 &&
                    (this.state.startIndex === 0 ? <div style={{width: 40, height: 40}}/> :
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
                        }}/>)}
                    {imgLinks.slice(this.state.startIndex, this.state.startIndex + maxSmallImages)
                        .map((link, index) => {
                            return <ImgWithLoader key={index} style={{
                                width: 60,
                                height: 60,
                                marginTop: (index === 0 ? 0 : 10),
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

                        })}
                    {this.state.startIndex + maxSmallImages < imgLinks.length &&
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
                    }}/>}
                </div>
                <div style={{flex: 1, display: 'flex'}}>
                    <ImgWithLoader otherProps={{className: 'main_image'}} style={{marginTop: h === 500 ? 50 : 0}}
                                   src={this.state.bigImgUrl}/>
                </div>

            </div>
        );
    }
}

export default ImageColumn;