<template>
	<div style="width:75%">
		<div style="margin-top:20px;margin-left: 30px;font-size: x-large;">
			项目简介
		</div>
		<el-divider></el-divider>
		<div style="margin-left:30px">
			<p style="line-height:30px">
				辛大佬说让我先做别的，所以先空着。
			</p>
		</div>
		<el-divider></el-divider>
		<div style="margin-left:30px">
			<p style="line-height:30px">
				辛大佬说没用，所以先不写了。
			</p>
		</div>
		<div id="fuck114" style="width: 75%; height: 600px;"></div>
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
		this.getEchartsData();
	},
	methods: {
		showEcharts() {
			var chartDom = document.getElementById('fuck114');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				tooltip: {
					trigger: 'item'
				},
				legend: {
					top: '5%',
					left: 'center'
				},
				series: [
					{
						name: ['Access From'],
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
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
								fontSize: 20,
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
		getEchartsData() {
			axios.request({
				method: 'GET',
				url: 'api/article/nightingale',
				params: {
					chart_type: 'count',
				}
			}).then((res) => {
				this.data1 = res.data
				this.showEcharts()
			})
		}
	}
}
</script>
  
<style></style>