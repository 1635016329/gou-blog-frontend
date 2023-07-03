<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import { useRoute } from 'vue-router';
import myAxios from '@/plugins/myAxios'
import { ref } from 'vue';
import Footer from '@/components/Footer/index.vue'


const route = useRoute()
const postId = route.params.postId
const post = ref()

myAxios.get('/post/get/vo', {
    params: {
        id: postId
    }
}).then((res: any) => {
    console.log(res);
    post.value = res
})

function formatDate(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Intl.DateTimeFormat("zh-CN", options).format(new Date(dateTimeString));
}
</script>

<template>
    <div class="blog-view">
        <Header />
        <div class="blog-content">
            <h1 class="title">{{ post.title }}</h1>
            <div class="info">
                {{ formatDate(post.createTime) }} | {{ post.user.userName }}
            </div>
            <div class="content">
                {{ post.content }}
            </div>
        </div>
        <Footer />

    </div>
</template>

<style scoped>
.title {
    margin-bottom: 20px;
    text-align: center;
}
.info {
    color: #8c8c8c;
    text-align: center;
    margin-bottom: 30px;
}
.blog-content {
    padding: 20px 200px;
    width: 80%;
    min-height: 80vh;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
}
</style>