<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名:</td>
            <td>
              <el-input v-model="user.email" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <br />
          <tr>
            <td>密码:</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
            </td>
          </tr>
          <br />
          <tr>
            <td colspan="2">
              <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        user: {
          email: '',
          password: '',
          rememberMe: true
          //为了登录方便，可以直接在这里写好用户名和密码的值
        }
      }
    },
    methods: {
      doLogin() {
        this.$axios.post('/api/User/login', this.user).then(responese => {
          if (responese.data.result == true) {
            this.$router.push("/storage")
          }
        }).catch(function(error) {
          this.$message.error('账号或密码错误');
        });
      }
    }
  }
</script>

<style>
  tr {
    margin-bottom: 50px;
  }
</style>
