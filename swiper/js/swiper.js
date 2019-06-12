(function (window) {
  var util = {
    indexOf: function (array, item) {
      var result = -1;
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) {
          result = i;
          break;
        }
      }
      return result;
    },
    addClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      if (util.indexOf(classNames, className) == -1) {
        classNames.push(className);
      }
      element.className ? element.className = classNames.join(' ') : element.className = classNames.join('');
    },
    // 移除class
    removeClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      var index = util.indexOf(classNames, className);
      if (index !== -1) {
        classNames.splice(index, 1);
      }
      element.className ? element.className = classNames.join(' ') : element.className = classNames.join('');
    },
  }

  function Swiper(element, options) {
    if (!element) return alert("请传入最外层容器选择器");
    this.options = options || {}; //接受配置
    this.autoTime = this.options.time || 5000; // 播放间隔时间
    this.callback = this.options.callback || function () { };  //回调函数
    this.container = document.querySelector(element);
    this.WIDTH = this.container.offsetWidth; // 容器宽度(一张图片宽度)
    this.swiperWapper = this.container.children[0];
    this.swiperSilder = this.swiperWapper.getElementsByClassName("swiper-slide");
    this.buttonNext = this.container.querySelector(".swiper-button-next");
    this.buttonPrev = this.container.querySelector(".swiper-button-prev");
    this.pagination = this.container.querySelectorAll(".swiper-pagination span");
    this.Init();
  }

  Swiper.prototype = {
    Init: function () {
      // 克隆第一张图片放到最后面，实现无缝衔接
      var cloneImgFirst = this.swiperSilder[0].cloneNode(true);
      this.swiperWapper.appendChild(cloneImgFirst);
      // 克隆最后一张放在最前面
      var cloneImgLast = this.swiperSilder[this.swiperSilder.length - 1].cloneNode(true);
      this.swiperWapper.insertBefore(cloneImgLast, this.swiperSilder[0]);
      // 重新设置容器的宽度，多了一张图片了，不过swiperSilder.length会自动变更
      this.swiperWapper.style.width = (this.swiperSilder.length) * this.WIDTH + "px";
      this.swiperWapper.style.left = -this.WIDTH + "px";
      // 设置定时器，实现自动轮播
      var _this = this;
      clearInterval(this.timer);
      this.timer = setInterval(_this.autoPlay.bind(_this), _this.autoTime);
      //鼠标移入，清除定时器，注意其中的this已经变了
      this.container.onmouseenter = function () {
        clearInterval(_this.timer);
        _this.buttonNext.style.transform = "translateX(0px)";
        _this.buttonNext.style.opacity = 1;
        _this.buttonPrev.style.transform = "translateX(0px)";
        _this.buttonPrev.style.opacity = 1;
      }
      // 鼠标移出重新设置定时器，注意其中的this已经变了
      this.container.onmouseleave = function () {
        // 利用改变定时器中的this，因为不是立马执行，所以此处用的bind而不用call
        _this.timer = setInterval(_this.autoPlay.bind(_this), _this.autoTime);
        _this.buttonNext.style.transform = "translateX(50px)";
        _this.buttonNext.style.opacity = 0;
        _this.buttonPrev.style.transform = "translateX(-50px)";
        _this.buttonPrev.style.opacity = 0;
      }
      // 利用改变点击事件中的this，因为不是立马执行，所以此处用的bind而不用call
      this.buttonNext.onclick = this.Next.bind(this);
      this.buttonPrev.onclick = this.Prev.bind(this);
      for (let i = 0; i < [].slice.call(this.pagination).length; i++) {
        let element = [].slice.call(this.pagination)[i];
        element.onclick = function () {
          _this.swiperWapper.style.transition = "all 0.5s ease-in";
          _this.swiperWapper.style.left = -(_this.WIDTH * (i + 1)) + "px";
          for (let j = 0; j < [].slice.call(_this.pagination).length; j++) {
            let ele = [].slice.call(_this.pagination)[j];
            if(ele != this){
              util.removeClass(ele, "active");
              util.addClass(this, "active");
            }
          }
        }
      }
    },
    autoPlay: function () {
      this.Next();
    },
    Next: function () {
      // 获取容器的left值
      var wapperLeft = this.swiperWapper.offsetLeft;
      // 如果到最后一张图片就马上跳到第一张
      if (wapperLeft <= -this.WIDTH * (this.swiperSilder.length - 1)) {
        this.swiperWapper.style.transition = "none";
        this.swiperWapper.style.left = -this.WIDTH + "px";
        // 重新获取容器left值
        wapperLeft = this.swiperWapper.offsetLeft;
      }
      this.swiperWapper.style.transition = "all 0.5s ease-in";
      this.swiperWapper.style.left = wapperLeft - this.WIDTH + "px";
      // 如果为第一张就把索引变为1
      if (Math.abs(wapperLeft) / this.WIDTH == this.swiperSilder.length - 2) {
        var index = 1;
      } else {
        index = Math.abs(wapperLeft) / this.WIDTH + 1;
      }
      this.callback(this.swiperSilder[index], index);
      for (let i = 0; i < [].slice.call(this.pagination).length; i++) {
        let element = [].slice.call(this.pagination)[i];
        index == i + 1 ? util.addClass(element, "active") : util.removeClass(element, "active");
      }
    },
    Prev: function () {
      // 获取容器的left值
      var wapperLeft = this.swiperWapper.offsetLeft;
      // 如果到最后一张图片就马上跳到第一张
      if (wapperLeft >= 0) {
        this.swiperWapper.style.transition = "none";
        this.swiperWapper.style.left = -this.WIDTH * (this.swiperSilder.length - 2) + "px";
        // 重新获取容器left值
        wapperLeft = this.swiperWapper.offsetLeft;
      }
      this.swiperWapper.style.transition = "all 0.5s ease-in";
      this.swiperWapper.style.left = wapperLeft + this.WIDTH + "px";
      // 如果为第一张就把索引变为1
      if (Math.abs(wapperLeft) / this.WIDTH == 1) {
        var index = 4;
      } else {
        index = Math.abs(wapperLeft) / this.WIDTH - 1;
      }
      this.callback(this.swiperSilder[index], index);
      for (let i = 0; i < [].slice.call(this.pagination).length; i++) {
        let element = [].slice.call(this.pagination)[i];
        index == i + 1 ? util.addClass(element, "active") : util.removeClass(element, "active");
      }
    }
  }

  window.Swiper = Swiper;
})(window)