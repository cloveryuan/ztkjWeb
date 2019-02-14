import * as React from 'react';
import { Spin } from 'antd';
export class CurveContent extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        return (
            <Spin spinning={this.state.loading} size="large">
                <div id="main" style={{width: '100%', height: 600}} />
            </Spin>
        )
    }
}
