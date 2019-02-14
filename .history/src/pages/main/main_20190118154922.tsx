import * as React from 'react';
import { Layout, Icon } from 'antd';
import './index.scss';
import { ClickParam } from 'antd/lib/menu'
import { SiderLeft } from '../../utils/leftlayout/SiderLeft'
import { Head } from '../../utils/head/Head'
import { fontResize } from '../../common/font-resize'
import Cookies from 'js-cookie'

interface PropsApp {
    collapsed?: boolean;
    collapsible: boolean;
}

interface StateApp {
    collapsed: boolean;
    current_key: string;
    current_src: string;
    filename: string;
}

class App extends React.Component<PropsApp, StateApp> {
    arr_src = [];
    arr_key = [];
    constructor(props: PropsApp) {
        super(props);
        fontResize();
        this.state = {
            collapsed: false,
            current_key: '',
            current_src: '',
            filename: '',
        }
    }
    // 获取右侧展示默认的数据，就是左侧树第一个的厂站号id
    getslidedata = (data: any) => {
        new Promise((resolve, reject) => {
            resolve(1)
            if (data[0]) {
                return data[0].children ? this.setState(
                    { current_key: data[0].children[0].id },
                    () => { this.arr_key.push(this.state.current_key); this.arr_src.push(this.state.current_src) }
                ) : () => { console.log('左侧树没数据') }
            }
        }).then(() => {
            this.setState({
                current_src: './realTimeData.html'
            })

            if (!Cookies.get('username')) {
                window.location.href = './index.html'
            }
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onMenuItemClick = (param: ClickParam) => {
        console.log(param)
        if (this.state.current_key === param.key) {
            return
        }
        if (Number(param.key)) {
            this.setState({
                current_src: './realTimeData.html'
            })
            this.arr_src.push('./realTimeData.html')

        } else {
            if (param.hasOwnProperty('props')) {
                // this.current_src = param.props.href
                console.log(param);
            } else {
                console.log(param);
                this.setState({
                    current_src: param.item.props.href
                })
                this.arr_src.push(param.item.props.href)
            }
        }
        if (Number(param.key) === this.arr_key[this.arr_key.length - 1]) {
            console.log(this.arr_key)
            return
        }
        this.arr_key.push(param.key)
        this.setState({
            current_key: param.key,
            filename: param.item.props.filename
        })
    }
    // filename有个初始值
    default_filename = (name) => {
        this.setState({ filename: name })
        console.log(name)
    }

    getIframe = () => {
        var stateObj = { key: this.state.current_key, src: this.state.current_src };
        window.history.pushState(stateObj, 'null', 'main.html');
        window.onpopstate = (event: any) => {
            console.log(this.arr_key.length)
            if (this.arr_key.length === 1) {
                window.location.href = './index.html';
                return
            }

            if (this.arr_key.length > 1) {
                this.arr_key.pop();
                this.arr_src.pop();
                const change_key = this.arr_key.length;
                const change_src = this.arr_src.length;
                this.setState(
                    {
                        current_key: String(this.arr_key[change_key - 1]),
                        current_src: String(this.arr_src[change_src - 1]),
                    })
            };
        }
        return {
            __html: '<iframe ' +
                'data-box="fit" src="' + this.state.current_src + '" ' +
                'data="' + this.state.current_key + '"' +
                ' id="dataBox" link="' + this.state.filename + '"></iframe>'
        }
    }

    render() {
        return (
            <div className="main" style={{ height: '100vh' }}>
                <Layout style={{ height: '100%' }}>
                    <SiderLeft
                        collapsed={this.state.collapsed}
                        defaultKey={this.state.current_key}
                        onItemClick={this.onMenuItemClick}
                        onKey={this.state.current_key}
                        getslidedata={this.getslidedata}
                        default_filename={this.default_filename}
                    />
                    <Layout style={{ height: '100%', overflow: 'hidden', background: '#fff' }}>
                        <div className="top">
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{ lineHeight: '64px' }}
                            />
                            <span className="center">
                                <b className="tit">紫图</b>
                                &nbsp;Manager&nbsp;V2.0
                            </span>
                            <Head />
                        </div>
                        <div
                            dangerouslySetInnerHTML={this.getIframe()}
                            className="wrap"
                        />
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App
import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(App)
registerServiceWorker()