<template>
	<div>
		<el-container>
			<div>
				<el-row type="flex">
					<el-col>
						<div id="echarts1" style="width: 300px; height: 300px;"></div>
					</el-col>
					<el-col>
						<div id="echarts2" style="width: 300px; height: 300px;"></div>
					</el-col>
				</el-row>
				<el-row type="flex">
					<el-col>
						<div id="echarts3" style="width: 300px; height: 300px;"></div>
					</el-col>
					<el-col>
						<div id="echarts4" style="width: 300px; height: 300px;"></div>
					</el-col>
				</el-row>
			</div>
		</el-container>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
	data() {
		return {
			data1: [],
			data3: []
		};
	},
	mounted() {
		this.getEchartsData1()
		this.getEchartsData2()
		this.getEchartsData3()
		this.getEchartsData4()
	},
	methods: {
		showEcharts1() {
			var chartDom = document.getElementById('echarts1');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				tooltip: {
					trigger: 'item'
				},
				// legend: {
				// 	textStyle: {
				// 		fontSize: 10,
				// 	},
				// 	show: true,
				// 	top: '5%',
				// 	// left: 'center'
				// },
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['40%', '70%'],
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
				// legend: {
				// 	textStyle: {
				// 		fontSize: 10,
				// 	},
				// 	show: true,
				// 	top: '5%',
				// 	// left: 'center'
				// },
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['40%', '70%'],
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
		getEchartsData2() {
			// axios.request({
			// 	method: 'GET',
			// 	url: 'api/article/nightingale',
			// 	params: {
			// 		chart_type: 'count',
			// 	}
			// }).then((res) => {
			// 	this.data1 = res.data
			// this.data3 = 
			this.showEcharts2()
			// })
		},
		showEcharts3() {
			var chartDom = document.getElementById('echarts3');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				title: {
					text: 'Stacked Line'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ["启航网-团情动态-新闻",
						"启航网-团情动态-通知",
						"启航网-团情动态-公告",
						"启航网-创新工作",
						"启航网-创业工作",
						"启航网-创新创业公示板",
						"启航网-媒体聚焦",
						"启航网-基层团讯",
						"启航网-理事会讯"
					]
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
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
					data: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "1970"],
				},
				yAxis: {
					type: 'value'
				},
				"series": [
					{
						"name": "启航网-团情动态-新闻",
						"type": "line",
						"stack": "Total",
						"data": [51, 104, 132, 75, 200, 231, 184, 150, 0, 3],
					},
					{
						"name": "启航网-团情动态-通知",
						"type": "line",
						"stack": "Total",
						"data": [
							179,
							241,
							236,
							214,
							282,
							255,
							246,
							221,
							1,
							1
						]
					},
					{
						"name": "启航网-团情动态-公告",
						"type": "line",
						"stack": "Total",
						"data": [
							37,
							73,
							55,
							52,
							70,
							57,
							43,
							11,
							0,
							0
						]
					},
					{
						"name": "启航网-创新工作",
						"type": "line",
						"stack": "Total",
						"data": [
							0,
							0,
							0,
							1,
							16,
							25,
							20,
							4,
							0,
							0
						]
					},
					{
						"name": "启航网-创业工作",
						"type": "line",
						"stack": "Total",
						"data": [
							14,
							30,
							23,
							18,
							45,
							47,
							14,
							0,
							0,
							0
						]
					},
					{
						"name": "启航网-创新创业公示板",
						"type": "line",
						"stack": "Total",
						"data": [
							78,
							249,
							228,
							102,
							67,
							0,
							0,
							0,
							0,
							0
						]
					},
					{
						"name": "启航网-媒体聚焦",
						"type": "line",
						"stack": "Total",
						"data": [
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							159
						]
					},
					{
						"name": "启航网-基层团讯",
						"type": "line",
						"stack": "Total",
						"data": [
							70,
							245,
							380,
							319,
							442,
							643,
							548,
							566,
							0,
							0
						]
					},
					{
						"name": "启航网-理事会讯",
						"type": "line",
						"stack": "Total",
						"data": [
							27,
							26,
							38,
							41,
							44,
							13,
							42,
							87,
							0,
							10
						]
					}
				]
			}
			option && myChart.setOption(option)
		},
		getEchartsData3() {
			// axios.request({
			// 	method: 'GET',
			// 	url: 'api/article/nightingale',
			// 	params: {
			// 		chart_type: 'count',
			// 	}
			// }).then((res) => {
			// 	this.data1 = res.data
			// 	this.showEcharts3()
			// })
			this.showEcharts3()
		},
		showEcharts4() {
			var chartDom = document.getElementById('echarts4');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				tooltip: {
					trigger: 'item'
				},
				// legend: {
				// 	textStyle: {
				// 		fontSize: 10,
				// 	},
				// 	show: true,
				// 	top: '5%',
				// 	// left: 'center'
				// },
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['40%', '70%'],
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
		getEchartsData4() {
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'count',
				}
			}).then((res) => {
				this.data1 = res.data
				this.showEcharts4()
			})
		},

	}
}
</script>