<template>
    <el-col>
        <div style="margin-left:40px;margin-top:30px">
            <h2>新增文章信息</h2>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px"
            style="margin-top:25px; margin-left:30px; width:400px">
            <el-form-item label="文章名称" prop="name">
                <el-input v-model="arti.title" :value="arti.title"></el-input>
            </el-form-item>
            <el-form-item label="文章来源" prop="source">
                <el-select v-model="arti.source_name" placeholder="请选择文章来源" style="margin-left:20px">
                    <el-option v-for="(cate, index) in categoryData" :key="index" :label="cate.name" :value="cate.cid"
                        @click.native="choose_category(cate.cid)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章地址" prop="url">
                <el-input v-model="arti.url" :value="arti.url"></el-input>
            </el-form-item>
            <el-form-item label="点击量" prop="cnt">
                <el-input v-model="arti.click_count" :value="arti.click_count"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            edit_aid: '',
            arti: {
                url: '',
                title: '',
                click_count: '',
                source_name: '',
                source_id: 0
            },
            categoryData: [],
            rules: {
                name: [
                    { required: true, message: '请输入文章名称', trigger: 'blur' },
                ],
                source: [
                    { required: true, message: '请选择文章来源', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入文章地址', trigger: 'blur' },
                ],
                cnt: [
                    { type: 'int', required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() {
        this.getCategoryData()
    },
    methods: {
        onSubmit() {
            axios.request({
                method: 'POST',
                url: 'api/article/list',
                data: {
                    aid: this.edit_aid,
                    title: this.arti.title,
                    category_id: this.arti.source_id,
                    url: this.arti.url,
                    click_count: this.arti.click_count
                }
            }).then((res) => {
                this.getArticleView()
            })
        },
        getArticleView() {
            this.$router.push("/article");
        },
        getCategoryData() {
            axios.request({
                method: 'GET',
                url: 'api/article/category',
            }).then((res) => {
                this.categoryData = res.data
                console.log(res.data)
            })
        },
        choose_category(new_cid) {
            this.arti.source_id = new_cid
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