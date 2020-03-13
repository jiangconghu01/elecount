const option = {
    'tooltip': {
        'trigger': 'axis'
    },
    // grid: {
    //     top: 'middle',
    //     left: '1%',
    //     right: '1%',
    //     bottom: '2%',
    //     height: '90%',
    //     containLabel: true
    // },
    'xAxis': {
        'type': 'category',
        'data': [100,200,20,30,60,89],
        'axisLine': {
            'lineStyle': {
                'color': '#B7B9C2'
            }
        }
    },
    'yAxis': {
        'type': 'value',
        'splitLine': {
            'show':false,
            'lineStyle': {
                'color': 'rgba(15,34,71,0.9)'
            }
        },
        'axisTick':{
            'show':false
        },
        'axisLine': {
            'show': false,
            'lineStyle': {
                'color': '#B7B9C2'
            }
        },
        'nameTextStyle': {
            'color': '#B7B9C2'
        },
        'splitArea': {
            'show': false
        }
    },
    'series': [{
        'name': '新报',
        'type': 'line',
        'data': [800,900,220,130,660,289],
        'color': '#54CDF6',
        'symbol':'none',
        'lineStyle': {
            'normal': {
                'width': 2,
                'color': {
                    'type': 'linear',
                    'colorStops': [{
                        'offset': 0,
                        'color': '#54CDF6' // 0% 处的颜色
                    },{
                        'offset': 1,
                        'color': 'rgba(73, 208, 255, 0.9)' // 100% 处的颜色
                    }],
                    'globalCoord': false // 缺省为 false
                },
                'shadowColor': 'rgba(73, 208, 255, 0.5)',
                'shadowBlur': 5,
                'shadowOffsetY': 7
            }
        },
        'itemStyle': {
            'normal': {
                'color': '#54CDF6',
                'borderWidth': 3,
                'borderColor': '#54CDF6'
            }
        },
        'smooth': true
    }
    ]
};
export default option;