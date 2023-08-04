<template>
	<div>
		<el-container>
			<div style="height: 800px;">
				<el-row type="flex">
					<el-col>
						<div id="echarts1" style="width: 600px; height: 390px;"></div>
					</el-col>
					<el-col>
						<div id="echarts2" style="width: 600px; height: 390px;"></div>
					</el-col>
				</el-row>
				<el-row type="flex">
					<el-col>
						1241233i3ridfkjakfjdslkfjd
						<!-- <div id="echarts3" style="width: 1200px; height: 300px;"></div> -->
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
			data2: [],
			xAxisdata2: [],
		};
	},
	mounted() {
		this.getEchartsData12()
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
					top: '18%',
					orient: 'vertical',
					left: 'left',

				},
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['0%', '70%'],
						center: ['60%', '50%'],
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
		showEcharts2() {
			var chartDom = document.getElementById('echarts2');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				xAxis: {
					type: 'category',
					data: this.xAxisdata2,
					axisLabel: {
                    	rotate: 25, // 设置 x 轴刻度标签旋转角度
                	},
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: this.data2,
						type: 'bar'
					}
				]
			};
			option && myChart.setOption(option);
		},
		getEchartsData12() {
			axios.request({
				method: 'GET',
				url: 'api/article/codeforces',
				params: {
					count: 50,
				}
			}).then((res) => {
				this.data1 = res.data.pie_list
				this.xAxisdata2 = res.data.x_axis_data
				this.data2 = res.data.column_res
				this.showEcharts1()
				this.showEcharts2()
			})
		},
	}
}
</script>
  
<style></style>