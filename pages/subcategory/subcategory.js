import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: api.STATIC_HOST,
        topindex: 0, //类型索引
        misindex: 0, //小分类索引
        typeList: [{
                id: 'hot',
                name: '热门'
            },
            {
                id: 'new',
                name: '新书'
            },
            {
                id: 'reputation',
                name: '好评'
            },
            {
                id: 'over',
                name: '完结'
            },
            {
                id: 'monthly',
                name: 'VIP'
            }
        ],
        classname: {}, //分类储存的数据
        catalogue: [], //二级标题
        major: '', //大类
        minor: '', //小类
        gender: '', //性别
        type: "hot", //排行hot
        start: 1, //页数
        books: [], //分类数据
        total: 0, //总页数
        tips: ''
    },
    click(e) { //切换热门顶部导航颜色
        this.setData({
            topindex: e.currentTarget.dataset.index, //下标
            type: e.currentTarget.dataset.item.id, //排行类型
            books: []
        })
        this.getCatsBooks()
    },
    minor(e) { //改变小分类的颜色
        this.setData({
            misindex: e.currentTarget.dataset.index, //下标
            minor: e.currentTarget.dataset.item, //小类
            books: []
        })
        this.getCatsBooks()
    },
    goto(e) { //跳转详情,并储存id
        console.log(e);
        wx.setStorageSync("details", e.currentTarget.dataset.item._id),
            wx.navigateTo({
                url: '/pages/details/details'
            })
    },
    getMinor() { //获取小分类
        let arr = []
        api.getMinor().then(res => {
            console.log(res);
            if (this.data.gender === 'female') { //如果是女性
                arr = res.female.filter(item => {
                    return this.data.classname.item.name === item.major
                })
            } else if (this.data.gender === 'male') {
                arr = res.male.filter(item => { //如果是男生
                    return this.data.classname.item.name === item.major
                })
            }
            // console.log(arr);
            if (arr.length !== 0 && arr[0].mins.length !== 0) { //有小标题才添加
                arr[0].mins.unshift('全部')
                this.setData({
                    catalogue: arr[0].mins
                })
            }
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    getCatsBooks() { //获取分类书籍
        if (this.data.misindex === 0) { //没有小类，获取全部
            this.setData({
                minor: null
            })
        }
        if (!this.data.gender) { //出版传press
            this.setData({
                gender: 'press'
            })
        }
        api.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
            // console.log(res);
            this.setData({
                books: this.data.books.concat(res.books),
                total: res.total //总页数
            })
            // console.log(this.data.books);
        }).catch(err => {
            console.log('请求失败', err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({ //配置动态头部标题
            title: wx.getStorageSync('classname').item.name,
        })
        this.setData({
            classname: wx.getStorageSync('classname'),
            major: wx.getStorageSync('classname').item.name, //大类
            gender: wx.getStorageSync('classname').item.gender //性别
        })
        this.getCatsBooks() //获取分类书籍
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

        this.getMinor() //获取小分类
    },
    lifetimes: {
        ready() {}
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
    onPullDownRefresh: function () {


    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.total > this.data.books.length) {
            // 页数
            this.data.start++
            this.setData({
                start: this.data.start
            })
            this.getCatsBooks()
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})