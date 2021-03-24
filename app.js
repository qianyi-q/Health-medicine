import { log, promiseHandle } from 'utils/uutil';

let _globalData = {
  userInfo: null,
  toname: '',
  wishes: '',
  // in case
  // 在更多页面中选则某条祝福话后，直接覆盖上面的wishes字段,而用户却在自定义页面选择了取消或返回
  tempwishes: '',
  temptoname: '',
  tempnickname: ''
}

App({
  onLaunch: function () {
    wx.cloud.init({
      env:"qianyi-vhyge"
    })
  },

  /**
   * 读取与修改运行时全局变量的方法
   */
  getUserInfo: function (cb) {
    var that = this
    if (_globalData.userInfo) {
      typeof cb == "function" && cb(_globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              _globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(_globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setUserInfo: function (userInfo) {
    var that = this;
    if (_globalData.userInfo) {
      _globalData.userInfo = userInfo;
      return;
    }
    that.getUserInfo();
  },
  getTempNickName: function () {
    return _globalData.tempnickname
  },
  setTempNickName: function (nickname) {
    _globalData.tempnickname = nickname;
  },
  clearTempNickName: function () {
    _globalData.tempnickname = '';
  },
  getToName: function (isTemp) {
    if (isTemp) {
      return _globalData.temptoname
    } else {
      return _globalData.toname;
    }

  },
  setToName: function (toname, isTemp) {
    if (isTemp) {
      _globalData.temptoname = toname;
    } else {
      _globalData.toname = toname;
    }
  },
  clearTempToName: function () {
    _globalData.temptoname = '';
  },
  setWishes: function (content, isTemp) {
    if (isTemp) {
      _globalData.tempwishes = content;
    } else {
      _globalData.wishes = content;
    }
  },
  getWishes: function (isTemp) {
    if (isTemp) {
      return _globalData.tempwishes;
    }
    return _globalData.wishes;
  },
  clearWishes: function (isTemp) {
    if (isTemp) {
      _globalData.tempwishes = '';
    } else {
      _globalData.wishes = '';
    }

  },


  getUserInfo(cb) {
    if (typeof cb !== "function") return;
    let that = this;
    if (that.globalData.userInfo) {
      cb(that.globalData.userInfo);
    } else {
      promiseHandle(wx.login).then(() => promiseHandle(wx.getUserInfo)).then(res => {
        that.globalData.userInfo = res.userInfo;
        cb(that.globalData.userInfo);
      }).catch(err => {
        log(err);
      });
    }
  },

  globalData: {
    userInfo: null
  },

  //自定义配置
  settings: {
    debug: true, //是否调试模式
    moreLink: 'http://github.com/oopsguy'
  }

});  


