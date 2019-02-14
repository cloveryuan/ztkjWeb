import * as React from 'react';
import { Layout, Tabs } from 'antd';
import { AlarmCreatForm } from './public/AlarmCreatForm';
import { DevTable } from './public/DevTable';
import { DevsTable } from './public/DevsTable';
import { CurveContent } from './public/curve'
import * as echarts from 'echarts';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

interface StateTable {
    loading?: boolean;
    uploading?: boolean;
}
export class AlarmStatistics extends React.Component<StateTable, any> {
    state = {
        show: true,
        dev: [],
        devs: [],
        pagination: {},
        loading: false,
        infoData: {},
        dataKey: [],
    };
    dev = (pageCurrent) => {
        let searchData = [];
        for (let i = 0; i < pageCurrent.length; i++) {
            searchData.push(pageCurrent[i]);
        }
        this.setState({ loading: false, dev: searchData })
    }
    devBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.dev(searchData)
        })
    }
    devs = (pageCurrent) => {
        let searchData = [];
        for (let i = 0; i < pageCurrent.length; i++) {
            searchData.push(pageCurrent[i]);
        }
        this.setState({ loading: false, devs: searchData })
    }
    devsBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.devs(searchData)
        })
    }
    chart = (pageCurrent) => {
        let myChart = echarts.init(document.getElementById('main') as HTMLElement);
        // 绘制图表
        myChart.setOption({
            title: pageCurrent.title,
            tooltip: pageCurrent.tooltip,
            legend: pageCurrent.legend,
            toolbox: pageCurrent.toolbox,
            series: pageCurrent.series,
        });
    }
    curveBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.chart(searchData)
        })
    }
    callback = (key) => {
        if (key === '1') {
            this.setState({
                show: false,
            });
        } else {
            this.setState({
                show: true,
            });
        }
        const { dataKey } = this.state;
        dataKey.length = 0;
        dataKey.push(key)

    }
    setSet = (obj) => {
        this.setState({ loading: obj });
    }
    render() {
        return (
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    overflow: 'auto',
                }}
            >
                <AlarmCreatForm
                    show={this.state.show}
                    devBtnFunc={this.devBtnFunc}
                    devsBtnFunc={this.devsBtnFunc}
                    curveBtnFunc={this.curveBtnFunc}
                    setSet={this.setSet}
                    onKey={this.state.dataKey}
                    loading={this.state.loading}
                />
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="局站告警统计" key="0">
                        <CurveContent
                            {...this.state}
                        />
                    </TabPane>
                    <TabPane tab="设备告警统计" key="1">
                        <DevTable
                            {...this.state}
                        />
                    </TabPane>
                    <TabPane tab="设备类告警统计" key="2">
                        <DevsTable
                            {...this.state}
                        />
                    </TabPane>
                </Tabs>
            </Content>
        )
    }
}
import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(AlarmStatistics)
registerServiceWorker()