import * as React from 'react';
import { Form, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import Cookies from 'js-cookie'
import screenfull from 'screenfull';
import headStyle from './head.scss';
import reqwest from 'reqwest'

export interface PropsConfigure {
    collapsed?: boolean;
}
export const Head = Form.create()(
    class extends React.Component<PropsConfigure & FormComponentProps, any> {
        // 全屏
        screenFull = () => {
            if (screenfull.enabled) {
                screenfull.toggle()
            } 
        }
        logOut = () => {
            reqwest({
                url: '/ztmanage/a/logout',
                method: 'get',
                success(resp: any) {
                    console.log(resp)
                }
            })
            Cookies.remove('username')
            window.location.href = './index.html'
        }

        render() {
            return (
                // <div className={headStyle.navbarCustomMenu}>
                <ul className={headStyle.nav}>
                    {/*账号信息下拉框*/}
                    <li >
                        <img src={require('../..//image/avatar.png')} />
                        <span >{unescape(Cookies.get('china'))}</span>
                    </li>
                    <li onClick={this.screenFull}>
                        <Icon
                            type="scan"
                            style={{ fontSize: 16 }}
                            onClick={this.screenFull}
                        />
                        <span className={headStyle.text} >全屏</span>
                    </li>

                    {/*控制栏切换按钮*/}
                    <li onClick={this.logOut}>
                        <Icon
                            type="poweroff"
                            style={{ fontSize: 16 }}
                        />
                        <span className={headStyle.text} onClick={this.logOut}>退出</span>
                    </li>
                </ul>
                // </div>
            )
        }
    }
)