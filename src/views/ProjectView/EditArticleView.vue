<template>
    <el-col>
        <div style="margin-left:40px;margin-top:30px">
            <h2>编辑文章信息</h2>
        </div>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:25px; margin-left:30px; width:400px">
            <el-form-item label="文章名称">
                <el-input v-model="arti.title" :value="arti.title"></el-input>
            </el-form-item>
            <el-form-item label="文章来源">
                <el-select v-model="arti.source_name" placeholder="请选择文章来源" style="margin-left:20px">
                    <el-option v-for="(cate, index) in categoryData" :key="index" :label="cate.name" :value="cate.cid"
                        @click.native="change_category(cate.cid)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章地址">
                <el-input v-model="arti.url" :value="arti.url"></el-input>
            </el-form-item>
            <el-form-item label="点击量">
                <el-input v-model="arti.click_count" :value="arti.click_count"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
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
            categoryData: []
        }
    },
    mounted() {
        this.getOriginInfo()
        this.getCategoryData()
    },
    methods: {
        onSubmit() {
            axios.request({
                method: 'PUT',
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
        getOriginInfo() {
            this.edit_aid = this.$route.query.aid
            axios.request({
                method: 'GET',
                url: 'api/article/list',
                params: {
                    aid: this.edit_aid
                }
            }).then((res) => {
                this.arti.url = res.data.data[0].url
                this.arti.title = res.data.data[0].title
                this.arti.click_count = res.data.data[0].click_count
                this.arti.source_name = res.data.data[0].source.name
                this.arti.source_id = res.data.data[0].source.cid
                console.log(this.arti)
            })
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
        change_category(new_cid) {
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