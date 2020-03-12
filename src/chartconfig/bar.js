import echarts from 'echarts'
const option = {
    xAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: '#B7B9C2'
            }
        },
        axisLabel: {
            color: '#B7B9C2',
            fontSize: 14
        }
    },
    tooltip:{
        trigger:'axis'
    },
    yAxis: {
        axisLine: {
            show:false,
            lineStyle: {
                color: '#B7B9C2'
            }
        },
        axisLabel: {
            color: '#B7B9C2',
            fontSize: 16
        },
        splitLine: {
            show:false,
            lineStyle: {
                color: '#B7B9C2'
            }
        },
        axisTick:{
            show:false
        }

    },
    series: [{
        type: 'bar',
        barWidth: 18,
        itemStyle:{
            normal:{
                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#65C6F5'
                }, {
                    offset: 0.8,
                    color: '#346CE4'
                }], false)
            }
        },
        data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
    }]
};
export default option;