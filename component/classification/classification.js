Component({
    /**
     * 组件的属性列表
     */
    properties: {
        male: {
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goto(e) {
            wx.navigateTo({
                url: `/pages/subcategory/subcategory`,
            })
            console.log(e);
            wx.setStorageSync('classname', e.currentTarget.dataset) //储存分类
        }
    },
    lifetimes: {
        ready() {
            // console.log(this.data.title, this.data.male);
        }
    }
})