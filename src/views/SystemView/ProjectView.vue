<template>
	<div>
		<el-col style="width: 100%;">
			<el-container>
				<div style="height: 410px;">
					<el-row type="flex">
						<el-col>
							<div id="echarts1" style="width: 650px; height: 360px;"></div>
						</el-col>
						<el-col>
							<div id="echarts2" style="width: 650px; height: 360px;"></div>
						</el-col>
					</el-row>
				</div>
			</el-container>
			<div>
				<el-table :data="dataCf" height="240px" border style="width:100%;margin-top20px">
					<el-table-column prop="id" label="#" width="140" header-align="center" align="center"></el-table-column>
					<el-table-column prop="creationTimeSeconds" label="When" width="140" header-align="center"
						align="center">
						<template slot-scope="scope">
							{{ scope.row.creationTimeSeconds | formatDate }}
						</template>
					</el-table-column>
					<el-table-column prop="problem.rating" label="Rating" width="140" header-align="center"
						align="center"></el-table-column>
					<el-table-column prop="author.contestId" label="ContestID" width="140" header-align="center"
						align="center"></el-table-column>
					<el-table-column prop="programmingLanguage" label="Lang" width="200" header-align="center"
						align="center"></el-table-column>
					<el-table-column prop="verdict" label="Verdict" header-align="center" align="center"></el-table-column>
					<el-table-column prop="timeConsumedMillis" label="Time" width="120" header-align="center"
						align="center">
						<template slot-scope="scope">
							{{ scope.row.timeConsumedMillis + 'ms' }}
						</template>
					</el-table-column>
					<el-table-column prop="memoryConsumedBytes" label="Memory" width="120" header-align="center"
						align="center">
						<template slot-scope="scope">
							{{ scope.row.memoryConsumedBytes + 'KB' }}
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-col>
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
			dataCf: [],
			responseData: '',
			intervalId: null
		};
	},
	filters: {
		formatDate(timestamp) {
			const date = new Date(timestamp * 1000);
			return date.toLocaleString().replace(/:\d{1,2}$/, '');
		},
	},
	mounted() {
		this.getEchartsData12()
		this.startFetching()
	},
	beforeDestroy() {
		this.stopFetching()
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
		async fetchData() {
			this.getEchartsData12()
		},
		getEchartsData12() {
			axios.request({
				method: 'GET',
				url: 'api/article/codeforces',
				params: {
					count: 50,
				}
			}).then((res) => {
				if (res.data) {
					this.data1 = res.data.pie_list
					this.xAxisdata2 = res.data.x_axis_data
					this.data2 = res.data.column_res
					this.dataCf = res.data.data.result
					this.showEcharts1()
					this.showEcharts2()
				}
			}).catch((err) => {

			})
		},
		page_interval() {
			this.getEchartsData12()
		},
		startFetching() {
			this.intervalId = setInterval(this.fetchData, 3000);
		},
		stopFetching() {
			clearInterval(this.intervalId);
		},
	}
}
</script>
  
<style></style>