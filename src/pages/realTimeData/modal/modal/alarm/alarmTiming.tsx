import * as React from 'react';
import { Form, Modal, Row, Col, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import alarm_time from './alarm_timeData'
const FormItem = Form.Item;

export interface PropsCollectionCreateForm {
    onAlarm?: boolean;
    alarmCancle?: () => void;
    alarmSave?: () => void;
    data?: any;
    onInfo?: any;
}
export interface Stateinfo {
    date: any,
    visible?: boolean,
    value: any[],
    allChecked?: boolean
}

export const AlarmTiming = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, Stateinfo> {
        private realdata_refs = {};

        constructor(props: PropsCollectionCreateForm & FormComponentProps) {
            super(props)
            console.log(alarm_time)
            this.state = {
                visible: false,
                date: alarm_time,
                value: [],
                allChecked: false,
            }
        }

        onChange = (value) => {
            const { date } = this.state;
            this.setState({ value, allChecked: value.length === date.length })
        }
        onCheckAllChange = (e) => {
            const { date } = this.state;
            const checked = e.target.checked
            this.setState({ allChecked: checked })
            if (checked) {
                this.setState({ value: date.map(item => item.value) })
            } else {
                this.setState({ value: [] })
            }
        }

        render() {
            const { date } = this.state;
            const { onAlarm, alarmCancle, alarmSave, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={true}
                    title="告警屏蔽时间表"
                    onCancel={alarmCancle}
                    onOk={alarmSave}
                    okText="保存"
                    cancelText="取消"
                    width={1000}
                    mask={onAlarm}
                    wrapClassName={onAlarm ? '' : 'alartvisible'}
                >
                    <Form className="ant-advanced-search-form">
                        <Row style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                            <Checkbox
                                onChange={this.onCheckAllChange}
                                checked={this.state.allChecked}
                            />
                            <span >全选</span>
                        </Row>
                        <Checkbox.Group onChange={this.onChange} value={this.state.value} >
                            <div style={{ border: '1px solid #95B8E7' }}>
                                <Row
                                    style={{
                                        backgroundColor: '#E0ECFF',
                                        border: '1px solid #95B8E7',
                                        borderTop: 0,
                                        fontWeight: 'bold',
                                        color: '#0E2D5F',
                                        paddingLeft: '20px'
                                    }}
                                >
                                    星期
                                </Row>
                                <Row>
                                    {date.map((v, i) => {
                                        let week: string = v.week
                                        return (v.hasOwnProperty('day')) ?
                                            (
                                                <Col span={3} key={'day' + i}>
                                                    <FormItem>
                                                        {getFieldDecorator(week, {
                                                            initialValue: v.value,
                                                        })(
                                                            <Checkbox
                                                                onChange={this.onChange}
                                                                ref={
                                                                    node =>
                                                                        this.realdata_refs[v.week] = node
                                                                }
                                                                className={v.week}
                                                            >
                                                                {v.day}
                                                            </Checkbox>
                                                        )}
                                                    </FormItem>
                                                </Col>)
                                            : null
                                    })}
                                </Row>
                                <Row
                                    style={{
                                        backgroundColor: '#E0ECFF',
                                        border: '1px solid #95B8E7',
                                        fontWeight: 'bold',
                                        color: '#0E2D5F',
                                        paddingLeft: '20px'
                                    }}
                                >
                                    时间
                                </Row>
                                <Row>
                                    {date.map((v, i) => {
                                        let html = []
                                        let name: string = v.name
                                        if (v.hasOwnProperty('lable')) {
                                            html.push(<Col span={6} key={'time' + i}>
                                                <FormItem>
                                                    {getFieldDecorator(name, {
                                                        initialValue: v.value,
                                                    })(
                                                        <Checkbox
                                                            onChange={this.onChange}
                                                        >
                                                            {v.lable}
                                                        </Checkbox>
                                                    )}
                                                </FormItem>
                                            </Col>)
                                        }
                                        return html
                                    })}
                                </Row>
                            </div>
                        </Checkbox.Group>
                    </Form>
                </Modal>
            );
        }
    })