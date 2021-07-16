<template>
  <div style="margin-left: 20%;width: 50%;">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="用户名" name="用户名">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="邮箱" name="邮箱">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div></div>
      </el-collapse-item>
      <el-collapse-item title="注册时间" name="注册时间">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="Api_Key" name="Api_Key">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>重新生成</div>
      </el-collapse-item>
      <el-collapse-item title="内存使用" name="内存使用">
        <div>已使用</div>
        <div>图表</div>
      </el-collapse-item>
      <!-- <el-collapse-item title="订阅" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
      <el-collapse-item title="归档情况" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script>
  export default {
    // components: {
    //   contents,
    //   bannerBar
    // },
    data() {
      return {
         activeNames: ['用户名','邮箱','注册时间','Api_Key','内存使用']
      }
    },
    mounted() {

    }
  }
</script>

<style>
</style>
