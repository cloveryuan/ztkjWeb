import React from 'react';
import { Form, Row, Col, Button, Icon, DatePicker, Select, message, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import http from '../../../common/api';
import contentCreatStyle from '../../realTimeData/contentCreat.scss'
const FormItem = Form.Item;
const Option = Select.Option;
const isTrue = true

export interface PropsCollectionCreateForm {
    visible?: boolean;
    selectBtnFunc?: (props: any) => void;
    curveBtnFunc?: (props: any) => void;
    setSet?: (props: any) => void;
    onCancel?: () => void;
    show?: boolean;
    onKey?: any;
    loading?: boolean;
}
export const PublicForm = Form.create()(
    class extends React.Component <PropsCollectionCreateForm & FormComponentProps, any> {
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                expand: false,
                startValue: null,
                endValue: null,
                endOpen: false,
                fetching: false,
                stationlistData: [],
                equipmenttypeData: [],
                equipmentlistData: [],
                signallistData: [],
                getEid: [],
                getStp: [],
                getSid: [],
                getEtp: [],
                selectBtnFunc: props.selectBtnFunc,
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
            // let uid = Number(values.signallist.substr(12, 2)) * 10000000 + Number(values.signallist.substr(18, 7))
                let onData = {
                    mtd: 'gshd',
                    dts: values.dts,
                    dte: values.dte,
                    sid: values.stationlist,
                    // eid: Number(values.equipmentlist.substr(2)),
                    eid: values.equipmentlist,
                    uid: values.signallist,
                    rty: this.props.onKey ? Number(this.props.onKey) : 0,
                }
                if (Number(this.props.onKey) === 1) {
                    http.postReq(
                        '/ztmanage/a/zt/historydata',
                        onData,
                        (data) => {
                            if (data.hasOwnProperty('gshd')) {
                                this.state.curveBtnFunc(data.gshd)
                                this.state.setSet(false)
                            } else {
                                message.warning('无数据');
                            }
                        }
                    )
                } else {
                    http.postReq(
                        '/ztmanage/a/zt/historydata',
                        onData,
                        (data) => {
                            let searchData = [];
                            if (data.hasOwnProperty('gshd')) {
                                for (let i = 0; i < data.gshd.length; i++) {
                                    searchData.push(data.gshd[i]);
                                }
                                this.state.selectBtnFunc(searchData)
                                this.state.setSet(false)
                            } else {
                                message.warning('无数据');
                            }

                        }
                    )
                }
            });
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
            return (
                endValue > moment(startValue).add(6, 'M') ||
                endValue.valueOf() <= startValue.valueOf()
            );
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
        // 局站列表
        onsilChange = (value) => {
            this.setState({
                getSid: value,
            })
            this.props.form.setFieldsValue({
                equipmentlist: '',
                signallist: ''
            });
        }
        // 设备类型
        oneitChange = (value) => {
            this.setState({
                getEtp: value
            })
            this.props.form.setFieldsValue({
                equipmentlist: '',
                signallist: ''
            });
        }
        // 设备列表
        oneilChange = (value) => {
            this.setState({
                getEid: value
            })

        }
        // 获取设备列表焦点
        oneilFocus = () => {
            this.setState({ fetching: true });
            let getEil = {
                mtd: 'leqp',
                sid: this.state.getSid,
                etp: this.state.getEtp,
                all: 0
            };
            http.postReq(
                '/ztmanage/a/zt/reportmtd',
                getEil,
                (data) => {
                    if (data.hasOwnProperty('leqp')) {
                        this.setState({
                            fetching: false,
                            equipmentlistData: data.leqp
                        });
                    } else {
                        message.warning('无数据');
                    }

                }
            )

        }
        // 信号类型
        onsitChange = (value) => {
            this.setState({
                getStp: value
            })
        }
        // 获取信号列表焦点
        onsilFocus = () => {
            this.setState({ fetching: true });
            let getSit = {
                mtd: 'lsig',
                sid: this.state.getSid,
                eid: Number(this.state.getEid.substr(2)),
                etp: -1,
                stp: this.state.getStp
            };
            if (this.state.equipmentlistData.length > 0) {
                http.postReq(
                    '/ztmanage/a/zt/reportmtd',
                    getSit,
                    (data) => {
                        if (data.hasOwnProperty('lsig')) {
                            this.setState({
                                fetching: false,
                                signallistData: data.lsig
                            });
                        } else {
                            message.warning('无数据');
                        }
                    }
                )
            } else {
                message.warning('请选择设备');
            }
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
        render() {
            const { startValue, endValue, endOpen, fetching } = this.state;
            const { getFieldDecorator } = this.props.form;
            const { show } = this.props;
            // 获取局站列表
            const stationlist = this.state.stationlistData.map(
                station => <Option key={station.id}>{station.text}</Option>
            );
            // 获取设备类型
            const equipmenttype = this.state.equipmenttypeData.map(
                equipment => <Option key={equipment.value}>{equipment.text}</Option>
            );
            // 获取设备列表
            const equipmentlist = this.state.equipmentlistData.map(
                equipmentl =>
                    <Option key={equipmentl.value}>{equipmentl.text}</Option>
            );
            // 获取信号列表
            const signallist = this.state.signallistData.map(
                signal => <Option key={signal.value}>{signal.text}</Option>
            );
            return (
                <div className={contentCreatStyle.box}>
                    <div className={contentCreatStyle.boxHeader}>
                        <h3 className={contentCreatStyle.boxTitle}>筛选项</h3>
                        <div className={contentCreatStyle.boxTools}>
                            <a className={contentCreatStyle.btn} data-widget="collapse" onClick={this.toggle}>
                                <Icon type={this.state.expand ? 'minus' : 'plus'} style={{fontSize: '18px'}}/>
                            </a>
                        </div>
                    </div>
                    <div className={contentCreatStyle.boxBody}>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={this.handleSearch}
                            style={{padding: '5px'}}
                        >
                            <Row gutter={24} style={{ display: this.state.expand ? 'block' : 'none' }}>
                                <Col span={8} style={{display: 'flex'}}>
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
                                                message: '请选择局站列表'
                                            }]
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
                                                style={{float: 'left' }}
                                                onChange={this.oneitChange}
                                            >
                                                {equipmenttype}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label={`设备列表`}>
                                        {getFieldDecorator(`equipmentlist`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择设备列表'
                                            }],
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                                onChange={this.oneilChange}
                                                onFocus={this.oneilFocus}
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                            >
                                                {equipmentlist}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label={`信号类型`}>
                                        {getFieldDecorator(`signaltype`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择信号类型'
                                            }],
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                                onChange={this.onsitChange}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">开关量</Option>
                                                <Option value="2">模拟量</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label={`信号列表`}>
                                        {getFieldDecorator(`signallist`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择信号列表'
                                            }],
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                                onFocus={this.onsilFocus}
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                            >
                                                {signallist}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row
                                style={{ display: this.state.expand ? 'block' : 'none', textAlign: 'right' }}
                            >
                                <Button type="primary" style={{marginRight: 15}}>导出</Button>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Row>
                        </Form>
                    </div>
                </div>

            );
        }
    }
);