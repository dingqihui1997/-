import api from "../../http/api"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: {
            type: Array,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // book: [],
        url: api.STATIC_HOST,
        total: 0, //总条数
        start: 0, // 页数
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // getData() {
        //     api.bookSearch(this.data.price, this.data.start).then(res => {
        //         console.log(res);
        //         this.setData({
        //             book: this.data.book.concat(res.books),
        //             total: res.total
        //         })
        //     }).catch(err => {
        //         console.log("请求失败", err);
        //     })
        // },
        goto(e) { //去详情
            wx.setStorageSync("details", e.currentTarget.dataset.index._id),
                wx.navigateTo({
                    url: '/pages/details/details'
                })
        },
        sroll() { //
            if (this.data.total > this.data.book.length) {
                this.data.start++
                this.setData({
                    start: this.data.start
                })
                this.getData()
            }
            console.log(this.data.book.length);
        }
    },
    lifetimes: {
        ready() {
            // this.getData()
        }
    }
})