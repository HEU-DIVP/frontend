<template>
    <el-col>
        <div style="margin-left:40px;margin-top:30px">
            <h2>添加文章</h2>
        </div>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:25px; margin-left:30px; width:400px">
            <el-form-item label="文章名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="文章来源">
                <el-select v-model="form.source" placeholder="请选择文章来源">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-col>
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                        style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="文章地址">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                source: '',
                date: '',
                url: '',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>