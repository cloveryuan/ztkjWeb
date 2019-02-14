import * as React from 'react';
import { Modal, Form, Input, Icon, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import http from '../../../common/api';
const FormItem = Form.Item
const Option = Select.Option

interface Propscfg extends FormComponentProps {
    addvisible?: boolean,
    addModalcalcle: () => void,
    getdatas: (props: any) => void
}

interface Statecfg {
    caption?: string,
    sid?: any
}
export const Add = Form.create()(
    class extends React.Component<Propscfg, Statecfg> {
        public caption: any = null
        public sid: any = null
        constructor(props: Propscfg) {
            super(props)
            this.state = {
                caption: '',
                sid: ''
            }
        }

        addModalok = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) { return }
                let datas = {
                    caption: values.caption,
                    sid: values.sid,
                    space: values.space,
                    mtd: 'add'
                }
                http.postReq(
                    '/ztmanage/f/kol/tbaircondition/',
                    datas,
                    (data) => {
                        if (data.rtn === 1) {
                            message.success('添加成功');
                            this.props.getdatas(null)
                        } else {
                            message.error('添加失败');
                        }
                        
                    }
                )
                this.props.form.resetFields()
                this.setState({ caption: '', sid: '' })
                this.props.addModalcalcle()
            })
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { addModalcalcle, addvisible } = this.props
            const { caption, sid } = this.state

            const suffix_caption = caption ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.caption.focus();
                        this.setState({ caption: '' });
                        this.props.form.setFieldsValue({
                            caption: ''
                        })
                    }}
                />) : null
            const suffix_sid = sid ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.sid.focus();
                        this.setState({ sid: '' });
                        this.props.form.setFieldsValue({
                            sid: ''
                        })
                    }}
                />) : null;

            return (
                <Modal
                    title="空调故障分析系统--添加设备"
                    visible={addvisible}
                    okText="提交"
                    cancelText="取消"
                    onCancel={addModalcalcle}
                    onOk={this.addModalok}
                >
                    <Form>
                        <FormItem
                            label="空调名称"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {
                                getFieldDecorator('caption', {
                                    rules: [{ required: true, message: '请输入空调名称' }]
                                })(
                                    <Input
                                        ref={(node) => {
                                            this.caption = node
                                        }}
                                        suffix={suffix_caption}
                                        onChange={(e) => {
                                            this.setState({ caption: e.target.value })
                                        }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="T60设备编码"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {
                                getFieldDecorator('sid', {
                                    rules: [{ required: true, message: '请输入T60设备编码' }]
                                })(
                                    <Input
                                        ref={(node) => {
                                            this.sid = node
                                        }}
                                        suffix={suffix_sid}
                                        onChange={(e) => {
                                            this.setState({ sid: e.target.value })
                                        }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="T60链接组别"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {
                                getFieldDecorator('space', {
                                    rules: [{ required: true, message: '请选择T60连接组别!' }],
                                    initialValue: '0'
                                })(
                                    <Select
                                        placeholder={'请选择连接组别'}
                                    >
                                        <Option value="0">一号</Option>
                                        <Option value="1">二号</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
)
