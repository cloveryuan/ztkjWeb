import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import contentCreatStyle from '../../realTimeData/contentCreat.scss';
const FormItem = Form.Item;

interface SearchProps extends FormComponentProps {
    expand?: boolean,
    getdatas?: (props: any) => void
}
export const SearchCompon = Form.create({})(

    class extends React.Component<SearchProps, any> {
        public elName: any = null
        constructor(props: SearchProps) {
            super(props)
            this.state = {
                expand: false,
                elNamevalue: '',
                getdatas: props.getdatas
            }
        }
        toggle = () => {
            const { expand } = this.state
            this.setState({ expand: !expand })
        }

        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) { return }
                console.log(values.elName)
                this.state.getdatas(values.elName)
            })
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { elNamevalue } = this.state
            const suffix_elName = elNamevalue ? (
                <Icon
                    type="close-circle"
                    onClick={() => {
                        this.elName.focus();
                        this.setState({ elNamevalue: '' });
                        this.props.form.setFieldsValue({
                            elName: ''
                        })
                    }}
                />) : null;

            return (
                <div className={contentCreatStyle.box}>
                    <div className={contentCreatStyle.boxHeader}>
                        <h3 className={contentCreatStyle.boxTitle}>筛选项</h3>
                        <div className={contentCreatStyle.boxTools}>
                            <a className={contentCreatStyle.btn} data-widget="collapse" >
                                <Icon
                                    type={this.state.expand ? 'minus' : 'plus'}
                                    style={{ fontSize: '18px' }}
                                    onClick={this.toggle}
                                />
                            </a>
                        </div>
                    </div>
                    <div className={contentCreatStyle.boxBody}>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={this.handleSearch}
                            style={{ padding: '5px' }}
                        >
                            <Row gutter={24} style={{ display: this.state.expand ? 'block' : 'none' }}>
                                <Col span={10}>
                                    <FormItem label={`设备名称`}>
                                        {getFieldDecorator(`elName`)(
                                            <Input
                                                style={{ float: 'left' }}
                                                suffix={suffix_elName}
                                                ref={(node) => {
                                                    this.elName = node
                                                }}
                                                onChange={(e) => {
                                                    this.setState({ elNamevalue: e.target.value })
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7} style={{ textAlign: 'left' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>

            );
        }
    }
) 