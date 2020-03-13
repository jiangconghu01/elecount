import echarts from 'echarts';
const colors = ['#FFB43F','#1058E6', '#EC511A'];
const option = {
    'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    },
    'tooltip':{
        'trigger':'axis'
    },
    'yAxis': {
        'type': 'value'
    },
    'color': colors,
    'series': [
        {
            'data': [720, 632, 401, 534],
            'type': 'line',
            'symbol': 'circle',
            'symbolSize': 5,
            'areaStyle': {
                'normal': {
                    'color': new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                'offset': 0,
                                'color': 'rgba(248, 180, 66, 1)'
                            },
                            {
                                'offset': 0.8,
                                // color: "rgba(248, 180, 66, 0)"
                                'color': '#fff'
                            }
                        ],
                        false
                    ),
                    'shadowColor': 'rgba(200, 200, 200, 0.1)',
                    'shadowBlur': 10
                }
            }
        },
        {
            'data': [820, 932, 901, 934],
            'type': 'line',
            'symbol': 'circle',
            'symbolSize': 5,
            'areaStyle': {
                'normal': {
                    'color': new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                'offset': 0,
                                'color': 'rgba(19, 91, 235, 0.3)'
                            },
                            {
                                'offset': 0.8,
                                // color: "rgba(19, 91, 235, 0)"
                                'color': '#fff'
                            }
                        ],
                        false
                    ),
                    'shadowColor': 'rgba(200, 200, 200, 0.1)',
                    'shadowBlur': 10
                }
            }
        },
        {
            'data': [720, 832, 801, 834],
            'type': 'line',
            'symbol': 'circle',
            'symbolSize': 5,
            'areaStyle': {
                'normal': {
                    'color': new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                'offset': 0,
                                'color': 'rgba(236, 80, 21, 0.3)'
                            },
                            {
                                'offset': 0.8,
                                // color: "rgba(236, 80, 21, 0)"
                                'color': '#fff'
                            }
                        ],
                        false
                    ),
                    'shadowColor': 'rgba(200, 200, 200, 0.1)',
                    'shadowBlur': 10
                }
            }
        }

    ]
};
export default option;
