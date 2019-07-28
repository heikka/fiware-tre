import React, { Component } from 'react';

import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';
import TrendChart from '../../components/Chart/TrendChart/TrendChart';
import ToolDrawer from '../../components/Navigation/ToolDrawer/ToolDrawer';

interface State {
    readonly showSideDrawer: boolean,
    readonly showToolDrawer: boolean
}

export class Layout extends Component {
    state: State = {
        showSideDrawer: false,
        showToolDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState: State) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    toolDrawerClosedHandler = () => {
        this.setState({ showToolDrawer: false });
    }

    toolDrawerToggleHandler = () => {
        this.setState((prevState: State) => {
            return { showToolDrawer: !prevState.showToolDrawer };
        });
    }

    render() {
        return (
            <>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <ToolDrawer
                    open={this.state.showToolDrawer}
                    closed={this.toolDrawerClosedHandler} />
                <main className="content">
                    {this.props.children}
                </main>
            </>
        )
    }
}
