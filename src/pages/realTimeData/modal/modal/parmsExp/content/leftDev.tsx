import * as React from 'react';
import { Form, Col, Menu } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import { ClickParam } from 'antd/lib/menu'

export interface PropsCollectionCreateForm {
    onData?: any
    item_click_?: (param: ClickParam) => void
}
export const LeftDev = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                visible: false,
            }
        }
        componentWillReceiveProps(nextProps: any) {
            this.setState(nextProps)
        }
        render() {
            const { onData, item_click_ } = this.props;

            return (
                <Col span={6} style={{ height: '300px' }}>
                    <div
                        style={{
                            borderBottom: '1px solid #e8e8e8',
                            borderLeft: '1px solid #e8e8e8',
                            color: '#0E2D5F',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            lineHeight: '20px',
                            background: '#E0ECFF',
                            paddingLeft: '5px'
                        }}
                    >
                        设备
                    </div>
                    <Menu
                        mode="inline"
                        onClick={item_click_}
                        style={{ height: '300px', overflow: 'auto' }}
                    >
                        {
                            Array.from(onData).map((d: any) => {
                                return (
                                    <Menu.Item
                                        key={d.id}
                                        style={{ lineHeight: '30px', height: '30px', fontSize: '12px' }}
                                    >
                                        {d.text}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>

                </Col>
            );
        }
    })