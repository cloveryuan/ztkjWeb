import * as React from 'react';
import { Table } from 'antd';

export class TableContent extends React.Component<any, any> {
    columns = [{
        title: '局站名称',
        dataIndex: 'stationname',
        width: '10%',
    }, {
        title: '设备名称',
        dataIndex: 'equipmentname',
        width: '8%',
    }, {
        title: '信号名称',
        dataIndex: 'signalname',
        width: '10%',
    }, {
        title: '设备类型',
        dataIndex: 'equipmenttypename',
        width: '6%',
    }, {
        title: '信号种类',
        dataIndex: 'signaltypename',
        width: '8%',
    }, {
        title: '告警等级',
        dataIndex: 'warnlevelname',
        width: '8%',
    }, {
        title: '触发值',
        dataIndex: 'triggervalue',
        width: '6%',
    }, {
        title: '告警消息',
        dataIndex: 'warnmsg',
        width: '8%',
    }, {
        title: '发生时间',
        dataIndex: 'starttime',
        width: '8%',
    }, {
        title: '结束时间',
        dataIndex: 'endtime',
        width: '8%',
    }, {
        title: '持续时间',
        dataIndex: 'recordtime',
        width: '8%',
    }, {
        title: '确认人',
        dataIndex: 'confirmer',
        width: '6%',
    }, {
        title: '确认时间',
        dataIndex: 'confirmtime',
        width: '8%',
    }];
    constructor(props: any) {
        super(props)
        this.state = props
    }
    getKey(record: any, index: any) {
        return index;
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={this.getKey}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
            />
        )
    }
}
