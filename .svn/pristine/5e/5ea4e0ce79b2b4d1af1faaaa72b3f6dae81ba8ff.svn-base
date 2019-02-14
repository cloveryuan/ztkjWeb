/**
 * Created by admin on 2016/7/4.
 */
'use static'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Cookies from 'universal-cookie'
import { gSet } from './app-settings'

import 'antd/dist/antd.less'
import './data-flex.less'
import './mywebstyle.scss'

const cookies = new Cookies()
let CustomMixins = () => {
    return {
        h_usr: cookies.get(gSet.key_usr),
        h_pwd: cookies.get(gSet.key_pwd),
        h_state: cookies.get(gSet.key_state),
    }
}

// export const CreateComponent = (ComposedComponent) =>
//    class extends React.Component {
//        render() {
//            return (
//                <MuiThemeProvider muiTheme={getMuiTheme()}>
//                    <ComposedComponent {...CustomMixins}></ComposedComponent>
//                </MuiThemeProvider>
//            )
//        }
//    };

// !1
// export function DomRender(my_component) {
//    var element_id_ = arguments[1] ? arguments[1] : "container";
//    ReactDom.render((
//            <MuiThemeProvider muiTheme={getMuiTheme()}>
//                {my_component}
//            </MuiThemeProvider>
//        ), document.getElementById(element_id_)
//    );
// }
// !2
// export function DomRender(MyComponent) {
//    var element_id_ = arguments[1] ? arguments[1] : "container";
//    const CustomComponent = CreateComponent(my_component);
//    ReactDom.render((
//        <CustomComponent></CustomComponent>
//    ), document.getElementById(element_id_));
// }
// !3
// export function DomRender(MyComponent) {
//     var props_ = arguments[1] ? arguments[1] : {};
//     var element_id_ = arguments[2] ? arguments[2] : "container";
//     var custom_theme_ = arguments[3] ? getMuiTheme(arguments[3]) : getMuiTheme();
//     ReactDom.render((
//         <MuiThemeProvider muiTheme={custom_theme_}>
//             <MyComponent {...CustomMixins()} {...props_} ></MyComponent>
//         </MuiThemeProvider>
//     ), document.getElementById(element_id_));
// };
// $

export function DomRender(MyComponent: any) {
    let props_ = arguments[1] ? arguments[1] : {}
    let element_id_ = arguments[2] ? arguments[2] : 'root'
    ReactDOM.render((<MyComponent {...CustomMixins()} {...props_} />), document.getElementById(element_id_))
}

export default DomRender
