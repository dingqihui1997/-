// component/week/week.js
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
        url: api.STATIC_HOST
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goto(e) { //跳转详情
            wx.setStorageSync("details", e.currentTarget.dataset.item._id),
                wx.navigateTo({
                    url: '/pages/details/details'
                })
        },
    },
    onShow: function () {

    },
    lifetimes: {
        ready() {

        }
    },

})