<script setup lang="ts">
import myAxios from '@/plugins/myAxios'
import { storeToRefs } from 'pinia';
import { useDataListStore } from '@/stores/useDataListStore'

const store = useDataListStore()

const { pictureList, pageNum, pageSize, pages, noMore, searchText, type } = storeToRefs(store)
type.value = 'picture'

if (searchText.value === '') {
    myAxios.post("/search/data", { current: pageNum.value, searchText: '狗', pageSize: pageSize.value, type: type.value }).then((res: any) => {
        pictureList.value = res.dataList
    });
} else {
    myAxios.post("/search/data", { current: pageNum.value, searchText: searchText.value, pageSize: pageSize.value, type: type.value }).then((res: any) => {
        pictureList.value = res.dataList
    });
}


</script>

<template>
    <div class="picture-list">
        <a-list :grid="{ gutter: 16, column: 4 }" item-layout="horizontal" :data-source="pictureList">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-card hoverable style="width: 240px; height: 300px; overflow: hidden;">
                        <template #cover>
                            <img class="img" :alt="item.title" :src="item.url" />
                        </template>
                        <a-card-meta :title="item.title">
                            <template #description>{{ item.title }}</template>
                        </a-card-meta>
                    </a-card>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<style scoped>
.picture-list {
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
}

.img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>
