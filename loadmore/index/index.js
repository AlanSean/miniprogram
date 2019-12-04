//index.js
//获取应用实例
const app = getApp();
let time;
Page({
    data: {
        mode: 'text',// text 文字形式的下拉刷新  miniprogram 小程序样式的下拉刷新
        systemInfo: app.globalData.systemInfo,//设备信息
        tabbarHeight: app.globalData.tabbarHeight,
        navHeight: app.globalData.navHeight,
        pxRatio: app.globalData.px,
        loadMoreStatus: 'pull',
        loadmoreProp:{
            scrollTop:-1,
            isfreeze: false,//是否冻结
            isComplete: false,
        },
        scrollTop:0,//设置滚动条的位置
        text:{
            pull: '下拉刷新',//pull 时加载提示区域的文字
            loading: '刷新中',//loading 时加载提示区域的文字
            drop: '松开刷新', //drop 时加载提示区域的文字
            loosen: '下拉刷新'//pull 和pull 一致
        },
    },
    onShow(){
        this.getScrollTop();
    },
    setLoadMoreStatus(status){
        if(status != this.data.loadMoreStatus){
            this.setData({
                loadMoreStatus: status
            })
            if(status == 'loosen'){
                this.setData({
                    isfreeze: true,
                })
                this.requesetComplete();
            }
        }
    },
    //获取滚动条位置
    getScrollTop(){
        this.createSelectorQuery().select('#scrollView').fields({
            scrollOffset: true
        }, ({scrollTop}) =>{
                if(scrollTop != this.data.loadmoreProp.scrollTop)
                this.setData({
                    'loadmoreProp.scrollTop': scrollTop
                })
        }).exec()
    },
    //防止刷新期间不断的下拉
    loadTop(){
        this.setData({
            'loadmoreProp.isComplete': false,
            'loadmoreProp.isfreeze': true,
        })
        //这里可以写 需要刷新的接口了
        //refresh

        //超时处理
        time = setTimeout(()=>{
            this.requesetComplete();
        },5000)
    },
    //请求完成之后要等待0.2秒的动画过渡时间
    requesetComplete(){
        this.setData({
            'loadmoreProp.isComplete': true
        },()=>{
            setTimeout(()=>{
                this.getScrollTop();
                this.setData({
                    'loadmoreProp.isfreeze': false
                })
            },200)
        })
    }
})
