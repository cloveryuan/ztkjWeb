import * as React from 'react';
import {  Layout } from 'antd';
import { PublicForm } from './content/publicForm';
import { TableContent } from './content/table'
const { Content } = Layout;

interface StateTable {
    loading?: boolean;
    uploading?: boolean;
}
export class HistoryAlarm extends React.Component<StateTable, any> {
    state = {
        visible: true,
        data: [],
        pagination: {},
        loading: false,
        infoData: {},
        alarm: true,
    };
    fetch = (pageCurrent) => {
        let searchData = [];
        for (let i = 0; i < pageCurrent.length; i++) {
            searchData.push(pageCurrent[i]);
        }
        this.setState({loading: false, data: searchData})
    }
    selectBtnFunc = (searchData) => {
        this.setState(searchData, () => {
            this.fetch(searchData)
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
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
                    setSet={this.setSet}
                    loading={this.state.loading}
                />
                <TableContent
                    {...this.state}
                />
            </Content>
        )
    }
}
import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(HistoryAlarm)
registerServiceWorker()