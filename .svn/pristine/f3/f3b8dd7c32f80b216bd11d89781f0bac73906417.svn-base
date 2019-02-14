import * as React from 'react';
import { Input, Form, Modal, Row, Col, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
const FormItem = Form.Item;
const Option = Select.Option

export interface PropsCollectionCreateForm {
    edit?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
    data?: any;
    isUpdate?: boolean;
    sureBtnFunc?: () => void;
    hideModel?: () => void;
    confirmLoading?: boolean;
}
export const EditableCell = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                visible: false,
                sureBtnFunc: props.sureBtnFunc,
                confirmLoading: props.confirmLoading,
                hideModel: props.hideModel
            }
        }
        componentWillReceiveProps(nextProps: any) {
            this.setState(nextProps)
        }
        titleCenter = () => {
            return <div className="titleCenter">{(this.props.isUpdate ? '编辑' : '新增')}</div>
        }

        render() {
            const { edit, hideModel, sureBtnFunc, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={edit}
                    title={this.titleCenter()}
                    onCancel={hideModel}
                    onOk={sureBtnFunc}
                    okText="保存"
                    cancelText="取消"
                    width={620}
                    maskClosable={false}
                    confirmLoading={this.props.confirmLoading}
                >
                    <Form className="ant-advanced-search-form" >
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem
                                    label="设备状态"
                                >
                                    {getFieldDecorator('estate', {
                                    })(
                                        <Select>
                                            <Option value="0">不工作</Option>
                                            <Option value="1">工作</Option>
                                            <Option value="2">备用</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="告警等级"
                                >

                                    {getFieldDecorator('wgrade', {
                                    })(
                                        <Select>
                                            <Option value="0">正常</Option>
                                            <Option value="1">一般告警</Option>
                                            <Option value="2">重要告警</Option>
                                            <Option value="3">紧急告警</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="符号"
                                >

                                    {getFieldDecorator('sascii', {
                                    })(
                                        <Select>
                                            <Option value="=">=</Option>
                                            <Option value="<">&lt;</Option>
                                            <Option value=">">&gt;</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="比较值"
                                >
                                    {getFieldDecorator('svalue', {
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="时延"
                                >

                                    {getFieldDecorator('wdelay', {
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="告警信息"
                                >

                                    {getFieldDecorator('winfo', {
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem style={{ display: 'none' }}>
                                    {getFieldDecorator('cid', {
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    })