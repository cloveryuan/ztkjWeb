import * as React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import { Login } from './components/Login';
import indexStyle from './index.scss';
const BgElement = Element.BgElement;

interface PropsApp {
    visible: boolean;
    autoplay: boolean;
}

interface StateApp {
    visible: boolean;
    loading: boolean;
}
class App extends React.Component<PropsApp, StateApp> {

    render() {
        const isAuto = true;
        return (
            <div className="main" style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ zIndex: -99, height: '95vh' }}>
                    <BannerAnim prefixCls="banner-user" autoPlay={isAuto}>
                        <Element
                            prefixCls="banner-user-elem"
                            key="0"
                        >
                            <BgElement
                                key="bg"
                                className="bg"
                                style={{
                                    background: '#4fb0e8',
                                }}
                            />
                            <TweenOne className="banner-user-title imgBlueBg">
                                <span className={indexStyle.cirSliceA} />
                                <span className={indexStyle.cirSliceB} />
                                <span className={indexStyle.cirSliceC} />
                            </TweenOne>
                            <TweenOne
                                className="banner-user-title"
                                animation={{ x: 50, opacity: 0, type: 'from', delay: 50 }}
                            >
                                <ul className={indexStyle.titleTxt}>
                                    <li className={indexStyle.txtA}>安全</li>
                                    <li className={indexStyle.txtB}>就/在/你/身/边</li>
                                </ul>
                            </TweenOne>
                            <TweenOne
                                className="banner-user-title"
                                animation={{ x: -50, opacity: 0, type: 'from', delay: 100 }}
                            >
                                <div className={indexStyle.imgBox} />
                            </TweenOne>
                        </Element>
                        <Element
                            prefixCls="banner-user-elem"
                            key="1"
                        >
                            <BgElement
                                key="bg"
                                className="bg"
                            />
                            <TweenOne
                                className="banner-user-title"
                                animation={{ x: 50, opacity: 0, type: 'from', delay: 50 }}
                            >
                                <ul className={indexStyle.titleRedTxt}>
                                    <li className={indexStyle.txtRedA}>信任</li>
                                    <li className={indexStyle.txtRedB}>源/于/行/动</li>
                                </ul>
                            </TweenOne>
                            <TweenOne
                                className="banner-user-title"
                                animation={{ x: -50, opacity: 0, type: 'from', delay: 50 }}
                            >
                                <div className={indexStyle.imgRedBox} />
                            </TweenOne>
                            <TweenOne
                                className="banner-user-title"
                                animation={{ y: -50, opacity: 0, type: 'from', delay: 800 }}
                            >
                                <div className={indexStyle.imgChipA} />
                            </TweenOne>
                        </Element>
                    </BannerAnim>
                </div>
                <div className={indexStyle.login} >
                    <Login />
                </div>
                <div className={indexStyle.footerCopy}>
                    <div className="container">
                        <div
                            className={indexStyle.center}
                        >
                            南京紫图科技有限公司 版权所有 All rights reserved. \@2014-2025\@
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App
import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(App)
registerServiceWorker()