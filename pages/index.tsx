import React, {Component} from 'react'
import {withTranslation} from "@server/i18n";

// @ts-ignore
@withTranslation('common')
class Home extends Component<{
    videosAgregada: any[];
    t?: any;
}> {
    static async getInitialProps({ctx}) {
        return {};
    }

    render() {
        return (
            <div>Hola</div>
        );
    }
}

export default Home
