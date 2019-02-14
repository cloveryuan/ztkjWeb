import * as React from 'react';
import { Icon, Table, Tooltip, Popconfirm } from 'antd';
import '../aircondition.scss'

export class TableContent extends React.Component<any, any> {
    colums = [{
        title:
            <div style={{ textAlign: 'center' }}>设备名称<br />(equipment name)</div>
        ,
        dataIndex: 'scaption',
        width: '40%'
    }, {
        title:
            < div style={{ textAlign: 'center' }}> 空调参数配置 < br /> (configuration parameter)</div >
        ,
        dataIndex: 'operation',
        render: (text, record) => {
            return (
                <div>
                    <Tooltip placement="top" title="参数配置">
                        <Icon
                            type="setting"
                            style={{ marginLeft: '20px' }}
                            onClick={() => { this.props.configModalshow(record.iair_id) }}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                        <Popconfirm title="确定删除?" onConfirm={() => this.props.handleDelete(record.iair_id)}>
                            <Icon
                                type="delete"
                                style={{ marginLeft: '20px' }}
                            />
                        </Popconfirm>
                        
                    </Tooltip>
                </div>
            )
        }
    }]
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {

        return (
            <div>
                <Table
                    bordered={true}
                    columns={this.colums}
                    rowKey={record => record.iair_id}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}