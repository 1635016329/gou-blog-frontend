<script setup lang="ts">
import beianImgUrl from '@/assets/beian.png' 
</script>

<template>
    <div class="footer">
        <span class="item">Made with ❤</span>
        <span class="item">© 2023 Gousheng, Inc</span><br>
        <a class="item" href="https://beian.miit.gov.cn/" target="_blank">琼ICP备2023003578号-1</a>
        <img class="img item" :src="beianImgUrl">
        <a class="item" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=46010802001273" target="_blank">琼公网安备46010802001273号</a>
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    height: 50px;
    line-height: 50px;
}

.item {
    margin-right: 10px;
}

.img {
    width: 20px;
    height: 20px;
    margin-top: 17px;
}
</style>