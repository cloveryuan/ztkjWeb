import * as React from "react";
import { Layout, Menu, Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import debounce from "lodash/debounce";
import { ClickParam } from "antd/lib/menu";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import siderStyle from "./siderleft.scss";
import http from "../../common/api";
import Cookies from "js-cookie";

export interface PropsConfigure {
  collapsed?: boolean;
  defaultKey?: string;
  onItemClick?: (param: ClickParam) => void;
  onKey?: string;
  getslidedata: (data: any) => void;
  default_filename: (name: string) => void;
}
export interface StateConfigure {
  openKeys: any[];
  focus?: boolean;
  data: any[];
  Sdata: any[];
  rootSubmenuKeys: any[];
  value: any[];
  fetching?: boolean;
  key?: string;
  clientheight: any;
}

const redIcon = "red_icon.png";
const greIcon = "green_icon.png";

export const SiderLeft = Form.create()(
  class extends React.Component<
    PropsConfigure & FormComponentProps,
    StateConfigure
  > {
    public current_key: string;
    public lastFetchId: number;
    constructor(props: PropsConfigure & FormComponentProps) {
      super(props);
      this.state = {
        openKeys: [],
        focus: false,
        data: [],
        Sdata: [],
        rootSubmenuKeys: [],
        value: [],
        fetching: false,
        key: "",
        clientheight: ""
      };
      this.current_key = this.props.defaultKey;
      this.lastFetchId = 0;
      this.fetchUser = debounce(this.fetchUser, 800);
    }

    handlerItemClick = (params: ClickParam) => {
      console.log(params);
      if (this.current_key === params.key) {
        return;
      }
      if (Number(params.key)) {
        window.location.href = "./realTimeData.html";
      } else {
        if (params.hasOwnProperty("props")) {
          window.location.href = params["props"].href;
        } else {
          window.location.href = params.item.props.href;
        }
      }
    };
    onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(
        key => this.state.openKeys.indexOf(key) === -1
      );
      if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : []
        });
      }
      const el = document.getElementById(openKeys + "$Menu") as HTMLElement;
      // console.log(this.state.clientheight)
      if (
        this.props.collapsed &&
        el !== null &&
        el.offsetHeight > this.state.clientheight
      ) {
        console.log(this.state.clientheight);
        console.log(document.documentElement.clientHeight);
        el.style.maxHeight = document.documentElement.clientHeight + "px";
      }
    };
    fetchUser = value => {
      this.getSdata();
      // this.setState({ fetching: false });
    };
    handleChange = (value, option) => {
      this.setState({
        value
        // Sdata: [],
        // fetching: false,
      });
    };
    getOptionValue = (value, option) => {
      const open = [];
      open.push(option.ref);
      this.setState({
        key: value.key.toString()
      });

      this.props.onItemClick(option);
      // this.onOpenChange(open)
    };
    // 获取数据
    getListById = () => {
      http.postReq(
        "/ztmanage/f/api/lum",
        "",
        data => {
          // alert('lum' + data[0])
          if (typeof this.props.getslidedata === "function") {
            this.props.getslidedata(data);
          }
          this.setState(
            {
              data: data
            },
            () => {
              this.getSdata();
              console.log(this.state.data[0]);
              console.log(this.state.data[0].children);
              // 看看第一个有没有组态，有就把链接付给name，后面好打开
              if (this.state.data[0]) {
                if (this.state.data[0].children) {
                  const name = this.state.data[0].children[0].filename;
                  this.props.default_filename(name);
                }
              }
              for (let i = 0; i <= this.state.data.length; i++) {
                // 得到始终打开一个下拉数组
                if (this.state.data[i]) {
                  if (this.state.data[i].children) {
                    this.state.openKeys.push(this.state.data[i].id);
                    return;
                  }
                }
              }
            }
          );
        },
        () => {
          Cookies.remove("username");
          Cookies.remove("china");
          confirm("lum请求失败,请重新登录");
          window.location.href = "./index.html";
        }
      );
    };
    // 获取所有二级菜单
    getSdata = () => {
      let data1 = [];
      this.state.data.map(function(res: any) {
        let index = res.hasOwnProperty("children");
        if (index) {
          res.children.map(item =>
            data1.push({
              text: item.text,
              id: item.id,
              data: res.id,
              href: item.href,
              filename: item.filename
            })
          );
        }
      });
      // console.log(data1)
      this.setState({ Sdata: data1 });
    };

    // 挂载数据
    componentDidMount() {
      // alert('slideleft')
      this.getListById();
      var height = document.body.clientHeight; // 取得浏览器页面可视区域的宽度
      this.setState({
        clientheight: height
      });
    }

    // 卸载数据
    componentWillUnmount() {
      this.setState = state => {
        return;
      };
    }

    handleFocus = () => {
      this.getSdata();
    };
    render() {
      const isTrue = true;
      const { collapsed, onKey } = this.props;
      let text = this.state.focus ? "#fff" : "#374850";
      let style = {
        backgroundColor: text
      };
      let item_click_ = this.props.onItemClick || this.handlerItemClick;
      const { Sdata, value } = this.state;

      return (
        <Sider
          trigger={null}
          collapsible={isTrue}
          collapsed={collapsed}
          style={{ height: "100%", overflow: "auto" }}
          width={210}
          defaultCollapsed={isTrue}
        >
          <div style={{ display: collapsed ? "none" : "block", width: "100%" }}>
            <Form className={siderStyle.sidebarForm} style={style}>
              <div className="inputGroup">
                <Select
                  showSearch={isTrue}
                  allowClear={isTrue}
                  optionFilterProp="children"
                  labelInValue={isTrue}
                  value={value}
                  placeholder="搜索菜单"
                  notFoundContent="没有匹配数据"
                  // onSearch={this.fetchUser}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  style={{ width: 200, margin: "0 auto" }}
                  onSelect={this.getOptionValue}
                  filterOption={(input, option) => {
                    // let item = option.props.children
                    let item = option;
                    return (
                      item["props"].children.toString().indexOf(input) !== -1
                    );
                  }}
                >
                  {Sdata
                    ? Sdata.map(d => (
                        <Option
                          key={d.id}
                          ref={d.data}
                          data-filename={d.filename}
                        >
                          {d.text}
                        </Option>
                      ))
                    : ""}
                </Select>
              </div>
            </Form>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            multiple={false}
            onClick={item_click_}
            defaultOpenKeys={this.state.openKeys}
            defaultSelectedKeys={[this.current_key]}
            selectedKeys={[onKey]}
            style={{ marginTop: this.props.collapsed ? "16px" : 0 }}
          >
            {this.state.data.map(res => {
              this.state.rootSubmenuKeys.push(res.id);
              return res.hasOwnProperty("children") ? (
                <SubMenu
                  key={res.id}
                  title={
                    <div>
                      <span
                        className={res.icon}
                        style={{
                          display: "inline-block",
                          width: 25,
                          height: 24,
                          marginRight: 14
                        }}
                      />
                      <span
                        style={{
                          verticalAlign: "6px",
                          display: collapsed ? "none" : ""
                        }}
                      >
                        {res.text}
                      </span>
                    </div>
                  }
                >
                  {res.children.map(item => {
                    return (
                      <Menu.Item
                        key={item.id}
                        filename={item.filename}
                        href={item.href}
                        style={{ fontSize: "11px" }}
                      >
                        {item.state !== undefined ? (
                          <img
                            src={require(`../../image/${
                              item.state ? redIcon : greIcon
                            }`)}
                            style={{
                              width: 15,
                              height: 15,
                              marginRight: 10
                            }}
                          />
                        ) : (
                          ""
                        )}

                        {item.text}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              ) : (
                <Menu.Item key={res.id} href={res.href}>
                  <span
                    className={res.icon}
                    style={{
                      display: "inline-block",
                      width: 25,
                      height: 24,
                      marginRight: 14
                    }}
                  />
                  <span
                    style={{
                      verticalAlign: "6px",
                      display: collapsed ? "none" : ""
                    }}
                  >
                    {res.text}
                  </span>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      );
    }
  }
);
