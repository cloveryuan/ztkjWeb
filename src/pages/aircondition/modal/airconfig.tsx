import * as React from 'react';
import { Modal, Form, Select, Input, Radio, Col, Row, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import '../aircondition.scss';
import http from '../../../common/api';

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

interface Propscfg extends FormComponentProps {
    configvisible?: boolean,
    configModalcalcle: () => void,
    getdatas: (props: any) => void,
    infodatas: any
}

interface Statecfg {
    defaultValueOne: string,
    defaultValueTwo: string,
    fa1_up: any,
    fa2_up: any,
    fa1_down: any,
    fa2_down: any,
    fa1_base: any,
    fa2_base: any,
    fa1_bai: any,
    fa2_bai: any,
}
export const Airconfig = Form.create()(
    class extends React.Component<Propscfg, Statecfg> {
        constructor(props: Propscfg) {
            super(props);
            this.state = {
                defaultValueOne: '4',
                defaultValueTwo: '4',
                fa1_up: '',
                fa2_up: '',
                fa1_down: '',
                fa2_down: '',
                fa1_base: '',
                fa2_base: '',
                fa1_bai: '',
                fa2_bai: '',
            }
        }

        handleDefaultValueChangeOne = (e) => {
            this.setState({ defaultValueOne: e.target.value });
        }
        handleDefaultValueChangeTwo = (e) => {
            this.setState({ defaultValueTwo: e.target.value });
        }

        Modalcancle = () => {
            this.props.configModalcalcle()
            this.props.form.resetFields()
            this.setState({
                defaultValueOne: '4',
                defaultValueTwo: '4',
                fa1_up: '',
                fa2_up: '',
                fa1_down: '',
                fa2_down: '',
                fa1_base: '',
                fa2_base: '',
                fa1_bai: '',
                fa2_bai: '',
            })
        }

        configModalok = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) { return }
                const base1_up = values.fa1_bai && values.fa1_base ? values.fa1_base * (1 + values.fa1_bai / 100) : null
                const base1_down = values.fa1_bai && values.fa1_base ? values.fa1_base * (1 - values.fa1_bai / 100) : null
                const base2_up = values.fa2_bai && values.fa2_base ? values.fa2_base * (1 + values.fa2_bai / 100) : null
                const base2_down = values.fa2_bai && values.fa2_base ? values.fa2_base * (1 - values.fa2_bai / 100) : null

                let datas = {
                    mtd: 'update',
                    aid: this.props.infodatas.iair_id,
                    type: values.itype_id === '未设定' ? 0 : 1,
                    a1u: base1_up ? base1_up : values.fa1_up,
                    a1d: base1_down ? base1_down : values.fa1_down,
                    a1z: values.fa1_zero,
                    a2u: base2_up ? base2_up : values.fa2_up,
                    a2d: base2_down ? base2_down : values.fa2_down,
                    a2z: values.fa2_zero,
                    til: values.fti_limit,
                    tol: values.fto_limit,
                    tdl: values.ftd_limit,
                    spf: '0//',
                    sps: '0//'
                }
                http.postReq(
                    '/ztmanage/f/kol/tbaircondition/',
                    datas,
                    (data) => {
                        if (data.rtn === 1) {
                            message.success('修改成功');
                        } else {
                            message.error('修改失败');
                        }
                    }
                )
            })
            this.props.form.resetFields()
            this.Modalcancle()

        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { configvisible, infodatas } = this.props
            const {
                defaultValueOne,
                defaultValueTwo,
                fa1_up, fa2_up,
                fa1_down,
                fa2_down,
                fa1_base,
                fa2_base,
                fa1_bai,
                fa2_bai
            } = this.state

            return (
                <Modal
                    title={infodatas.scaption + '--参数配置'}
                    visible={configvisible}
                    okText="提交"
                    cancelText="取消"
                    width={800}
                    onCancel={this.Modalcancle}
                    onOk={this.configModalok}
                >
                    <Form className="ant-advanced-search-form">
                        <Row gutter={32}>
                            <Col span={12}>
                                <FormItem
                                    label="型号"
                                    labelCol={{ span: 6 }}
                                >
                                    {getFieldDecorator('itype_id', {
                                        initialValue: infodatas.itype_id === 1 ? '维护' : '未设定',
                                    })(
                                        <Select>
                                            <Option value="0">未设定</Option>
                                            <Option value="1">维护</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="回风温度阀值"
                                    labelCol={{ span: 6 }}
                                >
                                    {getFieldDecorator('fti_limit', {
                                        initialValue: infodatas.fti_limit,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="温度差阀值"
                                    labelCol={{ span: 6 }}
                                >
                                    {getFieldDecorator('ftd_limit', {
                                        initialValue: infodatas['ftd_limit'],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="送风温度阀值"
                                    labelCol={{ span: 6 }}
                                >
                                    {getFieldDecorator('fto_limit', {
                                        initialValue: infodatas.fto_limit,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12} style={{ marginTop: '20px' }}>
                                <fieldset>
                                    <legend>电流1阀值</legend>
                                    <RadioGroup
                                        defaultValue="4"
                                        value={defaultValueOne}
                                        buttonStyle="solid"
                                        onChange={this.handleDefaultValueChangeOne}
                                    >
                                        <Radio.Button value="4">上下限值</Radio.Button>
                                        <Radio.Button value="5">基准阀值</Radio.Button>
                                    </RadioGroup>
                                    <div className="bottom_she">
                                        {
                                            defaultValueOne === '4' ? (
                                                <div>
                                                    <FormItem
                                                        label="上限阀值"
                                                        labelCol={{ span: 6 }}
                                                    >
                                                        {getFieldDecorator('fa1_up', {
                                                            initialValue: fa1_up ? fa1_up : infodatas.fa1_up,
                                                        })(
                                                            <Input
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    this.setState({ fa1_up: e.target.value })
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                    <FormItem
                                                        label="下限阀值"
                                                        labelCol={{ span: 6 }}
                                                    >
                                                        {getFieldDecorator('fa1_down', {
                                                            initialValue: fa1_down ? fa1_down : infodatas.fa1_down,
                                                        })(
                                                            <Input
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    this.setState({ fa1_down: e.target.value })
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>) : defaultValueOne === '5' ? (
                                                    <div>
                                                        <FormItem
                                                            label="基准值"
                                                            labelCol={{ span: 6 }}
                                                        >
                                                            {getFieldDecorator('fa1_base', {
                                                                initialValue: fa1_base
                                                            })(
                                                                <Input
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        this.setState({ fa1_base: e.target.value })
                                                                    }}
                                                                />
                                                            )}
                                                        </FormItem>
                                                        <FormItem
                                                            label="阀值百分比"
                                                            labelCol={{ span: 6 }}
                                                        >
                                                            {getFieldDecorator('fa1_bai', {
                                                                initialValue: fa1_bai
                                                            })(
                                                                <Input
                                                                    onChange={(e) => {
                                                                        this.setState({ fa1_bai: e.target.value })
                                                                    }}
                                                                    addonAfter="%"
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </div>) : null
                                        }
                                        <FormItem
                                            label="零飘值"
                                            labelCol={{ span: 6 }}
                                        >
                                            {getFieldDecorator('fa1_zero', {
                                                initialValue: infodatas.fa1_zero,
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                    </div>
                                </fieldset>
                            </Col>
                            <Col span={12} style={{ marginTop: '20px' }}>
                                <fieldset>
                                    <legend>电流2阀值</legend>
                                    <RadioGroup
                                        defaultValue="4"
                                        value={defaultValueTwo}
                                        buttonStyle="solid"
                                        onChange={this.handleDefaultValueChangeTwo}
                                    >
                                        <Radio.Button value="4">上下限值</Radio.Button>
                                        <Radio.Button value="5">基准阀值</Radio.Button>
                                    </RadioGroup>
                                    <div className="bottom_she">
                                        {
                                            defaultValueTwo === '4' ? (
                                                <div>
                                                    <FormItem
                                                        label="上限阀值"
                                                        labelCol={{ span: 6 }}
                                                    >
                                                        {getFieldDecorator('fa2_up', {
                                                            initialValue: fa2_up ? fa2_up : infodatas.fa2_up,
                                                        })(
                                                            <Input
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    this.setState({ fa2_up: e.target.value })
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                    <FormItem
                                                        label="下限阀值"
                                                        labelCol={{ span: 6 }}
                                                    >
                                                        {getFieldDecorator('fa2_down', {
                                                            initialValue: fa2_down ? fa2_down : infodatas.fa2_down,
                                                        })(
                                                            <Input
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    this.setState({ fa2_down: e.target.value })
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>) : defaultValueTwo === '5' ? (
                                                    <div>
                                                        <FormItem
                                                            label="基准值"
                                                            labelCol={{ span: 6 }}
                                                        >
                                                            {getFieldDecorator('fa2_base', {
                                                                initialValue: fa2_base
                                                            })(
                                                                <Input
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        this.setState({ fa2_base: e.target.value })
                                                                    }}
                                                                />
                                                            )}
                                                        </FormItem>
                                                        <FormItem
                                                            label="阀值百分比"
                                                            labelCol={{ span: 6 }}
                                                        >
                                                            {getFieldDecorator('fa2_bai', {
                                                                initialValue: fa2_bai
                                                            })(
                                                                <Input
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        this.setState({ fa2_bai: e.target.value })
                                                                    }}
                                                                    addonAfter="%"
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </div>) : null
                                        }
                                        <FormItem
                                            label="零飘值"
                                            labelCol={{ span: 6 }}
                                        >
                                            {getFieldDecorator('fa2_zero', {
                                                initialValue: infodatas.fa2_zero,
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                    </div>
                                </fieldset>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    }
)