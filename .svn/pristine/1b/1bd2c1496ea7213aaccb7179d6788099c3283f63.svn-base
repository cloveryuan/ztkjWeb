import * as React from 'react';
import { Icon, Table, Tooltip, Button, Radio } from 'antd';
import '../realTimeAlarm.scss'
const isTrue = true;
const selectedData = [];
const RadioGroup = Radio.Group;

export class TableContent extends React.Component<any, any> {
    columns = [{
        title: '开始时间',
        dataIndex: 'starttime',
        width: '12%',
    }, {
        title: '局站',
        dataIndex: 'stationname',
        width: '13%',
    }, {
        title: '设备',
        dataIndex: 'equipmentname',
        width: '10%',
    }, {
        title: '信号',
        dataIndex: 'signalname',
        width: '14%',
    }, {
        title: '告警信息',
        dataIndex: 'meanings',
        width: '9%',
    }, {
        title: '触发值',
        dataIndex: 'triggervalue',
        width: '5%',
    }, {
        title: '确认',
        dataIndex: 'confirmtime',
        width: '12%',
    }, {
        title: '结束时间',
        dataIndex: 'endtime',
        width: '12%',
    }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
            return (
                <div className="editable-row-operations">
                    <Tooltip placement="top" title="告警确认">
                        <Icon
                            type="check-circle-o"
                            style={{ marginRight: '15px', fontSize: '16px' }}
                            onClick={() => this.props.getDetailId(record.alarmno)}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="告警强制结束" arrowPointAtCenter={isTrue}>
                        <Icon
                            type="exclamation-circle-o"
                            style={{ marginRight: '15px', fontSize: '16px' }}
                            onClick={() => this.props.getEndId(record.alarmno)}
                        />
                    </Tooltip>
                </div>

            );

        },
    }];
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                selectedData.length = 0;
                selectedData.push(selectedRowKeys)
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            })
        };
        return (
            <div>
                <div style={{ padding: '10px 26px 10px 0' }}>
                    <Button
                        type="primary"
                        ghost={isTrue}
                        style={{ marginRight: '10px' }}
                        onClick={() => this.props.getDetailAll(selectedData)}
                    >
                        告警确认
                    </Button>
                    <Button
                        type="primary"
                        ghost={isTrue}
                        onClick={() => this.props.getEndAll(selectedData)}
                    >
                        告警强制结束
                    </Button>
                </div>
                <Table
                    bordered={true}
                    rowSelection={rowSelection}
                    columns={this.columns}
                    rowKey={record => record.alarmno}
                    dataSource={this.state.data}
                    pagination={{
                        showTotal: (total) => `Total ${total} datas`,
                        defaultPageSize: this.state.page,
                        pageSize: this.state.page
                    }}
                    loading={this.state.loading}
                    size="small"
                    rowClassName={(record) => {
                        switch (record.alarmgrade) {
                            case 1:
                                return 'alarmgradeColor1';
                                break;
                            case 2:
                                return 'alarmgradeColor2';
                                break;
                            case 3:
                                return 'alarmgradeColor3';
                                break;
                            default:
                                return '';
                                break
                        }
                    }}
                />
                <div style={{ marginTop: '-40px' }}>
                    每页展示数据：
                    <RadioGroup
                        className="radios"
                        name="radiogroup"
                        defaultValue={1}
                        onChange={(e) => {
                            switch (e.target.value) {
                                case 1:
                                    return this.setState({ page: 10 })
                                    break;
                                case 2:
                                    return this.setState({ page: 20 })
                                    break;
                                case 3:
                                    return this.setState({ page: 30 })
                                    break;
                                case 4:
                                    return this.setState({ page: 40 })
                                    break;
                                default:
                                    return this.setState({ page: 10 })
                                    break;
                            }
                        }}
                    >
                        <Radio value={1} >10条</Radio>
                        <Radio value={2}>20条</Radio>
                        <Radio value={3}>30条</Radio>
                        <Radio value={4}>40条</Radio>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}