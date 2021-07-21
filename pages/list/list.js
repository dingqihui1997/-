import api from "../../http/api"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeindex: 0,
        list: [{
                name: '周榜',
            },
            {
                name: '月榜',
            },
            {
                name: '总榜',
            },

        ],
        id: {}, //储存到本地的数据
        num: '', //单个id
        book: [], //榜单
        indexes: 0 //传递过来的索引
    },
    click(e) {
        this.setData({ //切换导航栏
            activeindex: e.currentTarget.dataset.index
        });
        this.rankInfo(this.data.num)
    },
    rankInfo() { //周榜
        if (this.data.activeindex === 0) {
            this.setData({
                num: this.data.id._id
            })
        }
        if (this.data.activeindex === 1) {
            this.setData({
                num: this.data.id.monthRank
            })
        }
        if (this.data.activeindex === 2) {
            this.setData({
                num: this.data.id.totalRank
            })
        }
        api.rankInfo(this.data.num).then(res => {
            // console.log(res);
            this.setData({
                book: res.ranking.books
            })
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    lifetimes: {
        ready() {}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { //接收传递过来的参数
        this.setData({
            indexes: Number(options.index)
        })
        console.log(this.data.indexes);
        wx.setNavigationBarTitle({ //配置动态头部标题
            title: wx.getStorageSync('id').title,
        })
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
        this.setData({ //获取储存的数据
            id: wx.getStorageSync('id')
        })
        this.rankInfo(this.data.num) //一进页面加载周榜
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})