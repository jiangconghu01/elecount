const colors = ['#E8E5E9','#6588C5','#EA7C72','#ECD476','#E8E5E9']
const data = [
    {name: "", value: 888},
    {name: "待电", value: 88},
    {name: "断电", value: 250},
    {name: "运行", value: 548},
    {name: "装饰", value: 888},
].map((val,i) => {
    val.itemStyle = {
        color:colors[i]
    }
    return val;
});
// const data2 = [88,0,0,0]

const option = {
    backgroundColor: "#fff",
    polar: {},
    axisPointer: {
        type:'none'
    },
    angleAxis: {
        show: false,
        min: function(value) {
            return value.min >= 1 ? value.min - value.max / 1.5 : 0
        },
        max: function(value) {
            // return value.max * 4 / 3;
            return value.max;
        }
    },
    radiusAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            color: function (val,index){
                return colors[index];
            },
            fontSize: 16
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: "rgba(17, 51, 68, 0.8)"
            }
        },
        data: data.map(function(item){return item.name}),
    },
    series: [
        // {type: 'bar',name:'空白',coordinateSystem: 'polar',barWidth: 35,data:data2},
        {
            type: 'bar',
            name:'状态',
            coordinateSystem: 'polar',
            barWidth: 40,
            // barCategoryGap:'100%',
            animation:false,
            barGap:'80%',
            itemStyle: {
                barBorderRadius: 10,
                shadowBlur: 0,
            },
            data: data
        },
        // {
        //     type: "custom",
        //     coordinateSystem: 'polar',
        //     renderItem: function(params, api) {
        //         var values = [api.value(0), api.value(1)];
        //         var coord = api.coord(values);
        //         return {
        //             type: 'text',
        //             position: [3 * Math.sin(coord[3]), 3 * Math.cos(coord[3])],
        //             rotation: coord[3] + Math.PI / 2,
        //             origin: [coord[0], coord[1]],
        //             style: {
        //                 text: api.value(1),
        //                 fill: "#ac6",
        //                 fontSize: 16,
        //                 textAlign: "right",
        //                 textVerticalAlign: "middle",
        //                 x: coord[0],
        //                 y: coord[1]
        //             }
        //         };
        //     },
        //     data: data
        // }
    ]
};
export default option;