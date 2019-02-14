import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import Cookies from 'js-cookie'
import loginStyle from './Login.scss'
import http from '../../../common/api'

const FormItem = Form.Item

export interface PropsCollectionCreateForm {
    visible?: boolean;
}

export const Login = Form.create()(
    class extends React.Component<PropsCollectionCreateForm & FormComponentProps, any> {
        handleSubmit = (e) => {
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                let data = {
                    'username': values.userName,
                    'password': values.password,
                    'mobileLogin': 1,
                    'rememberMe': values.remember ? 1 : 0
                }
                if (!err) {
                    http.postReq(
                        '/ztmanage/a/login',
                        data,
                        (res: any) => {
                            if (1 === res.success) {
                                window.location.href = './main.html'
                                Cookies.set('china', res.chinese);
                                Cookies.set('username', values.userName);
                            } else {
                                message.warning(res.message);
                            }
                        },
                        // () => {
                        //     window.location.href = './index.html'
                        // }
                    )
                }
            })
        }

        render() {
            const { getFieldDecorator } = this.props.form
            return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <div className={loginStyle.user}>
                            用户登录
                        </div>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />}
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登 录
                        </Button>
                    </FormItem>
                </Form>
            )
        }
    }
)