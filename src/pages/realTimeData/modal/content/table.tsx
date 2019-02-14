import * as React from 'react';
import { Table, Popconfirm } from 'antd';

export class TableContent extends React.Component<any, any> {
    columns = [{
        title: '设备状态',
        dataIndex: 'estate',
        width: '12%',
        render: (text, record) => {
            return (
                <div>
                    {this.getEstate(record)}
                </div>
            )
        },
        editable: true,
    }, {
        title: '告警等级',
        dataIndex: 'wgrade',
        width: '25%',
        render: (text, record) => {
            return (
                <div>
                    {this.getWgrade(record)}
                </div>
            )
        },
        editable: true,
    }, {
        title: '符号',
        dataIndex: 'sascii',
        width: '12%',
        editable: true,
    }, {
        title: '比较值',
        dataIndex: 'svalue',
        width: '12%',
        editable: true,
    }, {
        title: '时延',
        dataIndex: 'wdelay',
        width: '12%',
        editable: true,
    }, {
        title: '告警信息',
        dataIndex: 'winfo',
        width: '12%',
        editable: true,
    }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
            return (
                <div className="editable-row-operations">
                    {/* {console.log(this.props.onData)} */}
                    <span>
                        <a
                            onClick={() => this.props.edit(record)}
                            style={{ marginRight: 15 }}
                            href="javascript:void(0)"
                        >
                            编辑
                        </a>
                    </span>
                    <span>
                        <Popconfirm title="确定删除吗?" onConfirm={() => this.props.onDelete(record.condid)}>
                            <a href="javascript:;" >删除</a>
                        </Popconfirm>
                    </span>
                </div>
            );
        },
    }];
    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            pagination: {},
            loading: false,
            infoData: {},
            data: [],
            queryInfo: {    // 设置最初一页显示多少条
                pageSize: 5
            },
        };
    }
    // 转换告警信息等级
    getWgrade = (record) => {
        const children = [];
        if (Number(record.wgrade) === 0) {
            children.push('正常')
        } else if (Number(record.wgrade) === 1) {
            children.push('一般告警')
        } else if (Number(record.wgrade) === 2) {
            children.push('重要告警')
        } else if (Number(record.wgrade) === 3) {
            children.push('紧急告警')
        }
        return children;
    }
    // 转换设备状态
    getEstate = (record) => {
        const children = [];
        if (Number(record.estate) === 0) {
            children.push('不工作')
        } else if (Number(record.estate) === 1) {
            children.push('工作')
        } else if (Number(record.estate) === 2) {
            children.push('备用')
        }
        return children;
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
    }

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        const { onData } = this.props;

        const datas = onData.filter((item) => {
            // console.log(item.condid)
            return item.condid !== undefined
        })
        return (
            <Table
                columns={this.columns}
                rowKey={(record) => record.condid ? record.condid : 0}
                dataSource={datas}
                pagination={this.state.pagination}
                loading={this.state.loading}
                size="small"
            />
        )
    }
}
