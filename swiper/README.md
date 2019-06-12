# 原生js实现轮播图

## 前言
插件功能暂只满足我司业务需求，如果希望有更多的功能，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star 😆

> [仓库地址](https://github.com/Guidozijef/plugin/tree/master/swiper)

> [在线预览](https://Guidozijef.github.io/plugin/swiper/index.html)

## 准备
1. 引入swiper.js文件和swiper.css文件
2. 指定一个容器的id，如果有多个轮播图，最外层容器不一样就行了，举个栗子🌰：

  ```html
    <div class="swiper-container">
    <div class="swiper-wrapper" id="swiper-wrapper">
      <div class="swiper-slide"><img src="./images//nemo.jpg" alt=""></div>
      <div class="swiper-slide"><img src="./images//toystory.jpg" alt=""></div>
      <div class="swiper-slide"><img src="./images//up.jpg" alt=""></div>
      <div class="swiper-slide"><img src="./images//walle.jpg" alt=""></div>
    </div>
    <div class="swiper-button">
      <div class="swiper-button-prev"><</div>
      <div class="swiper-button-next">></div>
    </div>
    <div class="swiper-pagination">
      <span class="active"></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  ```
  > 目前支持三个参数，第一个是最外层容器必填，第二个是个对象，里面目前有两个可配置项，轮播间隔时间和轮播完的回调函数

  ```javaScript
    new Swiper(".swiper-container", {
      time: 5000,
      callback: function (self, index) {
        // console.log(self,index);
      }
    });
  ```
  > imgWrap键的值就是容器的id

3. 如果觉得样式不满意什么的，可以直接css覆盖就可以了。


## 总结
如有疏忽或错误，希望您及时指出可Issues，我会尽早修改😆。有什么需要交流的可在评论区与我交流
