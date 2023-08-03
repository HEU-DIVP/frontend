<template>
    <el-col>
        <div style="margin-left:40px;margin-top:30px">
            <h2>修改密码</h2>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px"
            style="margin-top:25px; margin-left:30px; width:400px">
            <el-form-item label="旧的密码" prop="old">
                <el-input v-model="old_pswd" :value="old_pswd"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="new">
                <el-input v-model="new_pswd" :value="new_pswd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="conf">
                <el-input v-model="configure_pswd" :value="configure_pswd"></el-input>
            </el-form-item>
            <el-button type="primary" @click="SubmitChangePassword">确 定</el-button>
        </el-form>
    </el-col>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            old_pswd: '',
            new_pswd: '',
            configure_pswd: '',
            username: '',
            dialogMsgVisible: false,
            rules: {
                old: [
                    {required: true, message: '请输入旧的密码', trigger: 'blur'}
                ],
                new: [
                    {required: true, message: '请输入新的密码', trigger: 'blur'}
                ],
                conf: [
                    {required: true, message: '请输入确认密码', trigger: 'blur'},
                    {
                        validator: this.checkPasswordMatch, 
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted() {
        this.getUsername()
    },
    methods: {
        SubmitChangePassword() {
            axios.request({
                method: 'PUT',
                url: 'api/user/login',
                data: {
                    username: this.username,
                    password: this.old_pswd,
                    new_password: this.new_pswd
                }
            }).then((res) => {
                this.gotoMainView()
            })
        },
        gotoMainView() {
            this.$router.push("/");
        },
        getUsername() {
            this.username = localStorage.getItem('username')
        },
        checkPasswordMatch() {
            if (new_pswd == configure_pswd) {
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