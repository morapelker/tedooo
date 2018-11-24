import React, {Component} from 'react';
import TedooButton from "../../common/TedooButton";
import {bgColor} from "../../../api/apiConstants";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CommentStars from "./CommentStars";
import RefreshIndicator from "../../common/RefreshIndicator";
import ShopApi from "../../../api/shopApi";
import Stars from "../../common/Stars";
import CommentList from "./CommentList";

class CommentSection extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            stars: 3,
            expanded: 0,
            total: 0,
            avg: 0,
            reviewText: '',
            title: ''
        };
    }

    componentDidMount() {
        this.fetchReviews();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.shop._id !== this.props.shop._id)
            this.fetchReviews();
    }


    fetchReviews = () => {
        const randId = Math.random() * 10;
        this.setState({reviews: undefined, expanded: 0});
        ShopApi.getReviewsForShop(this.props.shop._id, this.props.userId, 0, randId).then(res => {
            if (res && res.reqId === randId) {
                this.setState({
                    avg: res.avg || 0,
                    total: res.total,
                    reviews: Array.isArray(res.data) ? res.data : []
                });
            }
        });
    };

    starChanged = stars => {
        this.setState({stars: stars + 1});
    };

    submitReview = (create, index) => () => {
        this.setState({expanded: 2});
        const review = {
            text: this.state.reviewText,
            shop: this.props.shop._id,
            star: this.state.stars,
            title: this.state.title
        };
        if (create) {
            review.replies = [];
            ShopApi.postReview(review, this.props.token).then(res => {
                review.name = res.name || '';
                review.avatar = res.avatar || '';
                const r = this.state.reviews;
                r.splice(0, 0, review);
                this.setState(prevState => ({
                    reviews: r,
                    reviewText: '',
                    title: '',
                    expanded: 0,
                    avg: (prevState.avg * prevState.total + this.state.stars) / (prevState.total + 1),
                    total: prevState.total + 1,
                }));
            }).catch(() => this.setState({expanded: 0}));
        } else {
            if (this.state.reviews.length <= index)
                return;
            ShopApi.updateReview(review, this.state.reviews[index]._id, this.props.token).then(res => {
                review.name = res.name || '';
                review.avatar = res.avatar || '';
                const prevStars = this.state.reviews[index].star;
                const r = this.state.reviews;
                r[index] = Object.assign({}, r[index], review);
                this.setState(prevState => ({
                    reviews: r,
                    reviewText: '',
                    title: '',
                    expanded: 0,
                    avg: (prevState.avg * prevState.total - prevStars + review.star) / (prevState.total),
                }));
            }).catch(() => this.setState({expanded: 0}));
        }
    };

    userAlreadyCommented = (userId, reviews) => {
        if (!Array.isArray(reviews) || !userId)
            return undefined;
        return reviews.map(item => item.userId).indexOf(userId);
    };

    render() {
        const reviewIndex = this.userAlreadyCommented(this.props.userId, this.state.reviews);
        const userAlreadyCommented = (reviewIndex === -1 || reviewIndex === undefined) ? undefined : this.state.reviews[reviewIndex];
        return (
            <div className={'comment_root'}>
                {Array.isArray(this.state.reviews) ?
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h4 style={{margin: 0}}>{this.state.total} customer
                                review{this.state.total > 1 && 's'}</h4>
                            {!this.props.userId ?
                                <TedooButton text={'Sign in to comment'}
                                             onClick={() => {
                                                 this.props.history && this.props.history.push('/login');
                                             }}
                                             selected={true}
                                             selectedBackground={bgColor}
                                             selectedTextColor={'white'}
                                             style={{marginLeft: 10}}/> :
                                !this.state.expanded &&
                                <TedooButton
                                    text={userAlreadyCommented ? 'Edit Review' : 'Add Review'}
                                    onClick={() => {
                                        if (userAlreadyCommented) {
                                            this.setState({
                                                expanded: 1,
                                                stars: userAlreadyCommented.star,
                                                text: userAlreadyCommented.text,
                                                title: userAlreadyCommented.title
                                            });
                                        } else
                                            this.setState({expanded: 1});
                                    }}
                                    selected={true} selectedBackground={bgColor}
                                    selectedTextColor={'white'} style={{marginLeft: 10}}/>
                            }
                        </div>
                        <Collapse in={this.state.expanded !== 0}>
                            <div style={{
                                padding: 10,
                                width: '100%',
                                display: 'flex',
                                height: '100%',
                                alignItems: 'flex-end'
                            }}>
                                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <CommentStars stars={this.state.stars}
                                                  setStars={this.starChanged}/>
                                    <input onChange={e => this.setState({title: e.target.value})}
                                           className={'inputField'} style={{marginTop: 5}}
                                           placeholder={'Title'} value={this.state.title}/>
                                    <textarea placeholder={'Comment'}
                                              onChange={e => this.setState({reviewText: e.target.value})}
                                              value={this.state.reviewText}
                                              style={{resize: 'none', width: '100%', marginTop: 5}}
                                              className={'inputField'}/>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    marginLeft: 10
                                }}>
                                    <TedooButton text={<img src={'/assets/x.png'} alt={''}/>}
                                                 selectedTextColor={'white'}
                                                 selectedBackground={bgColor}
                                                 style={{
                                                     width: 40, height: 40, minWidth: 40
                                                 }}
                                                 selected={true}
                                                 onClick={() => {
                                                     this.setState({expanded: 0});
                                                 }}/>
                                    <div style={{flex: 1}}/>
                                    <TedooButton
                                        text={this.state.expanded === 2 ?
                                            <RefreshIndicator size={20}/> : 'Submit'}
                                        onClick={this.submitReview(!userAlreadyCommented, reviewIndex)}
                                        selectedTextColor={'white'}
                                        selectedBackground={bgColor}
                                        selected={true}
                                    />

                                </div>

                            </div>
                        </Collapse>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Stars rating={-2} stars={this.state.avg} size={'2x'}/>
                            <span
                                style={{marginLeft: 10, color: 'blue'}}>{this.state.avg} out of 5 stars</span>
                        </div>
                        <CommentList items={this.state.reviews}/>
                    </div>
                    : <RefreshIndicator/>}
            </div>
        );
    }
}

export default CommentSection;