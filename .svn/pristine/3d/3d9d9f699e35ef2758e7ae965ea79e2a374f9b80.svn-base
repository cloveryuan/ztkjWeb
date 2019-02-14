import * as React from 'react';
import { Table, Col } from 'antd';
export class RightTable extends React.Component<any, any> {
    columns = [{
        title: 'ID',
        dataIndex: 'signalid',
        width: '20%'
    }, {
        title: '名称',
        dataIndex: 'signalname',
        width: '80%'
    }];
    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            pagination: {    // 设置最初一页显示多少条
                pageSize: 5
            },
        }
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        return (
            <Col span={18} style={{ marginLeft: '0px' }}>
                <div
                    style={{
                        borderBottom: '1px solid #e8e8e8',
                        borderLeft: '1px solid #e8e8e8',
                        color: '#0E2D5F',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        lineHeight: '20px',
                        background: '#E0ECFF',
                        paddingLeft: '5px',
                        boxSizing: 'border-box'
                    }}
                >
                    信号
                </div>
                <Table
                    columns={this.columns}
                    rowKey="signalid"
                    dataSource={this.props.tableData}
                    size="small"
                    pagination={this.state.pagination}
                    rowClassName={() => { return 'rows' }}
                    locale={{ emptyText: '请选择设备' }}
                    onRow={(record: any, index) => {
                        return {
                            onDoubleClick: () => {
                                this.props.onTableItemClick(record)
                            },
                        }
                    }}
                />
            </Col>
        );
    }
}