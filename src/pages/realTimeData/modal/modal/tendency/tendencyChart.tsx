import * as React from 'react';
import { Modal } from 'antd'
import LineReact from './LineReact'  // 折线图组件
interface PropsTendency {
    visible?: boolean,
    modalCancle: () => void,
    options: object
}

export class TendencyChart extends React.Component<PropsTendency, any> {
    constructor(props: PropsTendency) {
        super(props);
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        const { visible, modalCancle, options } = this.props
        return (
            <Modal
                visible={visible}
                title="趋势曲线图"
                width={520}
                onCancel={modalCancle}
                footer={null}
                destroyOnClose={true}
            >
                <LineReact options={options} modalCancle={modalCancle} />
            </Modal>
        )
    }
}
