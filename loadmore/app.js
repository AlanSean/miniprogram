App({
    onShow() {
        wx.getSystemInfo({
            success: res => {
                // 单位rpx
                this.globalData.systemInfo = res;
                this.globalData.statusBarHeight = res.statusBarHeight;
                this.globalData.windowWidth = res.windowWidth * 2;
                this.globalData.px = Math.round(res.windowWidth / 750 * 10000 / 10) / 1000;
                this.globalData.tabbarHeight = res.screenHeight -res.windowHeight;
            }
        });
        const {
            navHeight,
            grap,
            statusBarHeight,
            menuButtonHeight
        } = this.getNavHeight();

        this.globalData.navHeight = navHeight;
        //胶囊上下边距
        this.globalData.grap = grap;
        //状态栏高度
        this.globalData.statusBarHeight = statusBarHeight;
        //胶囊高度
        this.globalData.menuButtonHeight = menuButtonHeight;
    },
    //获取胶囊的位置
    getNavHeight() {
        let {
            statusBarHeight,
            platform,
            screenHeight,
            windowWidth,
            windowHeight,
            system
        } = wx.getSystemInfoSync(), rect;
        //获取胶囊位置的 兼容处理 来自掘金 https://juejin.im/post/5d557e2e5188255af1619716
        try {
            rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
            if (rect === null) {
                throw 'getMenuButtonBoundingClientRect error';
            }
            //取值为0的情况
            if (!rect.top) {
                throw 'getMenuButtonBoundingClientRect error';
            }
            //取值为0的情况
            if (!rect.width) {
                throw 'getMenuButtonBoundingClientRect error';
            }
        } catch (error) {
            let gap = 0; //胶囊按钮上下间距 使导航内容居中
            let width = 96; //胶囊的宽度，android大部分96，ios为88
            if (platform === 'android') {
                gap = 8;
                width = 96;
            } else if (platform === 'devtools') {
                if (system.toLocaleLowerCase().indexOf('ios') > -1) {
                    gap = 5.5; //开发工具中ios手机
                } else {
                    gap = 7.5; //开发工具中android和其他手机
                }
            } else {
                gap = 4;
                width = 88;
            }
            if (!statusBarHeight) {
                //开启wifi的情况下修复statusBarHeight值获取不到
                statusBarHeight = screenHeight - windowHeight - 20;
            }

            rect = {
                //获取不到胶囊信息就自定义重置一个
                bottom: statusBarHeight + gap + 32,
                height: 32,
                left: windowWidth - width - 10,
                right: windowWidth - 10,
                top: statusBarHeight + gap,
                width: width
            };
        }
        const {
            top,
            height
        } = rect;
        //胶囊的top值减去状态栏高度 = 状态栏和胶囊的间隔
        //胶囊上下边距+自身高度+状态栏高度 = 导航栏高度
        return {
            //导航栏高度
            navHeight: (top - statusBarHeight) * 2 + statusBarHeight + height,
            //胶囊上下边距
            grap: top - statusBarHeight,
            //状态栏高度
            statusBarHeight: statusBarHeight,
            //胶囊高度
            menuButtonHeight: height
        }
    },
    globalData: {
        systemInfo:{},//设备信息
        tabbarHeight:0,//tabbar高度
        statusBarHeight: 30, //手机状态条的高度
        px: 0,
        windowWidth: '',
        navHeight: 115, //导航栏的适配高度 单位px  默认115
        grap: 0,//胶囊上下边距
        statusBarHeight: 0,//状态栏高度
        MenuButtonHeight: 0//胶囊高度
    }
});
