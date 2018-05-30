import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

class Captcha extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <ReCAPTCHA
                style={this.props.style}
                ref="recaptcha"
                sitekey="6LdauFsUAAAAAPB6GnpSpXBlhMQYEONW74evUdGm"
                onChange={this.props.onChange}
                onExpired={this.props.onExpired}
            />
        );
    }
}

export default Captcha;