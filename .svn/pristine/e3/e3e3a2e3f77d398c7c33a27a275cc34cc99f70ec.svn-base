import * as React from 'react';
import { Table } from 'antd';

export class DevsTable extends React.Component<any, any> {
    columns = [{
        title: '局站名称',
        dataIndex: 'stationname',
        width: '10%',
    }, {
        title: '设备类型',
        dataIndex: 'spectypename',
        width: '15%',
    }, {
        title: '一般告警',
        dataIndex: 'level1count',
        width: '10%',
    }, {
        title: '重要告警',
        dataIndex: 'level2count',
        width: '10%',
    }, {
        title: '紧急告警',
        dataIndex: 'level3count',
        width: '10%',
    }, {
        title: '合计',
        dataIndex: 'totalcount',
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
                dataSource={this.state.devs}
                pagination={this.state.pagination}
                loading={this.state.loading}
            />
        )
    }
}