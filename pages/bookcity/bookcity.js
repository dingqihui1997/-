import api from "../../http/api"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        male: [], //男生
        female: [], //女生
        press: [], //出版
        boy: [], //男生排行
        girl: [] //女生排行
    },
    click(e) { //修改index显示页面
        this.setData({
            index: e.currentTarget.dataset.index
        })
    },
    getCats() { //获取大分类
        api.getCats().then(res => {
            // console.log(res);
            res.male.map((item) => {
                item.gender = 'male'
            })
            res.female.map((item) => {
                item.gender = 'female'
            })
            this.setData({
                male: res.male, //男性
                female: res.female, //女性
                press: res.press //出版
            })
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    rankCategory() { //获取排行
        api.rankCategory().then(res => {
            // console.log(res);
            this.setData({
                    boy: res.male.slice(0, 6)
                }),
                this.setData({
                    girl: res.female.slice(0, 6)
                })
        }).catch(err => {
            console.log("请求失败", err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
        this.getCats(),
            this.rankCategory()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})