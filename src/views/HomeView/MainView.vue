<template>
	<div>
		<el-container>
			<div style="margin-top: 10px;">
				<el-row type="flex">
					<el-col>
						<div class="title">文章板块分布</div>
						<div id="echarts1" class="pie-chart"></div>
					</el-col>
					<el-col>
						<div class="title">文章点击量分布</div>
						<div id="echarts2" class="pie-chart"></div>
					</el-col>
				</el-row>
				<el-row type="flex">
					<el-col>
						<div class="title">历年文章数据</div>
						<div id="echarts3" style="width: 1300px; height: 290px;"></div>
					</el-col>
				</el-row>
			</div>
		</el-container>
	</div>
</template>

<style>
.title {
	text-align: center;
	font-weight: bold;
	font-size: large;
}

.pie-chart {
	width: 650px;
	height: 310px;
}
</style>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
	data() {
		return {
			data1: [],
			legend_data3: [],
			xAxis_data3: [],
			series3: [],
		};
	},
	mounted() {
		this.getEchartsData1()
		this.getEchartsData2()
		this.getEchartsData3()
	},
	methods: {
		showEcharts1() {
			var chartDom = document.getElementById('echarts1');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				// title: {
				// 	text: 'fuck xdl',
				// 	left: 'center'
				// },
				tooltip: {
					trigger: 'item'
				},
				legend: {
					// textStyle: {
					// 	fontSize: 10,
					// },
					show: true,
					top: '5%',
					orient: 'vertical',
					left: 'left',

				},
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['45%', '70%'],
						center: ['70%', '45%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 0,
							borderColor: '#fff',
							borderWidth: 0
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 10,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: this.data1,
					}
				]
			};
			option && myChart.setOption(option);
		},
		getEchartsData1() {
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'count',
				}
			}).then((res) => {
				this.data1 = res.data
				this.showEcharts1()
			})
		},
		showEcharts2() {
			var chartDom = document.getElementById('echarts2');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				tooltip: {
					trigger: 'item'
				},
				// title: {
				// 	text: 'fuck xdl',
				// 	left: 'center'
				// },
				legend: {
					// textStyle: {
					// 	fontSize: 10,
					// },
					show: true,
					top: '5%',
					orient: 'vertical',
					left: 'left'
				},
				grid: {
					left: '200px',
					containLabel: true
				},
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['45%', '70%'],
						center: ['70%', '45%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 0,
							borderColor: '#fff',
							borderWidth: 0
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 10,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: this.data2,
					}
				]
			};
			option && myChart.setOption(option);
		},
		getEchartsData2() {
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'click',
				}
			}).then((res) => {
				this.data2 = res.data
				this.showEcharts2()
			})
		},
		showEcharts3() {
			var chartDom = document.getElementById('echarts3');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				title: {
					text: '' //123123123
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: this.legend_data3,
					orient: 'vertical',
					left: 'left',
				},
				grid: {
					left: '180px',
					right: '4%',
					bottom: '3%',
					top: '3 %',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.xAxis_data3
				},
				yAxis: {
					type: 'value'
				},
				"series": this.series3
			}
			option && myChart.setOption(option)
		},
		getEchartsData3() {
			axios.request({
				method: 'GET',
				url: 'api/article/line',
				params: {
					chart_type: 'year',
				}
			}).then((res) => {
				this.legend_data3 = res.data.category_list
				this.xAxis_data3 = res.data.year_list
				this.series3 = res.data.series
				// console.log(this.xAxis_data3)
				this.showEcharts3()
			})
		},
	}
}
</script>