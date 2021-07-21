import api from "../../http/api"
import utils from "../../utils/util"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newHotWords: [],
        arr: [], //热词
        flag: true,
        rgba: [], //背景颜色
        del: false, //删除按钮
        history: [], //搜索历史
        value: '',
        book: [], //内容
        total: 0, //总条数
        start: 0, // 页数
    },
    getData() {
        api.hotWord().then(res => {
            // console.log(res);
            this.setData({
                newHotWords: res.newHotWords
            })
            this.lang()
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    lang() { //换一换
        let list = this.data.newHotWords //打乱数组
        for (let i = 0; i < list.length + 4; i++) {
            let rdm = Math.floor(Math.random() * list.length)
            list.push(list[rdm])
            list.splice(rdm, 1)
        }
        let num = Math.floor(Math.random() * this.data.newHotWords.length)
        this.setData({
            arr: list.slice(num)
        })
        let rgb = [] //生成随机颜色
        this.data.newHotWords.map(item => {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            rgb.push(`rgb(${r},${g},${b})`)
        })
        this.setData({
            rgba: rgb
        })
    },
    search(e) { //点击回车搜索
        if (e.detail.value.replace(/\s+/g, '')) { //输入框没有内容不能搜索，去除空格
            this.setData({
                    flag: false,
                    book: []
                }),
                this.content()
            utils.saveHistory({
                key: "search",
                data: e.detail.value.trim(),
                attr: "name"
            })
            let a = utils.getHistory({ //获取搜索历史记录
                key: "search"
            })
            if (a) {
                this.setData({
                    history: a
                })
            }
        }
    },
    del() { //删除搜索内容
        this.setData({
            value: '',
            flag: true,
            del: false,
            book: []
        })
    },
    ipt(e) { //监听input控制删除按钮
        if (e.detail.value) {
            this.setData({
                del: true,
                value: e.detail.value,
            })
        } else {
            this.setData({
                del: false,
                flag: true
            })
        }
    },
    empty() { //删除所有搜索历史
        let num = []
        this.setData({
            history: num
        })
        wx.removeStorageSync('searchHistory')
    },
    click(e) { //点击热词
        this.setData({
            value: e.currentTarget.dataset.item.word,
            flag: false,
            del: true,
            book: []

        })
        this.content()
        utils.saveHistory({
            key: "search",
            data: e.currentTarget.dataset.item.word,
            attr: "name"
        })
        let a = utils.getHistory({ //获取搜索历史记录
            key: "search"
        })
        this.setData({
            history: a
        })
    },
    history(e) { //点击搜索关键字
        this.setData({
            value: e.currentTarget.dataset.item.name,
            flag: false,
            del: true,
            book: []
        })
        this.content()
        let arr = this.data.history.filter(item => { //先过滤出
            return item.name.includes(this.data.value) !== true
        })
        console.log(arr);
        arr.unshift({
            'name': this.data.value
        })
        this.setData({
            history: arr
        })
        wx.setStorageSync('searchHistory', this.data.history)
    },
    content() { //获取内容
        api.bookSearch(this.data.value, this.data.start).then(res => {
            console.log(res);
            this.setData({
                book: this.data.book.concat(res.books),
                total: res.total
            })
        }).catch(err => {
            console.log("请求失败", err);
        })
    },
    sroll() { //
        if (this.data.total > this.data.book.length) {
            this.data.start++
            this.setData({
                start: this.data.start
            })
            this.content()
        }
        console.log(this.data.book.length);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let a = utils.getHistory({ //获取搜索历史记录
            key: "search"
        })
        if (a) {
            this.setData({
                history: a
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.total > this.data.book.length && this.data.book.length !== 0) {
            this.data.start++
            this.setData({
                start: this.data.start
            })
            this.content()
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})