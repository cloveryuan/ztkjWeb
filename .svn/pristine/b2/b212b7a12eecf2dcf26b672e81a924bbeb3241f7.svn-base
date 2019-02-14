import React from 'react';
import { Form, Row, Col, Button, Icon, DatePicker, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form';
import contentCreatStyle from '../../realTimeData/contentCreat.scss';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import http from '../../../common/api'
const FormItem = Form.Item;
const Option = Select.Option;
const isTrue = true

export interface PropsCollectionCreateForm {
    onKey?: any;
    devBtnFunc?: (props: any) => void;
    devsBtnFunc?: (props: any) => void;
    curveBtnFunc?: (props: any) => void;
    setSet?: (props: any) => void;
    show?: boolean;
    loading?: boolean;
}
export const AlarmCreatForm = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                expand: false,
                startValue: null,
                endValue: null,
                endOpen: false,
                stationlistData: [],
                equipmenttypeData: [],
                getSid: [],
                getEtp: [],
                devBtnFunc: props.devBtnFunc,
                devsBtnFunc: props.devsBtnFunc,
                curveBtnFunc: props.curveBtnFunc,
                setSet: props.setSet,
            }
        }

        handleSearch = (e) => {
            e.preventDefault();
            this.state.setSet(true)
            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }

                // Should format date value before submit.
                const values = {
                    ...fieldsValue,
                    'dts': fieldsValue['dts'].format('YYYY-MM-DD'),
                    'dte': fieldsValue['dte'].format('YYYY-MM-DD'),

                };
                let onData = {
                    mtd: 'gtwhd',
                    dts: values.dts,
                    dte: values.dte,
                    sid: values.stationlist,
                    eid: -1,
                    uid: -1,
                    stp: values.equipmenttype ? values.equipmenttype : -1,
                    idx: this.props.onKey ? Number(this.props.onKey) : 0,
                }
                if (Number(this.props.onKey) === 1) {
                    this.setState({ loading: true });
                    http.postReq(
                        '/ztmanage/a/zt/searchtotalwarn',
                        onData,
                        (data) => {
                            let searchData = [];
                            if (data.hasOwnProperty('gtwhd')) {
                                for (let i = 0; i < data.gtwhd.length; i++) {
                                    searchData.push(data.gtwhd[i]);
                                }
                                this.state.devBtnFunc(searchData)
                                this.state.setSet(false)
                            } else {
                                message.warning('无数据');
                            }

                        }
                    )

                } else if (Number(this.props.onKey) === 2) {
                    this.setState({ loading: true });
                    http.postReq(
                        '/ztmanage/a/zt/searchtotalwarn',
                        onData,
                        (data) => {
                            let searchData = [];
                            if (data.hasOwnProperty('gtwhd')) {
                                for (let i = 0; i < data.gtwhd.length; i++) {
                                    searchData.push(data.gtwhd[i]);
                                }
                                this.state.devsBtnFunc(searchData)
                                this.state.setSet(false)
                            } else {
                                message.warning('无数据');
                            }
                        }
                    )
                } else {
                    this.setState({ loading: true });
                    http.postReq(
                        '/ztmanage/a/zt/searchtotalwarn',
                        onData,
                        (data) => {
                            if (data.hasOwnProperty('gtwhd')) {
                                this.state.curveBtnFunc(data.gtwhd)
                                this.state.setSet(false)
                            } else {
                                message.warning('无数据');
                            }

                        }
                    )
                }
            });
        }
        // 局站列表
        onsilChange = (value) => {
            if (Number(value) !== -1) {
                message.warning('请选择全部');
                this.props.form.setFieldsValue({
                    stationlist: ''
                });
            }
        }
        // 设备类型
        oneitChange = (value) => {
            this.setState({
                getEtp: value
            })
        }
        toggle = () => {
            const { expand } = this.state;
            this.setState({ expand: !expand });
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
        componentDidMount() {
            http.postReq(
                '/ztmanage/f/api/lstations',
                {},
                (data) => {
                    this.setState({
                        loading: false,
                        stationlistData: data,
                    });
                }
            )
            http.postReq(
                '/ztmanage/f/api/let',
                {},
                (data) => {
                    this.setState({
                        loading: false,
                        equipmenttypeData: data,
                    });
                }
            )
        }
        componentWillUnmount() {
            this.setState = (state, callback) => {
                return;
            };
        }
        render() {
            const { startValue, endValue, endOpen } = this.state;
            const { getFieldDecorator } = this.props.form;
            // 获取局站列表
            const stationlist = this.state.stationlistData.map(
                station => <Option key={station.id}>{station.text}</Option>
            );
            // 获取设备类型
            const equipmenttype = this.state.equipmenttypeData.map(
                equipment => <Option key={equipment.value}>{equipment.text}</Option>
            );
            const { show } = this.props;
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
                                <Col span={8} style={{ display: 'flex' }}>
                                    <FormItem label={`开始时间`}>
                                        {getFieldDecorator(`dts`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择开始时间'
                                            }],
                                            initialValue: startValue
                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledStartDate}
                                                showTime={isTrue}
                                                format="YYYY-MM-DD"
                                                placeholder="Start"
                                                onChange={this.onStartChange}
                                                onOpenChange={this.handleStartOpenChange}
                                                locale={locale}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label={`结束时间`}>
                                        {getFieldDecorator(`dte`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择结束时间!',
                                            }],
                                            initialValue: endValue
                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledEndDate}
                                                showTime={isTrue}
                                                format="YYYY-MM-DD"
                                                placeholder="End"
                                                onChange={this.onEndChange}
                                                open={endOpen}
                                                onOpenChange={this.handleEndOpenChange}
                                                locale={locale}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label={`局站列表`}>
                                        {getFieldDecorator(`stationlist`, {
                                            rules: [{
                                                required: true,
                                            }],
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                                onChange={this.onsilChange}
                                            >
                                                <Option value="-1">全部</Option>
                                                {stationlist}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8} style={{ display: show ? 'none' : 'block' }}>
                                    <FormItem label={`设备类型`}>
                                        {getFieldDecorator(`equipmenttype`, {
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                                onChange={this.oneitChange}
                                            >
                                                <Option value="-1">全部</Option>
                                                {equipmenttype}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row
                                style={{ display: this.state.expand ? 'block' : 'none', textAlign: 'right' }}
                            >
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Row>
                        </Form>
                    </div>
                </div>

            );
        }
    }
);
import { DomRender } from '../../../common/domrender'
import registerServiceWorker from '../../../common/registerServiceWorker'

DomRender(AlarmCreatForm)
registerServiceWorker()