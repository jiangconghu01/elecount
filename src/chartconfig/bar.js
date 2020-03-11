import echarts from 'echarts'
const option = {
    xAxis: {
        data: ['涉恐人员', '涉稳人员', '涉毒人员', '在逃人员', '刑事犯罪\n前科、劣迹人员', '肇事肇祸\n精神病人', '重点上访\n人员'],
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
    // grid: {
    //     top: 'middle',
    //     left: '1%',
    //     right: '1%',
    //     bottom: '2%',
    //     height: '90%',
    //     containLabel: true
    // },
    yAxis: {
        name: "（人）",
        nameTextStyle: {
            color: '#B7B9C2',
            fontSize: 16
        },
        axisLine: {
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
        interval:500,
        max:5000

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