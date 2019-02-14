import * as React from 'react';
import { Layout, Spin, message } from 'antd';
import { ContentCreatForm } from './content/ContentCreatForm';
import { TableContent } from './content/table'
import { Configure } from './modal/Configure';
import { ControlGreatForm } from './modal/ControlGreatForm';
import { Link } from './modal/link'
import { TendencyChart } from
    './modal/modal/tendency/tendencyChart'
import { Videoshow } from './modal/modal/video/video'
import './contentCreat.scss'
import Cookies from 'js-cookie'
import http from '../../common/api';
const { Content } = Layout;

interface StateTable {
    loading?: boolean;
    uploading?: boolean;
    visible?: boolean;
    show?: boolean;
    data?: any;
    pagination?: any;
    configData?: any;
    expand?: boolean;
    sid?: any;
    pageIndex?: any;
    propData?: any;
    link?: any;
    block?: boolean;
    currentThree?: any,
    search?: boolean
    page: number,
    newcolumns: any,
    seltoggle?: boolean,
    tendencshow?: boolean,
    options: Object,
    optionsdata?: boolean,
    videotoggle?: boolean,
    videoSrc: string,
    nom3u8: boolean
}

export interface PropsConfigure {
    collapsed?: boolean;
    defaultKey?: string;
}

export class ContentCreat extends React.Component<PropsConfigure, StateTable> {
    private formRef: any = null;
    private interval: any = null;
    private intervalsearch: any = null;
    constructor(props: PropsConfigure) {
        super(props)
        this.state = {
            visible: false,
            show: false,
            data: [],
            pagination: {},
            pageIndex: 1,
            loading: false,
            configData: {},
            expand: false,
            sid: [],
            propData: {},
            link: false,
            block: false,
            currentThree: {},
            search: false,
            page: 10,
            newcolumns: [], // 最后主页面展示的column
            seltoggle: false, // 切换选择列
            tendencshow: false, // 切换显示隐藏趋势图模态框
            options: {},
            optionsdata: false, // 初始options没有值，所以为false
            videotoggle: false, // video初始状态为隐藏
            videoSrc: '', // video地址
            nom3u8: true
        }
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // table 里面的
    toggleselect = () => {
        const { seltoggle } = this.state
        this.setState({ seltoggle: !seltoggle })
    }

    fetch = (pageCurrent) => {
        this.setState({ search: false })
        let el = parent.document.getElementById('dataBox') as HTMLElement;
        let onData = el.getAttribute('data');
        if (Number(pageCurrent)) {
            http.postReq(
                '/ztmanage/f/api/qryc',
                { 'si': onData, 'en': '', 'cn': '', 'tg': '' },
                (data) => {
                    // alert(onData + data)
                    const pagination = { ...this.state.pagination };
                    if (data.length === 0) {
                        return
                    }
                    console.log(typeof data)
                    this.setState(
                        {
                            loading: false,
                            data: data,
                            pagination,
                            sid: onData
                        })
                },
                () => {
                    confirm('数据获取失败,请重新登录')
                    console.log('错误')
                    Cookies.remove('username');
                    Cookies.remove('china');
                    window.parent.location.href = './index.html'
                    return
                },
                () => { this.setState({ search: true }) }
            )
            clearInterval(this.intervalsearch)
        } else {
            const pagination = { ...this.state.pagination };
            this.setState(
                {
                    loading: false,
                    data: pageCurrent,
                    pagination,
                    sid: onData
                },
                () => { this.setState({ search: true }) })
            return this.interval && clearInterval(this.interval);
        }
    }

    componentDidMount() {
        // alert('realtime')
        const { pageIndex } = this.state
        this.fetch(pageIndex);
        this.interval = setInterval(() => { this.fetch(pageIndex); this.getradiocheck() }, 20000)
    }
    // 定时器启动后，选中每页显示多少条数据，不会被刷新成初始
    getradiocheck = () => {
        let radiocheck = document.getElementsByClassName('ant-radio-checked')[0] as HTMLElement
        let el = radiocheck ? radiocheck.getElementsByClassName('ant-radio-input')[0] as HTMLInputElement : ''
        let checkvalue = radiocheck ? el['value'] : ''
        // console.log(checkvalue)
        switch (checkvalue) {
            case '1':
                return this.setState({ page: 10 })
                break;
            case '2':
                return this.setState({ page: 20 })
                break;
            case '3':
                return this.setState({ page: 30 })
                break;
            case '4':
                return this.setState({ page: 40 })
                break;
            default:
                return this.setState({ page: 10 })
                break;
        }
    }

    // 查询调用
    search = (datas) => {
        http.postReq(
            '/ztmanage/f/api/qryc',
            datas,
            (searchData) => {
                this.fetch(searchData)
            }
        )
    }
    // 查询定时器
    searchInter = (datas) => {
        clearInterval(this.intervalsearch)
        this.getradiocheck()
        this.intervalsearch = setInterval(() => { this.search(datas); this.getradiocheck() }, 20000);
    }

    saveBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.config(searchData)
        })
    }
    config = (record) => {
        let Rdata = {
            'sid': record.stationid,
            'eid': record.equipmentid,
            'cid': record.signalid
        };
        http.getReq(
            '/ztmanage/a/zt/config',
            Rdata,
            (data) => {
                this.setState({
                    visible: true,
                    loading: false,
                    propData: record,
                    configData: data
                });
                if (Object.keys(data).length !== 0) {
                    let property_value_ = parseInt(data.property, 10);
                    for (var i = 0; i < 10; i++) {
                        var property_id_ = 'property_' + i;
                        let check = document.getElementById(property_id_) as HTMLInputElement;
                        let alarm = document.getElementById('property-off-grp') as HTMLElement;

                        if (check) {
                            let checked_ = (property_value_ & (1 << i));

                            if (0 === i) {
                                if (checked_) {
                                    alarm.style.display = 'block'
                                } else {
                                    alarm.style.display = 'none'
                                }
                            }
                            if (checked_ === 0) {
                                let el = check.parentNode as HTMLElement;
                                el.classList.remove('ant-checkbox-checked');
                            } else {
                                let el = check.parentNode as HTMLElement;
                                el.classList.add('ant-checkbox-checked');

                            }
                        }
                    }
                }
            }
        )
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    ctlHandleCancel = () => {
        this.setState({ show: false });
    }
    ctlHandleCreate = () => {
        const form = this.formRef.getForm();
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({ show: false });
        });
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
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
    configuration = (res) => {
        this.setState({
            link: true
        })
    }
    linkCancle = () => {
        this.setState({
            link: false
        })
    }
    //  点击控制操作
    control = (record) => {
        this.setState({ show: true, currentThree: record });
    }
    //  控制操作把每个设备的局站，设备号，信号传给子组件
    controlConfig = () => {
        const form = this.formRef.getForm();
        form.validateFields((err, values) => {
            console.log(values)
            let Rdata = {
                'sid': values.stationid,
                'eid': values.equipmentid,
                'cid': values.signalid,
                'password': values.userpassword,
                'controlvalue': values.controlvalue
            };
            if (err) {
                return;
            }
            http.postReq(
                '/ztmanage/a/zt/config?mtd=csig',
                Rdata,
                (res) => {
                    console.log(res)
                }
            )
            this.setState({ show: false });
        })
    }
    // 模态框曲线趋势
    modalOk = (record) => {
        this.setState({ optionsdata: true })
        http.postReq(
            '/ztmanage/f/wechatapi/',
            {
                mtd: 'scha',
                sid: record.stationid,
                eid: record.equipmentid,
                cid: record.signalid,
                right: -1,
                uid: 2,
                usid: 1
            },
            (data) => {
                console.log(data.rtn)
                if (data.rtn === 1) {
                    this.setState({ options: data.scha, tendencshow: true, optionsdata: false })
                } else {
                    message.error(data.rtn);
                    this.setState({ options: {}, tendencshow: false, optionsdata: false })
                }
            }
        )
    }
    modalCancle = () => {
        this.setState({ tendencshow: false, optionsdata: false })
    }
    // 模态框曲线趋势结束
    // 视频操作
    videoShow = (record, index) => {
        
        if (index % 2 === 0) {
            this.setState(
                {
                    videotoggle: true,
                    videoSrc: 'http://61.155.96.68:10800/hls/stream_1/stream_1_live.m3u8'
                    // videoSrc: 'http://hls.open.ys7.com/openlive/f4529bcff56f4e0bba5bd1b1813658da.m3u8'
                },
                () => {
                    const type = this.state.videoSrc.lastIndexOf('.m3u8')
                    if (type <= -1) {
                        this.setState({ nom3u8: true })
                    } else {
                        this.setState({ nom3u8: false })
                    }
                })
        } else {
            this.setState(
                {
                    videotoggle: true,
                    videoSrc: ''
                },
                () => {
                    const type = this.state.videoSrc.lastIndexOf('.m3u8')
                    if (type <= -1) {
                        this.setState({ nom3u8: true })
                    } else {
                        this.setState({ nom3u8: false })
                    }
                })
        }
    }

    videoHide = () => {
        this.setState({ videotoggle: false, videoSrc: '' })
    }
    // 视频操作结束

    render() {
        const { options } = this.state
        return (

            <Content
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                {/* {console.log(this.state.data.length > 0 || this.state.search)} */}
                {
                    (this.state.data.length > 0 || this.state.search) ?
                        <div>
                            <ContentCreatForm
                                onSid={this.state.sid}
                                fetch={this.fetch}
                                toggle={this.toggle}
                                expand={this.state.expand}
                                searchInter={this.searchInter}
                                search={this.search}
                                endata={this.state.data}
                            />

                            <TableContent
                                config={this.config}
                                control={this.control}
                                configuration={this.configuration}
                                modaltendencyOk={this.modalOk}
                                {...this.state}
                                toggleselect={this.toggleselect}
                                videoShow={this.videoShow}
                            />
                            <Configure
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onfetch={this.fetch}
                                onInfo={this.state.configData}
                                onSid={this.state.sid}
                                propData={this.state.propData}
                                saveBtnFunc={this.saveBtnFunc}
                                block={this.state.block}
                            />
                            <ControlGreatForm
                                ref={(node) => {
                                    this.formRef = node
                                }}
                                visible={this.state.show}
                                onCancel={this.ctlHandleCancel}
                                onCreate={this.controlConfig}
                                currentThree={this.state.currentThree}
                            />
                            <TendencyChart
                                visible={this.state.tendencshow}
                                modalCancle={this.modalCancle}
                                options={options}
                            />
                            {
                                this.state.optionsdata ? <div className="optionsspin">
                                    <Spin size="large" />
                                </div> : ''
                            }
                            <Link
                                link={this.state.link}
                                onCancel={this.linkCancle}
                            />
                            <Videoshow
                                videotoggle={this.state.videotoggle}
                                videoHide={this.videoHide}
                                videoSrc={this.state.videoSrc}
                                nom3u8={this.state.nom3u8}
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

DomRender(ContentCreat)
registerServiceWorker()