import React from 'react';
import Router from "next/router";
import {SoftPortal, SoftProgress} from "@softlightweb/softlightweb-components";

/* eslint-disable react/prefer-stateless-function */
class NextNProgress extends React.Component<{
    color?: string;
    height?: any;
    startPosition?: any;
    options?: any;
    stopDelayMs?: any;
}> {
    static defaultProps = {
        color: '#29D',
        startPosition: 0.3,
        stopDelayMs: 1000,
        height: 3,
    };
    state = {
        show: false,
    };
    timer: any = null;

    routeChangeStart = () => {
        this.setState({show: true})
    };

    routeChangeEnd = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({show: false})
        }, this.props.stopDelayMs);
    };

    render() {
        const {color, height} = this.props;
        if (!this.state.show || !process.browser) {
            return null
        }
        return (
            <SoftPortal>
                <SoftProgress
                    color={"primary"}
                    position={"fixed"}
                    size={"s"}
                />
            </SoftPortal>
        )
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.routeChangeStart);
        Router.events.on('routeChangeComplete', this.routeChangeEnd);
        Router.events.on('routeChangeError', this.routeChangeEnd);
    }
}


export default NextNProgress;
