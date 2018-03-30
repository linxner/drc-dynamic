$(function(){
    window.onscroll = function () {
        var Top = $(window).scrollTop();
        if (Top > 76) {
            $(".header-search").hide().stop();
        } else if (Top < 76) {
            $(".header-search").show();
        }
    }
    $(".country").on("click", "li", (function () {
        $(this).addClass("first").siblings().removeClass("first");
    }))
    $(".uploadprj").on("click", function () {
        $(this).addClass("first").siblings().removeClass("first");
    })
    $(".prjtc").on("click", (function () {
        var j = $(this).index();
        $(this).addClass("first").siblings().removeClass("first");
        var url = ["/sys/dict/api/searchBusinessType", "/sys/dict/api/searchCountry"];
        $("li").remove(".001");
        $.ajax({
            url: "http://web.dev.rcitech.cn/web" + url[j],
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (data.code === 200) {
                    //去重
                    var itemName=[]
                    for (var i = 0; i < data.body.length; i++) {
                        var items=data.body[i].itemName;
                        if($.inArray(items,itemName)===-1){
                            itemName.push(items);
                        }
                    }
                    for(var j=0;j<itemName.length;j++){
                        var li = $("<li class='001'>" + itemName[j] + "</li>");
                        $(".country").append(li);
                    }
                }
            }
        })
    }))
    $("#current").trigger("click");
    $.ajax({
        url: "http://web.dev.rcitech.cn/web/due/dueProject/api/list",
        type: "POST",//getType.返回数据类型；
        success: function (data) {
            if (data.code === 200) {
                var pageNum = data.body.pageNum;
                for (j = 0; j < pageNum; j++) {//生成页码
                    var li = $("<li>" + (j + 1) + "</li>")
                    $(".page").append(li);
                }
                //全部项目个数
                var span = $("<span class='prjnum'>（" + (data.body.list.length-6) + "个）</span>")
                $(".title").append(span);
                for (var i = 0; i < data.body.list.length - 1; i++) {
                    var imgurl = data.body.list[i];
                    if (imgurl.logoAttachment) {
                        imgurl = imgurl.logoAttachment.webUrl;
                    } else {
                        imgurl = "images/projectlogo.png";
                    }
                    var chineseName = data.body.list[i].chineseName;
                    var bntype = data.body.list[i].businessType;
                    var c = data.body.list[i].createTime;
                    //年月日
                    var c = new Date(c);
                    cyear = c.getFullYear();
                    cmonth = c.getMonth();
                    cday = c.getDay();
                    cmonth > 9 ? cmonth = cmonth : cmonth = "0" + cmonth;
                    cday > 9 ? cday = cday : cday = "0" + cday;
                    createtime = cyear + "/" + cmonth + "/" + cday;
                    var u = data.body.list[i].updateTime;
                    var u = new Date(u);
                    uyear = u.getFullYear();
                    umonth = u.getMonth();
                    uday = u.getDay();
                    umonth > 9 ? umonth = umonth : umonth = "0" + umonth;
                    uday > 9 ? uday = uday : uday = "0" + uday;
                    updatatime = uyear + "/" + umonth + "/" + uday;
                    var country = data.body.list[i].country;
                    var like = data.body.list[i].like;
                    var lisbox = $("<div class='lisbox'><div class='leftline'><span></span></div><ul class='lis'>" +
                        "<li class='01'><img src=" + imgurl + ">" + chineseName + "</li>" +
                        "<li class='02'>" + createtime + "-" + updatatime + "</li>" +
                        "<li class='03'>" + country + "</li>" +
                        "<li class='04'>" + bntype + "</li>" +
                        "<li class='05'>" + like + "</li>" +
                        "</ul></div>");
                    $(".prjbox").append(lisbox);
                }
                $(".lisbox").on("mouseenter", function () {
                    $(this).addClass("enter").siblings().removeClass("enter");
                })
            }

        }
    })
})