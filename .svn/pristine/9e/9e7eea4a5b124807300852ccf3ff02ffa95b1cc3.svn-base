import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import contentCreatStyle from '../contentCreat.scss'
// import http from '../../../common/api';
const FormItem = Form.Item;
const Option = Select.Option

let enselect = []
export interface PropsCollectionCreateForm {
    onSid?: any;
    fetch?: (props: any) => void;
    toggle?: () => void;
    expand?: boolean
    searchInter: (props: any) => void,
    search: (props: any) => void,
    endata?: any
}
export const ContentCreatForm = Form.create({})(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            this.state = {
                expand: this.props.expand,
            }
        }

        componentDidMount() {
            this.getEndatas()
        }
        getEndatas = () => {
            // if (this.props.endata) {
            //     this.props.endata.map((d) => {
            //         const item = d.equipmentid
            //         enselect[item] = d.equipmentname

            //     })
            // }

            var hash1 = {};
            enselect = this.props.endata.reduce(
                (item: any, next: any) => {
                    if (!hash1[next.equipmentid]) {
                        hash1[next.equipmentid] = true && item.push(next)
                    }
                    return item
                },
                [])
            console.log(enselect)
        }

        handleSearch = (e) => {
            e.preventDefault();
            const { onSid } = this.props;
            this.props.form.validateFields((err, values) => {
                console.log(values.en)
                const datas = {
                    'si': Number(onSid.toString()),
                    'en': values.en,
                    'cn': values.cn,
                    'tg': values.tg
                }
                this.props.search(datas)
                this.props.searchInter(datas)
            })
        }

        render() {
            const { getFieldDecorator } = this.props.form;

            return (
                <div className={contentCreatStyle.box}>
                    <div className={contentCreatStyle.boxHeader}>
                        <h3 className={contentCreatStyle.boxTitle}>筛选项</h3>
                        <div className={contentCreatStyle.boxTools}>
                            <a className={contentCreatStyle.btn} data-widget="collapse" onClick={this.props.toggle}>
                                <Icon type={this.props.expand ? 'minus' : 'plus'} style={{ fontSize: '18px' }} />
                            </a>
                        </div>
                    </div>
                    <div className={contentCreatStyle.boxBody}>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={this.handleSearch}
                        >
                            <Row gutter={24} style={{ display: this.props.expand ? 'block' : 'none' }}>
                                <Col span={6}>
                                    <FormItem label={`设备名称`}>
                                        {getFieldDecorator(`en`, {
                                            rules: []
                                        })(
                                            <Select
                                                showSearch={true}
                                                allowClear={true}
                                                notFoundContent="没有匹配数据"
                                            >
                                                {
                                                    enselect ? (
                                                        enselect.map(d => {
                                                            return <Option key={d.equipmentid} value={d.equipmentname}>
                                                                {d.equipmentname}
                                                            </Option>
                                                        })
                                                    ) : ''
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label={`信号名称`}>
                                        {getFieldDecorator(`cn`, {
                                            rules: [],
                                        })(
                                            <Input style={{ float: 'left' }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label={`信号类型`}>
                                        {getFieldDecorator(`tg`, {
                                            rules: [],
                                        })(
                                            <Select
                                                style={{ float: 'left' }}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">数字量</Option>
                                                <Option value="2">模拟量</Option>
                                                <Option value="3">控制量</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} style={{ textAlign: 'left' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>

            );
        }
    }
);