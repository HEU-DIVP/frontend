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
			data1: []
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
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'count',
				}
			}).then((res) => {
				this.data1 = res.data
				this.showEcharts2()
			})
		},
		showEcharts3() {
			var chartDom = document.getElementById('echarts3');
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
		getEchartsData3() {
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'count',
				}
			}).then((res) => {
				this.data1 = res.data
				this.showEcharts3()
			})
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