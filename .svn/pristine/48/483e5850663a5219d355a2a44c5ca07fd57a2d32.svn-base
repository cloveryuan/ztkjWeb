import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
const FormItem = Form.Item;
import http from '../../../common/api';

export interface PropsCollectionCreateForm {
    visible?: boolean;
    onCreate?: () => void;
    onCancel?: () => void;
    currentThree?: any
}
export const ControlGreatForm = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {

        controlConfig = () => {
            this.props.form.validateFields((err, values) => {
                console.log(this.props.currentThree)
                let Rdata = {
                    'sid': this.props.currentThree.stationid,
                    'eid': this.props.currentThree.equipmentid,
                    'cid': this.props.currentThree.signalid,
                    'password': values.userpassword,
                    'controlvalue': values.controlvalue
                };
                if (err) {
                    return;
                }
                http.postReq(
                    '/ztmanage/a/zt/config?mtd=csig',
                    Rdata,
                    (res) => {
                        if (res.rtn === '1') {
                            message.success('操作成功');
                            this.props.onCancel();
                        } else {
                            message.error(res.rtn);
                        }
                        this.props.form.resetFields()
                    }
                )
            })
        }
        render() {
            const { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="控制操作"
                    onCancel={onCancel}
                    onOk={this.controlConfig}
                    okText="确定"
                    cancelText="取消"
                    width={520}
                >
                    <Form className="ant-advanced-search-form" >
                        <FormItem
                            label="当前用户密码"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 10 }}
                        >
                            {getFieldDecorator('userpassword', {
                                initialValue: '',
                                rules: [{ required: true, message: 'Please input your password!' }]
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            label="信号控制值"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 10 }}
                        >

                            {getFieldDecorator('controlvalue', {
                                initialValue: 1,
                                rules: [{ required: true, message: 'Please input your  controlled variable!' }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);