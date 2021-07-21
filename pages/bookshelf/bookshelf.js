import util from "../../utils/util"
import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: true, //编辑
        book: [], //收藏书籍
        url: api.STATIC_HOST,
        bur: false //
    },
    goto() {
        wx.navigateTo({
            url: '/pages/help/help',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    choice() {
        this.setData({
            flag: !this.data.flag,
            bur: !this.data.bur
        })
    },
    del(e) { //删除选择的一项
        let index = e.currentTarget.dataset.index
        this.data.book.splice(index, 1)
        this.setData({
            book: this.data.book
        })
        wx.setStorageSync('collectionHistory', this.data.book) //shanc 
    },
    see(e) {
        wx.setStorageSync("details", e.currentTarget.dataset.item._id),
            wx.navigateTo({
                url: '/pages/details/details'
            })
    },
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let arr = util.getHistory({
            key: 'collection'
        })
        this.setData({
            book: arr
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})