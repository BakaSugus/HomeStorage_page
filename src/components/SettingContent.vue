<template>
  <div style="width: 100%;">
    <el-tabs style="margin-left: 10px;" v-model="activeName">
      <el-tab-pane label="用户管理" name="first"><User></User></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"><Role></Role></el-tab-pane>
      <el-tab-pane label="映射查看" name="fourth"><Disk></Disk></el-tab-pane>
      <el-tab-pane label="插件管理" name="sixth"><plugin></plugin></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import User from "../components/settingComponent/UserManager.vue"
  import Role from "../components/settingComponent/Role.vue"
  import Disk from "../components/settingComponent/Disk.vue"
  import Patten from "../components/settingComponent/PatternData.vue"
  import plugin from "../components/settingComponent/plugin.vue"
  export default {
    components: {
      User,
      Role,
      Disk,
      Patten,
      plugin
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {}
  }
</script>

<style>
</style>
