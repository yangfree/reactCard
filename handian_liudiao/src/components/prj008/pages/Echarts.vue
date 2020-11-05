<template>
    <section class="chart-container">
      prj008Echarts 页面
        <!-- <el-row>
            <el-col :span="24">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row> -->
    </section>
</template>

<script>
// import echarts from 'echarts';
// import {apiECharts} from '@/api/api-prj005';
export default {
  data () {
    return {
      // chartColumn: null,
      // chartBar: null,
      // chartLine: null,
      // chartPie: null,
      // chartData:{}
    }
  },

  methods: {
    // drawCharts () {
    //   apiECharts().then(res=>{
    //     var chartData = {}
    //     chartData = res.data.data
    //     console.log(chartData)
    //     this.chartPie = echarts.init(document.getElementById('chartPie'))
    //     this.chartBar = echarts.init(document.getElementById('chartBar'))

    //     this.chartPie.setOption({
    //       title: {
    //         text: '流调数据状态占比',
    //         subtext: '盆腔炎性疾病及其后遗症临床流行病学',
    //         x: 'center'
    //       },
    //       tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //       },
    //       legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //         data: chartData.checked_status//['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //       },
    //       series: [
    //         {
    //           name: '访问来源',
    //           type: 'pie',
    //           radius: '55%',
    //           center: ['50%', '60%'],
    //           data: [
    //                       {value:chartData.pine[0].value, name:chartData.pine[0].name},
    //                       {value:chartData.pine[1].value, name:chartData.pine[1].name},
    //                       {value:chartData.pine[2].value, name:chartData.pine[2].name}
    //           ],
    //           itemStyle: {
    //             emphasis: {
    //               shadowBlur: 10,
    //               shadowOffsetX: 0,
    //               shadowColor: 'rgba(0, 0, 0, 0.5)'
    //             }
    //           }
    //         }
    //       ]
    //     })
    //     this.chartBar.setOption({
    //         title : {
    //             text: '流调数据提交医院排名',
    //             subtext: '盆腔炎性疾病及其后遗症临床流行病学',
    //             x:'center'
    //         },
    //         tooltip : {
    //             trigger: 'axis',
    //             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //             }
    //         },
    //         legend: {
    //             orient : 'vertical',
    //             x : 'left',
    //             data:chartData.checked_status
    //         },
    //         calculable : true,
    //         xAxis : [
    //             {
    //                 type : 'category',
    //                 //设置字体倾斜  
    //                 axisLabel: {
    //                     interval: 0,
    //                     rotate: 0,
    //                     //倾斜度 -90 至 90 默认为0  
    //                     margin: 2,
    //                     textStyle: {
    //                         //fontWeight: "bolder",
    //                         color: "#000000"
    //                     }
    //                 },
    //                 data : chartData.hospitals_list.slice(0,10)
    //             }
    //         ],
    //         yAxis : [
    //             {
    //                 type : 'value'
    //             }
    //         ],
    //         series : [
    //             {
    //                 name:chartData.bar[0].name.slice(0,10),
    //                 type:'bar',
    //                 stack:'hospital',
    //                 data:chartData.bar[0].data.slice(0,10)
    //             },
    //             {
    //                 name:chartData.bar[1].name.slice(0,10),
    //                 type:'bar',
    //                 stack: 'hospital',
    //                 data:chartData.bar[1].data.slice(0,10)
    //             },
    //             {
    //                 name:chartData.bar[2].name.slice(0,10),
    //                 type:'bar',
    //                 stack: 'hospital',
    //                 //设置柱的宽度，要是数据太少，柱子太宽不美观~
    //                 barWidth:20,
    //                 data:chartData.bar[2].data.slice(0,10)
    //             }
    //         ]
    //     })
    //     // console.log("drawPieChart1",chartData)
    //   }).catch();
    // }
  },

  // mounted: function () {
  //   this.drawCharts()
  // },
  // updated: function () {
  //   this.drawCharts()
  // },
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
