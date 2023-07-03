import { defineStore } from "pinia"


export const useDataListStore = defineStore('dataList', {
    state: () => ({ 
        dataList: [],
        searchText: '',
        pageNum: 1,
        pageSize: 10,
        pages: 0,
        noMore: false,
        type: 'post',
        pictureList: []
     }),
    getters: {
    },
    actions: {

    },
  })