<template>
  <div class="col-xs-12 col-md-12 yg-header">
    <div class="row middle-xs middle-md">
      <div class="col-xs-4">
        <!--<span class="am-icon-map-marker am-icon-arrow-left size3"></span>-->
      </div>
      <div class="col-xs-4">
        <span class="devSta size2">雾霭指数图</span>
      </div>
      <div class="col-xs-4">
      </div>
    </div>
  </div>
  <div class="col-xs-12 col-md-12 flex-12-all" style="height: 75%;overflow: hidden;">
    <div class="am-form am-form-horizontal  chartDiv">
      <div id="chart" class="chart"></div>
      <div class="chartLegend">
        <div class="legendItem1"></div>室内
        &nbsp;
        <div class="legendItem2"></div>室外
      </div>
      <div class="buttonDiv">
        <button >年</button>
        <button >月</button>
        <button >周</button>
      </div>
    </div>
  </div>
  <div class="col-xs-12 col-md-12 yg-footer-b">

  </div>
</template>
<style>
  .buttonDiv{
    width:100%;text-align: center
  }
  .buttonDiv button{
    background-color:  #0e90d2;
  }
</style>
<script>
  export default {
    ready: function () {
      var echarts = require('echarts')

      var myChart = echarts.init(document.getElementById('chart'))

      function randomData () {
        now = new Date(+now + oneDay)
        value = value + Math.random() * 21 - 10
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
          ]
        }
      }

      var data = []
      var data2 = []
      var now = +new Date(1997, 9, 3)
      var oneDay = 24 * 3600 * 1000
      var value = Math.random() * 1000
      for (var i = 0; i < 30; i++) {
        data.push(randomData())
        data2.push(randomData())
      }
      var option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(250,250,250,1)',
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(250,250,250,1)'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(250,250,250,1)',
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(250,250,250,1)'
            }
          },
          axisTick: {
            show: false
          }

        },
        series: [{
          name: '室内',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data,
          itemStyle: {
            normal: {
              color: '#65D873'
            }
          }
        }, {
          name: '室外',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data2,
          itemStyle: {
            normal: {
              color: '#FFF65A'
            }
          }
        }]
      }
      myChart.setOption(option)
    }
  }
</script>
