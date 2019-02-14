import React from 'react';
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import contentCreatStyle from '../../realTimeData/contentCreat.scss';
import http from '../../../common/api'
const FormItem = Form.Item;

export interface PropsCollectionCreateForm {
    visible?: boolean;
    selectBtnFunc?: (props: any) => void;
}
export const AlarmGreateForm = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        public ai: any = null;
        public sn: any = null;
        public en: any = null;
        public cn: any = null;
        public sure: any = null;
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                expand: false,
                startValue: null,
                endValue: null,
                endOpen: false,
                aivalue: '',
                snvalue: '',
                selectBtnFunc: props.selectBtnFunc,
            }
        }
        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) {
                    return;
                }

                let onData = {
                    'ai': values.ai,
                    'sn': values.sn,
                    'en': values.en,
                    'cn': values.cn,
                    'st': values.st ? values.st.format('YYYY-MM-DD') : '',
                    'et': values.et ? values.et.format('YYYY-MM-DD') : '',
                }
                http.postReq(
                    '/ztmanage/f/api/qrya',
                    onData,
                    (searchData) => {
                        console.log(searchData)
                        this.state.selectBtnFunc(searchData)
                    }
                )
            });
        }
        disabledStartDate = (startValue) => {
            const endValue = this.state.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        }

        disabledEndDate = (endValue) => {
            const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() <= startValue.valueOf();
        }

        onChange = (field, value) => {
            this.setState({
                [field]: value,
            });
        }

        onStartChange = (value) => {
            this.onChange('startValue', value);
        }

        onEndChange = (value) => {
            this.onChange('endValue', value);
        }

        handleStartOpenChange = (open) => {
            if (!open) {
                this.setState({ endOpen: true });
            }
        }

        handleEndOpenChange = (open) => {
            this.setState({ endOpen: open });
        }

        toggle = () => {
            const { expand } = this.state;
            this.setState({ expand: !expand });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { aivalue, snvalue, envalue, cnvalue } = this.state
            const suffix_ai = aivalue ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.ai.focus();
                        this.setState({ aivalue: '' });
                        this.props.form.setFieldsValue({
                            ai: ''
                        })
                    }}
                />) : null;
            const suffix_sn = snvalue ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.sn.focus();
                        this.setState({ snvalue: '' });
                        this.props.form.setFieldsValue({
                            sn: ''
                        })
                    }}
                />) : null;
            const suffix_en = envalue ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.en.focus();
                        this.setState({ envalue: '' });
                        this.props.form.setFieldsValue({
                            en: ''
                        })
                    }}
                />) : null;
            const suffix_cn = cnvalue ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.cn.focus();
                        this.setState({ cnvalue: '' });
                        this.props.form.setFieldsValue({
                            cn: ''
                        })
                    }}
                />) : null;
            return (
                <div className={contentCreatStyle.box}>
                    <div className={contentCreatStyle.boxHeader}>
                        <h3 className={contentCreatStyle.boxTitle}>筛选项</h3>
                        <div className={contentCreatStyle.boxTools}>
                            <a className={contentCreatStyle.btn} data-widget="collapse" onClick={this.toggle}>
                                <Icon type={this.state.expand ? 'minus' : 'plus'} style={{ fontSize: '18px' }} />
                            </a>
                        </div>
                    </div>
                    <div className={contentCreatStyle.boxBody}>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={this.handleSearch}
                            style={{ padding: '5px' }}
                        >
                            <Row gutter={24} style={{ display: this.state.expand ? 'block' : 'none' }}>
                                <Col span={7}>
                                    <FormItem label={`告警编号`}>
                                        {getFieldDecorator(`ai`)(
                                            <Input
                                                style={{ float: 'left' }}
                                                suffix={suffix_ai}
                                                ref={(node) => {
                                                    this.ai = node
                                                }}
                                                onChange={(e) => {
                                                    this.setState({ aivalue: e.target.value })
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem label={`局站`}>
                                        {getFieldDecorator(`sn`, {
                                            rules: [],
                                        })(
                                            <Input
                                                style={{ float: 'left' }}
                                                suffix={suffix_sn}
                                                ref={(node) => {
                                                    this.sn = node
                                                }}
                                                onChange={(e) => {
                                                    this.setState({ snvalue: e.target.value })
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem label={`设备名称`}>
                                        {getFieldDecorator(`en`, {
                                            rules: [],
                                        })(
                                            <Input
                                                style={{ float: 'left' }}
                                                suffix={suffix_en}
                                                ref={(node) => {
                                                    this.en = node
                                                }}
                                                onChange={(e) => {
                                                    this.setState({ envalue: e.target.value })
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem label={`信号名称`}>
                                        {getFieldDecorator(`cn`, {
                                            rules: [],
                                        })(
                                            <Input
                                                style={{ float: 'left' }}
                                                suffix={suffix_cn}
                                                ref={(node) => {
                                                    this.cn = node
                                                }}
                                                onChange={(e) => {
                                                    this.setState({ cnvalue: e.target.value })
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={10} style={{ display: 'flex' }}>
                                    <FormItem label={`开始时间`}>
                                        {getFieldDecorator(`st`, {
                                            rules: [],
                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledStartDate}
                                                format="YYYY-MM-DD"
                                                // value={this.state.startValue}
                                                placeholder="Start"
                                                onChange={this.onStartChange}
                                                onOpenChange={this.handleStartOpenChange}
                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label={`结束时间`} style={{ marginLeft: '10px' }}>
                                        {getFieldDecorator(`et`, {
                                            rules: [],
                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledEndDate}
                                                format="YYYY-MM-DD"
                                                placeholder="End"
                                                onChange={this.onEndChange}
                                                // open={this.state.endOpen}
                                                onOpenChange={this.handleEndOpenChange}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7} style={{ textAlign: 'left' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>

            );
        }
    }
);