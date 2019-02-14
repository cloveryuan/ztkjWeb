import * as React from 'react';
import { Table } from 'antd';

export class TableContent extends React.Component<any, any> {
    columns = [{
        title: '局站名称',
        dataIndex: 'stationname',
        width: '10%',
    }, {
        title: '局房名称',
        dataIndex: 'housename',
        width: '15%',
    }, {
        title: '设备名称',
        dataIndex: 'equipmentname',
        width: '10%',
    }, {
        title: '信号名称',
        dataIndex: 'signalname',
        width: '10%',
    }, {
        title: '最大值',
        dataIndex: 'maxvalue',
        width: '10%',
    }, {
        title: '最大值时间',
        dataIndex: 'maxtime',
        width: '10%',
    }, {
        title: '最小值',
        dataIndex: 'minvalue',
        width: '5%',
    }, {
        title: '最小值时间',
        dataIndex: 'mintime',
        width: '10%',
    }, {
        title: '平局值',
        dataIndex: 'avevalue',
        width: '10%',
    }, {
        title: '统计日期',
        dataIndex: 'recorddate',
        width: '10%',
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
