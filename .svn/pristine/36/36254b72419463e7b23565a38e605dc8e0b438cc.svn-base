import * as React from 'react';
import { Layout, Spin, Button, message } from 'antd';
import { SearchCompon } from './content/search';
import { TableContent } from './content/table'
import { Add } from './modal/add'
import { Airconfig } from './modal/airconfig'
import http from '../../common/api';

const { Content } = Layout;

export interface Propscfg {
}

interface Statecfg {
    data?: any,
    infodatas?: any,
    search?: boolean,
    addvisible?: boolean,
    configvisible?: boolean
}
export class Aircondition extends React.Component<Propscfg, Statecfg> {
    constructor(props: Propscfg) {
        super(props)
        this.state = {
            search: false, // 点击查询就会变true 
            data: [],
            infodatas: [],
            addvisible: false,
            configvisible: false
        };
    }
    getdatas = (scaption) => {
        this.setState({ search: false })
        http.postReq(
            '/ztmanage/f/kol/tbaircondition/',
            {'mtd': 'list', 'scaption': scaption},
            (data) => {
                this.setState(
                    {
                        data: data.list,
                    },
                    () => {
                        this.setState({ search: true });
                    })
            }
        )
    }
    componentDidMount() {
        this.getdatas(null)
    }

    addModalcalcle = () => {
        this.setState({ addvisible: false })
    }
    // 具体参数配置获取 
    getInfo = (aid) => {
        http.postReq(
            '/ztmanage/f/kol/tbaircondition/',
            { 'mtd': 'info', aid: aid },
            (data) => {
                if ( data.rtn === 1) {
                    this.setState(
                        {
                            infodatas: data.info,
                            search: true
                        })
                } else {
                    message.error('获取失败')
                }
                
            }
        )
    }
    // 删除
    handleDelete = (key) => {
        http.postReq(
            '/ztmanage/f/kol/tbaircondition/',
            { 'mtd': 'del', aid: key },
            (data) => {
                if ( data.rtn === 1) {
                    this.getdatas(null)
                } else {
                    message.error('删除失败')
                }
            }
        )
    }
    configModalshow = (aid) => {
        this.setState({ configvisible: true });
        this.getInfo(aid)
    }
    configModalcalcle = () => {
        this.setState({ configvisible: false })
    }

    render() {
        const { addvisible, configvisible, infodatas } = this.state
        return (
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    overflow: 'auto',
                    boxSizing: 'border-box'
                }}
            >
                {
                    (this.state.data.length > 0 || this
                        .state.search) ?
                        <div>
                            <SearchCompon
                                getdatas={this.getdatas}
                            />
                            <div style={{ padding: '0 26px 16px 16px' }}>
                                <Button
                                    type="primary"
                                    ghost={true}
                                    style={{ marginRight: '10px' }}
                                    onClick={() => {
                                        this.setState({ addvisible: true })
                                    }}
                                >
                                    增加
                                </Button>
                            </div>
                            <TableContent
                                configModalshow={this.configModalshow}
                                handleDelete={this.handleDelete}
                                {...this.state}
                            />
                            <Add
                                addvisible={addvisible}
                                addModalcalcle={this.addModalcalcle}
                                getdatas={this.getdatas}
                            />
                            <Airconfig
                                configvisible={configvisible}
                                configModalcalcle={this.configModalcalcle}
                                getdatas={this.getdatas}
                                infodatas={infodatas}
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

DomRender(Aircondition)
registerServiceWorker()