import imgurl from "../../http/api"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        boy: {
            type: Array,
            value: ''
        },
        title: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        url: imgurl.STATIC_HOST
    },

    /**
     * 组件的方法列表
     */
    methods: {
        click1(e, index) {
            wx.navigateTo({
                url: `/pages/list/list?index=${e.currentTarget.dataset.index}`,
            })

            wx.setStorageSync("id", e.currentTarget.dataset.item)
            console.log(e, index);
        },
    },
    lifetimes: {
        ready() {
            // console.log(this.data.boy);
            // console.log(this.data.url);
        }
    }

})