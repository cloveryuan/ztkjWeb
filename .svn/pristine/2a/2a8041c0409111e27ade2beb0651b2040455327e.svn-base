import React from 'react'
import echarts from 'echarts/lib/echarts' // 必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'

export default class LineReact extends React.Component<any, any> {
    private ID: any = null;
    constructor(props: any) {
        super(props)
        this.state = {
            options: this.props.options
        }
    }
    componentDidMount() {
        this.initPie()
    }

    initPie = () => {
        let myChart = echarts.init(this.ID) // 初始化echarts
        // 设置options
        console.log(this.state.options)
        myChart.setOption(this.state.options)
        window.onresize = function () {
            myChart.resize()
        }
    }

    render() {
        const { width = '100%', height = '300px' } = this.props
        return <div ref={ID => this.ID = ID} style={{ width, height }} />
    }
} 