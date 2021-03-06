import * as React from 'react';
import { Icon, Table, Tooltip, Radio, Form, Checkbox } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import '../contentCreat.scss'
import '../../../iconfont/iconfont.css'
const isTrue = true;
const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const cols = ['equipmentname', 'signalname', 'meanings', 'currentvalue', 'unitname', 'updateTime', 'operation'] // 放选中的id
let newcol = []
export const TableContent = Form.create()(
    class extends React.Component<any, any> {
        columns = [
            {
                title: <span>设备名称<br />(equipment name)</span>,
                dataIndex: 'equipmentname',
                sorter: (a, b) => a.equipmentname.length - b.equipmentname.length,
                key: 'equipmentname',
                width: '18%',
                titname: '设备名称',
            }, {
                title: <span>信号名称<br />(signal name)</span>,
                dataIndex: 'signalname',
                sorter: (a, b) => a.signalname.length - b.signalname.length,
                key: 'signalname',
                width: '19%',
                titname: '信号名称',
                render(text: any, record: any) {
                    return (
                        <span>
                            <img
                                src={
                                    record.channeltype === 'A' ? (
                                        record.warntag === 1 ? (
                                            require('../../../image/reda.png')
                                        ) : record.warntag === 0 ? (
                                            require('../../../image/a.png')
                                        ) : require('../../../image/normala.png')) :
                                        record.channeltype === 'S' ? (
                                            record.warntag === 1 ? (
                                                require('../../../image/reds.png')
                                            ) : record.warntag === 0 ? (
                                                require('../../../image/s.png')
                                            ) : require('../../../image/normals.png')) : ''

                                }
                                style={{ height: '18px', marginRight: '10px' }}
                            />
                            {text}
                        </span>
                    )
                }
            }, {
                title: <span>值<br />(data)</span>,
                dataIndex: 'currentvalue',
                sorter: (a, b) => a.currentvalue - b.currentvalue,
                key: 'currentvalue',
                width: '10%',
                titname: '值'
            }, {
                title: <span>单位<br />(unit)</span>,
                dataIndex: 'unitname',
                key: 'unitname',
                width: '8%',
                titname: '单位'
            }, {
                title: <span>信号属性<br />(signal attribute)</span>,
                dataIndex: 'meanings',
                sorter: (a, b) => a.meanings - b.meanings,
                key: 'meanings',
                width: '14%',
                titname: '信号属性'
            }, {
                title: <span>时间<br />(time)</span>,
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: '16%',
                titname: '时间'
            }, {
                title: <span>操作<br />(operate/link)</span>,
                dataIndex: 'operation',
                titname: '操作',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-operations">
                            <Tooltip placement="top" title="动态配置">
                                <i
                                    className="iconfont icon-dongtaipeizhi"
                                    style={{ marginRight: '15px', fontSize: '16px' }}
                                    onClick={() => this.props.config(record)}
                                />
                            </Tooltip>
                            {
                                record.controlable !== '0' ? (
                                    <Tooltip placement="top" title="控制操作" arrowPointAtCenter={isTrue}>
                                        <i
                                            className="iconfont icon-control"
                                            style={{ marginRight: '15px', height: '18px' }}
                                            onClick={() => this.props.control(record)}
                                        />
                                    </Tooltip>) : ''
                            }
                            {/* 外链 */}
                            {/* <Tooltip placement="top" title="链接">
                                <i
                                    className="iconfont icon-lianjie"
                                    style={{ marginRight: '15px', height: '22px' }}
                                    onClick={() => {
                                        window.parent.location.href =
                                            'http://180.96.28.83:8000/hitopo/runview.aspx?filename=%E7%A9%BA%E8%B0%83'
                                    }}
                                />
                            </Tooltip> */}

                            {
                                record.spanTime !== '' ? (
                                    <Tooltip placement="top" title="趋势曲线操作">
                                        <i
                                            className="iconfont icon-qushi"
                                            style={{ marginRight: '15px', height: '18px' }}
                                            onClick={() => this.props.modaltendencyOk(record)}
                                        />
                                    </Tooltip>
                                ) : ''
                            }
                            {
                                record.stationid === '47' ? (
                                    <Tooltip placement="top" title="视频">
                                        <i
                                            className="iconfont icon-video"
                                            style={{ marginRight: '15px', height: '18px' }}
                                            onClick={() => this.props.videoShow(record, index)}
                                        />
                                    </Tooltip>
                                ) : ''
                            }
                        </div>
                    );

                },
            }
        ];
        constructor(props: any) {
            super(props)
            this.state = {
                data: this.props.data,
                page: this.props.page,
                loading: this.props.loading,
                linkSrc: ''
            }

        }
        componentDidMount() {
            this.getshowcolumn()
            this.getLinkSrc()
        }

        getshowcolumn = () => {
            newcol = []
            this.columns.map((item) => {
                cols.forEach((id) => {
                    return item.dataIndex === id ? newcol.push(item) : ''
                })
            })
            this.setState({ newcolumns: newcol })
        }

        columnonChange = (e) => {
            if (e.target.checked) {
                if (cols.indexOf(e.target.id) < 0) {
                    cols.push(e.target.id)
                }
            } else {
                if (cols.indexOf(e.target.id) >= 0) {
                    cols.splice(cols.indexOf(e.target.id), 1)
                }
            }
            this.getshowcolumn()
        }
        //  得到当前的link连接地址
        getLinkSrc = () => {
            let el = parent.document.getElementById('dataBox') as HTMLElement;
            let onData = el.getAttribute('link');
            this.setState({
                linkSrc: onData
            })
        }

        componentWillReceiveProps(nextProps: any) {
            this.setState(nextProps)
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            const { seltoggle, toggleselect } = this.props
            return (
                <div>
                    <div className="showcolumn">
                        {
                            this.state.linkSrc ? (
                                <div className="showLink">
                                    <i
                                        className="iconfont icon-lianjie"
                                        onClick={() => {
                                            if (this.state.linkSrc) {
                                                let src = `http://180.96.28.83:80/hitopo/runview.aspx?filename=
                                                ${this.state.linkSrc}`
                                                // window.parent.location.href = src
                                                // window.open(src)
                                                var Cwin = window.open(
                                                    src,
                                                    '',
                                                    `status=no,
                                                    toolbar=no,
                                                    menubar=no,
                                                    location=no,
                                                    resizable=yes,
                                                    directories=no,
                                                    fullscreen=1,
                                                    scrollbars=yes`
                                                );
                                                Cwin.moveTo(0, 0)
                                                Cwin.resizeTo(screen.availWidth, screen.availHeight);
                                                window.opener = null;
                                                window.open('', '_self')
                                                window.close()
                                            }
                                        }}
                                    />
                                </div>
                            ) : ''
                        }
                        <div className="setback">
                            <Icon
                                type="menu-unfold"
                                onClick={toggleselect}
                            />
                        </div>
                        <Form style={{ display: seltoggle ? 'block' : 'none', right: this.state.linkSrc ? '100px' : '40px' }} >
                            <h3 style={{ color: '#fff' }}>列：</h3>
                            {
                                this.columns.map((d) => {
                                    return (
                                        <FormItem key={d.dataIndex}>
                                            {getFieldDecorator(d.dataIndex)(
                                                <Checkbox
                                                    style={{ color: '#fff' }}
                                                    onChange={this.columnonChange}
                                                    defaultChecked={true}
                                                >
                                                    {d.titname}
                                                </Checkbox>
                                            )}
                                        </FormItem>)
                                })
                            }
                        </Form>
                    </div>
                    <Table
                        columns={newcol}
                        rowKey={(record: any) => record.signalid + record.equipmentid}
                        dataSource={this.state.data ? this.state.data : []}
                        pagination={{
                            defaultPageSize: this.state.page,
                            pageSize: this.state.page
                        }}
                        loading={this.state.loading}
                        bordered={true}
                        rowClassName={(record) => {
                            switch (record.warntag) {
                                case 0:
                                    return 'warntagColor0';
                                    break;
                                case 1:
                                    return 'warntagColor1';
                                    break;
                                case 2:
                                    return 'warntagColor2';
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
)
