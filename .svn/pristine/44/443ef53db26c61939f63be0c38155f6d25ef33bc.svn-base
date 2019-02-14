import * as React from 'react';
import { Layout, Tabs } from 'antd';
import * as echarts from 'echarts';
import { PublicForm } from './content/publicForm';
import { TableContent } from './content/table';
import { CurveContent } from './content/curve';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

interface StateTable {
    loading?: boolean;
    uploading?: boolean;
}
export class HistoryData extends React.Component<StateTable, any> {
    state = {
        visible: false,
        data: [],
        pagination: {},
        loading: false,
        infoData: {},
        dataKey: [],
        cData: {}
    };
    fetch = (pageCurrent) => {
        let searchData = [];
        for (let i = 0; i < pageCurrent.length; i++) {
            searchData.push(pageCurrent[i]);
            this.setState({loading: false, data: searchData})
        }
    }
    selectBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.fetch(searchData)
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
            xAxis:  pageCurrent.xAxis,
            yAxis: pageCurrent.yAxis,
            series: pageCurrent.series,
        });
    }
    curveBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.chart(searchData)
        })
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
    }
    callback = (key) => {
        const { dataKey } = this.state;
        dataKey.length = 0;
        dataKey.push(key)
    }
    setSet = (obj) => {
        this.setState({loading: obj});
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
                <PublicForm
                    selectBtnFunc={this.selectBtnFunc}
                    curveBtnFunc={this.curveBtnFunc}
                    setSet={this.setSet}
                    onKey={this.state.dataKey}
                    loading={this.state.loading}
                />
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="报表" key="0">

                        <TableContent
                            {...this.state}
                        />
                    </TabPane>
                    <TabPane tab="曲线" key="1">
                        <CurveContent
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

DomRender(HistoryData)
registerServiceWorker()