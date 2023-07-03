<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import myAxios from '@/plugins/myAxios'
import { useDataListStore } from '@/stores/useDataListStore'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const store = useDataListStore()
const { dataList, pageNum, pageSize, searchText, noMore, type, pictureList } = storeToRefs(store)
const cur = ref<string[]>(['home'])
const isUpdateSuggest = ref(true)
const isShowTitleSuggest = ref(false)

const route = useRoute()
const onSearchTitle = (value: string) => {
    if (value === '' || !isUpdateSuggest.value) {
        return
    }
    console.log('搜索title: ' + value);
    myAxios.post("/search/data", { current: 1, pageSize: 10, searchText: searchText.value, type: 'title' }).then((res: any) => {
        titleSuggestList.value.splice(0);
        const list = res.dataList
        console.log(list);

        list.forEach((item: any) => {
            titleSuggestList.value.push(item.title)
        });
        console.log(titleSuggestList.value);
    });
}

watchEffect(() => {
    onSearchTitle(searchText.value)
    isShowTitleSuggest.value = true
})
watchEffect(() => {
    cur.value[0] = route.fullPath.slice(1)
    isShowTitleSuggest.value = false
})

watchEffect(() => {
    store.searchText = searchText.value
})
store.searchText = searchText.value

const titleSuggestList = ref<string[]>([])


const onSearch = (value: string) => {
    console.log('搜索: ' + value);
    myAxios.post("/search/data", { current: pageNum.value, pageSize: pageSize.value, searchText: searchText.value, type: type.value }).then((res: any) => {
        if (res.dataList.length === 0) {
            noMore.value = true            
        }
        isShowTitleSuggest.value = false
        noMore.value = false
        if (type.value === 'picture') {
            pictureList.value = res.dataList;
        } else if (type.value === 'post') {
            dataList.value = res.dataList;
        }
        pageNum.value = 1
        pageSize.value = 10
    });
}



// 搜索建议
const activeIndex = ref(-1)

// 删除html标签
const removeHtmlTags = (html: string) => {
    // 使用正则表达式匹配并删除 HTML 标签
    var clean = html.replace(/<[^>]*>/g, '');
    return clean;
}
const inputElement = ref(null);

const handleInput = () => {
    activeIndex.value = -1
}

const handleKeydown = (event: any) => {

    if (event.keyCode === 40 && activeIndex.value < titleSuggestList.value.length - 1) {//向下
        activeIndex.value++
        isUpdateSuggest.value = false
        searchText.value = removeHtmlTags(titleSuggestList.value[activeIndex.value])
    }

    if (event.keyCode === 38 && activeIndex.value > 0) {
        isUpdateSuggest.value = false
        activeIndex.value--
        searchText.value = removeHtmlTags(titleSuggestList.value[activeIndex.value])
    }

    if (event.keyCode === 8 || event.keyCode === 46) {
        isUpdateSuggest.value = true
    }

}

const handleClick = (suggestion: string) => {
    isUpdateSuggest.value = false
    searchText.value = removeHtmlTags(suggestion)
    onSearch(searchText.value)
}

onMounted(() => {
    window.addEventListener('click', () => {
        activeIndex.value = -1
    })
})

</script>
<template>
    <div class="header">
        <a-row>
            <a-col :span="4">
                <div class="logo"></div>
            </a-col>
            <a-col :span="8">
                <a-menu v-model:selectedKeys="cur" mode="horizontal" :style="{ lineHeight: '64px' }">
                    <a-menu-item key="home">
                        <router-link to="/home">首页</router-link>
                    </a-menu-item>
                    <a-menu-item key="picture">
                        <router-link to="/picture">图片</router-link>
                    </a-menu-item>
                    <a-menu-item key="about">
                        <router-link to="/about">关于</router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="8">
                <div class="search">
                    <a-input-search ref="inputElement" v-model:value="searchText" size="large" placeholder="输入你要搜索的内容"
                        enter-button @search="onSearch" @input="handleInput" @keydown="handleKeydown" />
                    <ul class="search-suggest" v-if="searchText !== '' && isShowTitleSuggest">
                        <li v-for="(suggestion, index) in titleSuggestList" :key="index" @click="handleClick(suggestion)"
                            @mousedown="handleClick(suggestion)" :class="{ active: index === activeIndex }">
                            <span v-html="suggestion"></span>
                        </li>
                    </ul>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="user">
                </div>
            </a-col>


        </a-row>
    </div>
</template>

<style scoped>
.search .search-suggest {
    position: absolute;
    top: 40;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-top: 0;
    z-index: 999;
}

.search li {
    height: 40px;
    padding-left: 13px;
    font-size: 14px;
    line-height: 40px;
    list-style: none;
}

.search li:hover {
    background: #d9d9d9;
}

.active {
    background: #d9d9d9;
}

.header {
    background: #fff;
}

.logo {
}

.search {
    margin-top: 12px;
}

.user {
}

.selected {
    background-color: #d9d9d9;
}
</style>