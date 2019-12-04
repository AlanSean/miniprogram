const app = getApp();
Component({
    properties: {
        title: {
            type: String,
            value: 'title'
        },
        type: {
            type: String,
            value: null//'search' 搜索  back 返回
        }
    },
    data: {
        navHeight: 115, //导航栏的适配高度 单位px  默认115
        grap: 0,
        statusBarHeight: 0,
        menuButtonHeight: 0
    },
    pageLifetimes: {
        show: function() {
            this.setData({
                navHeight: app.globalData.navHeight,
                grap: app.globalData.grap,
                statusBarHeight: app.globalData.statusBarHeight,
                menuButtonHeight: app.globalData.menuButtonHeight
            });
        }
    }
})
