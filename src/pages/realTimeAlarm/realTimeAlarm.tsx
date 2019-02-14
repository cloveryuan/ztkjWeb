import * as React from 'react';
import { Layout, Spin } from 'antd';
import http from '../../common/api';
import Cookies from 'js-cookie'
const { Content } = Layout;
import { AlarmGreateForm } from './content/alarmGreateForm';
import { TableContent } from './content/table'
import './realTimeAlarm.scss'

interface StateTable {
    loading?: boolean;
    uploading?: boolean;
    data?: any;
    page: number
}
export class RealTimeAlarm extends React.Component<StateTable, any> {
    state = {
        visible: false,
        data: [],
        page: 10,
        pagination: {},
        pageIndex: 1,
        loading: false,
        infoData: {},
        areaId: [],
        selectedRowKey: [],
        confirmer: Cookies.get('username'),
        search: false
    };
    fetch = (pageCurrent) => {
        let searchData = [];
        for (let i = 0; i < pageCurrent.length; i++) {
            searchData.push(pageCurrent[i]);
        }
        if (Number(pageCurrent)) {
            http.postReq(
                '/ztmanage/a/zt/warnMsg',
                { mtd: 'rwarn' },
                (data) => {
                    if (data.rtn === 1) {
                        const pagination = { ...this.state.pagination };
                        this.setState(
                            {
                                loading: false,
                                data: data.rwarn ? data.rwarn : [],
                                pagination,
                                search: true
                            })
                    }
                })
        }
        this.setState({ loading: false, data: searchData }, () => { console.log(this.state.data) })
    }
    componentDidMount() {
        const { pageIndex } = this.state
        this.fetch(pageIndex);
    }
    // 告警确认
    getDetailId = (id) => {
        http.postReq(
            '/ztmanage/a/zt/warnmtd',
            { mtd: 'uwarn', ftag: 0, confirmer: this.state.confirmer, nolist: id },
            (data) => {
                if (data.rtn === 1) {
                    this.setState({ loading: false }, () => {
                        this.fetch(1)
                    })
                }
            }
        )
    }
    // 告警强制结束
    getEndId = (id) => {
        http.postReq(
            '/ztmanage/a/zt/warnmtd',
            { mtd: 'uwarn', ftag: 1, confirmer: this.state.confirmer, nolist: id },
            (data) => {
                if (data.rtn === 1) {
                    this.setState({ loading: false }, () => {
                        this.fetch(1)
                    })
                }
            }
        )
    }
    // 全选告警确认
    getDetailAll = (selectedData) => {
        let list = selectedData[0].join(':');
        http.postReq(
            '/ztmanage/a/zt/warnmtd',
            { mtd: 'uwarn', ftag: 0, confirmer: this.state.confirmer, nolist: list },
            (data) => {
                if (data.rtn === 1) {
                    this.setState({ loading: false }, () => {
                        this.fetch(1)
                    })
                }
            }
        )
    }
    // 全选告警强制结束
    getEndAll = (selectedData) => {
        let list = selectedData[0].join(':');
        http.postReq(
            '/ztmanage/a/zt/warnmtd',
            { mtd: 'uwarn', ftag: 1, confirmer: this.state.confirmer, nolist: list },
            (data) => {
                if (data.rtn === 1) {
                    this.setState({ loading: false }, () => {
                        this.fetch(1)
                    })
                }
            },
            '',
            () => { this.setState({ search: true }) }
        )
    }

    selectBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.fetch(searchData)
            this.setState({ search: true })
        })
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    render() {
        return (
            <Content
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    overflow: 'auto',
                    boxSizing: 'border-box'
                }}
            >
                {
                    this.state.data.length > 0 || this.state.search ?
                        <div>
                            <AlarmGreateForm
                                selectBtnFunc={this.selectBtnFunc}
                            />
                            <TableContent
                                {...this.state}
                                getDetailId={this.getDetailId}
                                getEndId={this.getEndId}
                                getDetailAll={this.getDetailAll}
                                getEndAll={this.getEndAll}
                            />
                        </div> : <div className="loadingpic">
                            <Spin size="large" />
                        </div>
                }
            </Content>
        )
    }
}
import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(RealTimeAlarm)
registerServiceWorker()