<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
</script>

<template>
  <div class="about-view">
    <Header></Header>
    <div class="content">
        <h1>作者简介</h1>
        <p>大三计算机科学与技术专业学生一枚</p>
        <h2>邮箱, 欢迎交流</h2>
        <p>914135534@qq.com</p>
    </div>
    <Footer />
  </div>

</template>

<style scoped>
.content {
    background: #fff;
    margin: 0 auto;
    margin-top: 20px;
    width: 1200px;
    height: 600px;
    padding: 20px;
}
</style>