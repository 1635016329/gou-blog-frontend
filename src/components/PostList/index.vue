<script setup lang="ts">
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import myAxios from '@/plugins/myAxios'
import { useDataListStore } from '@/stores/useDataListStore'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue';

const actions: Record<string, string>[] = [
    { type: 'StarOutlined', text: '156' },
    { type: 'LikeOutlined', text: '156' },
    { type: 'MessageOutlined', text: '2' },
];

const store = useDataListStore()
const { dataList, type, pageNum, pageSize, pages, noMore, searchText } = storeToRefs(store)
type.value = 'post'
const loading = ref(true);
myAxios.post("/search/data", { current: pageNum.value, searchText: searchText.value,  pageSize: pageSize.value, type: 'post'}).then((res: any) => {
    dataList.value = res.dataList
    loading.value = false
});

const onLoadMore = () => {
    loading.value = true;
    setTimeout(() => {
        myAxios.post("/search/data", { current: ++pageNum.value, pageSize: pageSize.value, searchText: store.searchText, type: 'post' }).then((res: any) => {
            console.log(res);
            console.log(dataList.value);
            if (res.dataList.length === 0) {
                noMore.value = true
            }
            
            const oldList = JSON.parse(JSON.stringify(dataList.value));
            dataList.value = oldList.concat(res.dataList)
            pages.value = res.pages
            console.log(dataList.value);
            loading.value = false;
            nextTick(() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }, 1000)

};

const getComponent = (type: string) => {
    switch (type) {
        case 'StarOutlined':
            return StarOutlined;
        case 'LikeOutlined':
            return LikeOutlined;
        case 'MessageOutlined':
            return MessageOutlined;
        default:
            return null;
    }
};
</script>

<template>
    <div class="post-list">
        <a-list item-layout="vertical" size="large" :data-source="dataList">

            <template #loadMore>
                <div v-if="!loading && dataList.length > 5"
                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px'}">
                    <a-button style="margin-bottom: 10px;" @click="onLoadMore" v-if="!noMore">loading more</a-button>
                    <span v-if="noMore">没有更多了</span>
                </div>
                <div class="spin" v-if="loading">
                    <a-spin >
                    </a-spin>
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item class="list-item" key="item.title">
                    <template #actions>
                        <span v-for="{ type, text } in actions" :key="type">
                            <component :is="getComponent(type)" style="margin-right: 8px" />
                            {{ text }}
                        </span>
                    </template>
                    <template #extra>
                        <img width="272" alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                    </template>
                    <a-list-item-meta :description="item.tagList.join('、')">
                        <template #title>
                            <a :href="'/post/' + item.id" v-html="item.title"></a>
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.user.userAvatar" />
                        </template>
                    </a-list-item-meta>
                    <div class="overflow-text">
                        {{ item.content }}
                    </div>

                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<style scoped>
.post-list {
    width: 80%;
    margin: 0 auto;

}

.spin {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.overflow-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /* 或者 line-clamp: 2; */
    max-height: 3.6em;
    /* 对于单行文本，每行大约为1.8em，所以设置2行的高度为3.6em */
}

.list-item {
    margin-top: 20px;
    background: #fff;
}
</style>