import echarts from "echarts";
const colors = ["#1058E6", "#EC511A", "#FFB43F"];
const option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu"]
  },
  yAxis: {
    type: "value"
  },
  color: colors,
  series: [
    {
      data: [820, 932, 901, 934],
      type: "line",
      symbol: "circle",
      symbolSize: 5,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(19, 91, 235, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(19, 91, 235, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(200, 200, 200, 0.1)",
          shadowBlur: 10
        }
      }
    },
    {
      data: [720, 832, 801, 834],
      type: "line",
      symbol: "circle",
      symbolSize: 5,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(236, 80, 21, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(236, 80, 21, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(200, 200, 200, 0.1)",
          shadowBlur: 10
        }
      }
    },
    {
      data: [720, 632, 401, 534],
      type: "line",
      symbol: "circle",
      symbolSize: 5,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(248, 180, 66, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(248, 180, 66, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(200, 200, 200, 0.1)",
          shadowBlur: 10
        }
      }
    }
  ]
};
export default option;
