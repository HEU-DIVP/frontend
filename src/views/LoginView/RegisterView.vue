<template>
    <el-col>
        <div style="margin-left:40px;margin-top:30px">
            <h2>注册</h2>
        </div>
        <el-form :model="info" :rules="rules" ref="info" label-width="80px"
            style="margin-top:25px; margin-left:30px; width:400px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="new_pswd">
                <el-input v-model="info.new_pswd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="configure_pswd">
                <el-input v-model="info.configure_pswd"></el-input>
            </el-form-item>
            <el-button type="primary" @click="SubmitRegister('info')">确 定</el-button>
        </el-form>
    </el-col>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.info.new_pswd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            info: {
                username: '',
                new_pswd: '',
                configure_pswd: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                new_pswd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                configure_pswd: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    {
                        validator: validatePass,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getUsername()
    },
    methods: {
        SubmitRegister(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.request({
                        method: 'POST',
                        url: 'api/user/create',
                        data: {
                            username: this.info.username,
                            password: this.info.new_pswd
                        }
                    }).then((res) => {
                        this.gotoMainView()
                    })
                }
            })

        },
        gotoMainView() {
            this.$router.push("/");
        },
        getUsername() {
            this.username = localStorage.getItem('username')
        },
        checkPasswordMatch() {
            if (this.pswd.new_pswd == this.pswd.configure_pswd) {
                cancelIdleCallback()
            }
            else {
                cancelIdleCallback(new Error('两次输入的密码不一致'))
            }
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