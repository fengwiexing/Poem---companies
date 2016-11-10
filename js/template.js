$(function () {
    ; (function () {
        //顶导航
        var exteriorUL = $(".exterior-ul>li"), showHideUL = $("li.showUL .inner-ul"), LIindex = null;

        exteriorUL.hover(function () {
            var self = $(this);
            if (self.hasClass("current")) {
                LIindex = self.index();
            };
            if (self.hasClass("showUL")) {
                self.find(".inner-ul").stop().slideDown(100);
            }
            self.addClass("current");

        }, function () {
            $(this).removeClass("current");
            showHideUL.stop().slideUp(100);
            LIindex == null ? LIindex = null : exteriorUL.eq(LIindex).addClass("current");
        });
        exteriorUL.click(function () {
            var self = $(this);
            self.siblings().removeClass("current");
            self.addClass('current');
            LIindex = self.index();
        });


        //轮播图片
        var carouselBox = $("#carousel-img"),   //轮播容器
            carouseimg = $("#carousel li"),    //轮播图片容器
            carouselBtn = $(".carouselBtn li"),//轮播按钮
            carouseLength = carouseimg.length, //轮播大小
            lastImgIndex = carouseLength - 1,  //从最后一张轮播索引
            changeIndex = carouseLength - 1,   //递减索引
            widowW = carouseimg.width(),       //屏幕宽度
             setIn = null;                     //定时器

        setIn = setInterval(setAutoCarouse, 3000);//自动轮播

        carouselBox.hover(function () {
            clearInterval(setIn);//停止轮播
        }, function () {
            setIn = setInterval(setAutoCarouse, 3000);//自动轮播
        });

        //控制轮播
        function setAutoCarouse() {
            carouseFn(changeIndex);//轮播图片
            //设置下一轮播索引
            changeIndex = --changeIndex < 0 ? lastImgIndex : changeIndex;
            currentCarouselBtn(changeIndex) //高亮显示当前按钮
        }
        //轮播函数
        function carouseFn(changeIndex) {
            carouseimg.eq(changeIndex).animate({ "left": -widowW + "px" }, 300, function () {
                var kk = changeIndex - 1,
                    kk2 = changeIndex - 2;

                kk = kk < 0 ? lastImgIndex : kk;
                carouseimg.eq(kk).css("z-index", 10)//为了兼容IE设置高点，如果是现代浏览器设置为2就可以了

                kk2 = kk2 < 0 ? lastImgIndex : kk2;
                carouseimg.eq(kk2).css("z-index", 9)//为了兼容IE设置高点，如果是现代浏览器设置为1就可以了

                $(this).css({ "left": 0, "z-index": 0 });
            })
        };

        //点击轮播按钮
        carouselBtn.click(function () {
            var self = $(this),
               index = self.index(),//当前点击索引
           imgZIndex = 0,           //当前显示轮播图的层级
                imgI = 0;           //当前显示轮播图的索引
            carouseimg.each(function (i, value) {
                var zI = parseInt("0" + $(this).css("z-index"));

                if (zI >= imgZIndex) {
                    imgZIndex = zI;
                    imgI = i;
                }
            });
            //如果当前点击按钮索引和当前显示轮播图片的索引不相等
       
            if (imgI != index) {
                carouseimg.eq(imgI).siblings().css("z-index", 0);//设置当前轮播图片的兄弟元素的层级
                carouseimg.eq(index).css("z-index", 9);         //设置当前点击按钮对应的轮播图片的层级

                //移动当前的轮播图片
                carouseimg.eq(imgI).animate({ "left": -widowW + "px" }, 300, function () {

                    $(this).css({ "left": 0, "z-index": 0 });
                    carouseimg.eq(index).css("z-index", 10); //设置当前点击按钮对应的轮播图片的层级/为了兼容IE设置高点，如果是现代浏览器设置为2就可以了
                    var aa = index - 1 < 0 ? lastImgIndex : index - 1;
                    carouseimg.eq(aa).css("z-index", 9);//为了兼容IE设置高点，如果是现代浏览器设置为1就可以了


                });
                changeIndex = index; //设置当前轮播图片索引
            }
            currentCarouselBtn(index);//高亮显示当前按钮
        })
        //高亮显示当前按钮
        function currentCarouselBtn(index) {
            carouselBtn.eq(index).siblings().removeClass("currentLi")
            carouselBtn.eq(index).addClass("currentLi")
        }
    }());
})