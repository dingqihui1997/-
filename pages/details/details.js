import api from "../../http/api"
import util from "../../utils/util"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '', //书籍id
        details: {}, //书籍详细情况
        url: api.STATIC_HOST,
        navindex: 0, //详情评价索引
        list: ["详情", "评价"],
        books: [], //书籍详细信息
        three: [], //推荐书籍
        score: 0, //评分
        reviews: [], //评论
        total: 0, //评论总条数
        start: 1, //评论页数
        flag: false, //查看图片
        text: false, //加入书架
    },
    click(e) { //修改导航栏字体颜色
        this.setData({
            navindex: e.currentTarget.dataset.index
        })
    },
    bookInfo() { //书籍详情
        api.bookInfo(this.data.id).then(res => {
            // console.log(res);
            this.setData({
                details: res,
                score: Math.round(res.rating.score / 2)
            })
        }).catch(err => {
            console.log("请求失败", err);
        })
    },
    Recommended() { //相关推荐
        api.Recommended(this.data.id).then(res => {
            this.setData({
                books: res.books,
            })
            if (this.data.books.length < 3) {
                this.setData({
                    three: res.books
                })
            } else {
                this.change()
            }
        }).catch(err => {
            console.log(err);
        })
    },
    change() { //切换推荐
        if (this.data.books.length > 3) {
            let num = Math.ceil(Math.random() * (this.data.books.length - 3))
            this.setData({
                three: this.data.books.slice(num, num + 3)
            })
        }
    },
    see(e) { //查看推荐
        wx.setStorageSync("details", e.currentTarget.dataset.item._id),
            wx.navigateTo({
                url: '/pages/details/details'
            })
    },
    shortReviews() { //获取评论
        api.shortReviews(this.data.id, this.data.start).then(res => {
            this.setData({
                reviews: this.data.reviews.concat(res.docs),
                total: res.total
            })
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    picture() { //点击图片查看大图
        this.setData({
            flag: true
        })
    },
    cancel() { //隐藏大图
        this.setData({
            flag: !this.data.flag
        })
    },
    collection() {
        this.setData({
            text: true
        })
        util.saveHistory({
            key: "collection",
            data: this.data.details,
            attr: '_id'
        })
    },
    press() { //常按事件
        let img = this.data.url + this.data.details.cover
        wx.showActionSheet({
            itemList: ['保存图片'],
            success(res) {
                wx.downloadFile({ //下载
                    url: img, //仅为示例，并非真实的资源
                    success(res) {
                        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                        if (res.statusCode === 200) {
                            wx.saveImageToPhotosAlbum({ //保存图片到相册
                                filePath: res.tempFilePath,
                                success(res) {
                                    console.log(res.errMsg)
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: wx.getStorageSync("details")
        })
        this.Recommended()
        this.bookInfo()
        this.shortReviews()
    },
    tolower() {
        console.log(this.data.reviews);
        if (this.data.total > this.data.reviews.length) {
            this.data.start++
            this.setData({
                start: this.data.start
            })
            this.shortReviews()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { //获取详情id
        let collection = util.getHistory({ //储存的历史记录
            key: "collection"
        })
        let sum = collection.some(item => {
            return item._id === this.data.id
        })
        if (sum) {
            this.setData({
                text: true
            })
        }
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