import * as React from 'react'
import './innerhtml.scss'

interface PropsInnerHtml {
    iframe: string;
    onParam?: string;
    changesrc: (src: number) => void;
    arr_src: any
}

interface StateInnerHmtml {
}

export class TInnerHtml extends React.Component<PropsInnerHtml, StateInnerHmtml> {
    constructor(props: PropsInnerHtml) {
        super(props)
    }

    getIframe = () => {
        var stateObj = { key: this.props.onParam };
        window.history.pushState(stateObj, 'null', 'main.html');
        window.onpopstate = (event: any) => {
            console.log(Number(event.state.key))
            if (!event.state.key) {
                return
            };
            if (Number(event.state.key)) {
                this.props.changesrc(event.state.key)
            };
        }
        return {
            __html: '<iframe ' +
                'data-box="fit" src="' + this.props.iframe + '" ' +
                'data="' + this.props.onParam + '"' +
                ' id="dataBox"></iframe>'
        }
    }

    render() {
        let { iframe, onParam, ...other_props } = this.props;

        return (
            <div
                {...other_props}
                dangerouslySetInnerHTML={this.getIframe()}
                style={{ height: '90vh' }}
            />
        )
    }
}
