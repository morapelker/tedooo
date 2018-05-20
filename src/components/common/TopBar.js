import React, {Component} from 'react';
import Header from "../Header";
import {withRouter} from "react-router-dom";
import TedooDrawer from "./TedooDrawer";

class TopBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {dockOpen: false};

        this.navBarClicked = this.navBarClicked.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.menuClicked = this.menuClicked.bind(this);
    }

    navBarClicked(url) {
        return () => {
            this.handleNavigation(url);
        }
    }

    closeMenu() {
        this.setState({dockOpen: false});
    }

    handleNavigation(url) {
        this.props.history.push(url)
    }

    menuClicked() {
        this.setState({dockOpen: true})
    }

    render() {
        return (
            <div>
                <TedooDrawer open={this.state.dockOpen} closeMethod={this.closeMenu} navBarClicked={this.navBarClicked} />
                <Header menuClicked={this.menuClicked}/>
            </div>
        );
    }
}

export default withRouter(TopBar);