//rem单位
changeRootFont();
function changeRootFont() {
    document.documentElement.style.fontSize=((window.innerWidth / 750) * 100) + 'px';
}
window.addEventListener('resize', changeRootFont, false);
$(function(){
    /*=============================================商品飞入购物车效果===============================*/
    $("#addCart").click(function(){
        var imgSrc=$(".big").attr("src"); 
        if($(".normal").length>0){
            var $rbCart=$(".rb-cart");
            var endLeft=$rbCart.offset().left;
            var endTop=$rbCart.offset().top;
        }
        var flyer=$("<img class='flyer-img' src="+imgSrc+">");
        flyer.fly({   
            start: {   
                left: event.pageX,//抛物体起点横坐标   
                top: event.pageY //抛物体起点纵坐标   
            },   
            end: {   
                left: endLeft,//抛物体终点横坐标   
                top: endTop, //抛物体终点纵坐标   
            },   
            onEnd: function() {   
                // $("#tip").show().animate({width: '200px'},300).fadeOut(500);////成功加入购物车动画效果   
                // this.destory(); //销毁抛物体   
                $(this).remove();
            }   
        });   
    })
     /*==================================产品界面放大镜效果=======================================*/
     $.fn.fangDa = function(){
        var that = $(this);
        $imgNormal=that.find(".normal"); //正常图片容器
        $Img=$imgNormal.find("img");
        $Drag=that.find(".huaKuai");             //滑块容器
        $show=that.find(".fangDa");              //放大图片容器
        $showImg=$show.find("img");
        num=$show.width()/$Drag.width();
        $imgNormal.mousemove(function(e){
            $Drag.css("display","block");  
            $show.css("display","block");
            var iX=e.pageX-$(this).offset().left-$Drag.width()/2;
            var iY=e.pageY-$(this).offset().top-$Drag.height()/2;
            var MaxX=$imgNormal.width()-$Drag.width();
            var MaxY=$imgNormal.height()-$Drag.height();
            iX = iX > 0 ? iX : 0;  
            iX = iX < MaxX ? iX : MaxX;  
            iY = iY > 0 ? iY : 0;  
            iY = iY < MaxY ? iY : MaxY;    
            $showImg.css("width",num*$imgNormal.width());
            $showImg.css("height",num*$imgNormal.height());
            $Drag.css({left:iX+"px",top:iY+"px"});            
            $showImg.css({marginLeft:-num*iX+'px',marginTop:-num*iY+'px'});  
        });
        $imgNormal.mouseout(function(){  
            $Drag.css("display","none");  
            $show.css("display","none");  
        });  
    };
    $("#fangdajing").fangDa();  
    /*=========================================购物车交互================================*/
    var $button1=$("button.title-button");
    var $button2=$("button.bottom-button");
    var $radioCheck=$("img.radio-check");
    var $radiosCheck=$("img.radios-check");
    function formatMoney(num){                       //以千进制格式化金额
        num = num.toString().replace(/\$|\,/g,'');  
        if(isNaN(num))  
            num = "0";  
        sign = (num == (num = Math.abs(num)));  
        num = Math.floor(num*100+0.50000000001);  
        cents = num%100;  
        num = Math.floor(num/100).toString();  
        if(cents<10)  
        cents = "0" + cents;  
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
        num = num.substring(0,num.length-(4*i+3))+','+  
        num.substring(num.length-(4*i+3));  
        return (((sign)?'':'-') + num + '.' + cents);  
    }
    function isAny(){
        var isAny=false;
        $radioCheck.each(function(){
            if("isselected"==$(this).attr("isselected")){
                isAny=true;
            }
        })
        if(isAny){
            $button1.css("background-color","#ff9900");
            $button1.css("border-color","#ff9900");
            $button2.css("background-color","#ff9900");
            $button2.removeAttr("disabled");
        }
        else{
            $button1.css("border-color","#AAAAAA");
            $button1.css("background-color","#AAAAAA");
            $button2.css("background-color","#AAAAAA");
            $button2.css("disabled","disabled");
        }
    }
    function checkIsAll(){
        var isAll=true;
        $radioCheck.each(function(){
            if("false"==$(this).attr("isselected")){
                isAll=false;
            }
        });
        if(isAll){
            $radiosCheck.attr("isselect","isselect");
            $radiosCheck.attr("src","images/cartSelected.png");
        }
        else{
            $radiosCheck.attr("isselect","false");
            $radiosCheck.attr("src","images/cartNotSelected.png");
        }
    }
    $radioCheck.click(function(){
        var $that=$(this);
        var isselected=$that.attr("isselected");
        if(isselected=="isselected"){
            $that.attr("isselected","false");
            $that.attr("src","images/cartNotSelected.png");
            $that.parents("tr.cart-item").css("background-color","#fff");
        }
        else{
            $that.attr("isselected","isselected");
            $that.attr("src","images/cartSelected.png");
            $that.parents("tr.cart-item").css("background-color","#FFF8E1");
        }
        isAny();
        cal();
        checkIsAll();
    })  
    $radiosCheck.click(function(){
        var isselect=$(this).attr("isselect");
        if(isselect=="isselect"){
            $(this).attr("isselect","false");
            $(this).attr("src","images/cartNotSelected.png");
            $radioCheck.each(function(){
                $(this).attr("isselected","false");
                $(this).attr("src","images/cartNotSelected.png");
                $(this).parents("tr.cart-item").css("background-color","#fff");
            })
        }
        else{
            $(this).attr("isselect","isselect");
            $(this).attr("src","images/cartSelected.png");
            $radioCheck.each(function(){
                $(this).attr("isselected","isselected");
                $(this).attr("src","images/cartSelected.png");
                $(this).parents("tr.cart-item").css("background-color","#FFF8E1");
            })
        }
        isAny();
        cal();
        checkIsAll();
    })
    function cal(){
        var sumPrice=0;
        var totalNumber=0;
        $("img.radio-check[isselected='isselected']").each(function(){
            var oid=$(this).attr("oid");
            var price=$(".nowPrice[oid="+oid+"]").text();
            var num=$("input.text[oid="+oid+"]").val();
            price=price.replace(/￥/g,"");
            price=price*num;
            sumPrice+=new Number(price);
            totalNumber+=new Number(num);
        });
        $("span.bottom-price,span.title-price").html("￥"+sumPrice);
        $("span.total").html(totalNumber);
    }
    $("a.increase").click(function(){
        var pid=$(this).attr("pid");
        var oid=$(".text[oid="+pid+"]").attr("oid");
        var num=$(".text[oid="+oid+"]").val();
        num++;
        $(".text[oid="+oid+"]").val(num);
        isAny();
        cal();
        checkIsAll();
        var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
        var num_=$("input.text[oid="+oid_+"]").val();
        var price_=$(".nowPrice[oid="+oid_+"]").text();
        price_=price_.replace(/￥/g,"");
        price_=price_*num_;
        var smallPrice=new Number(price_);
        smallPrice=formatMoney(smallPrice);
        $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
    });
    $("a.decrease").click(function(){
        var pid=$(this).attr("pid");
        var oid=$(".text[oid="+pid+"]").attr("oid");
        var num=$(".text[oid="+oid+"]").val();
        num--;
        $(".text[oid="+oid+"]").val(num);
        isAny();
        cal();
        checkIsAll();
        var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
        var num_=$("input.text[oid="+oid_+"]").val();
        var price_=$(".nowPrice[oid="+oid_+"]").text();
        price_=price_.replace(/￥/g,"");
        price_=price_*num_;
        var smallPrice=new Number(price_);
        smallPrice=formatMoney(smallPrice);
        $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
    });
    /*===========================================轮播图===================================*/
    (function(){
        var i=0;
        var timer=null;
        var $dataC=$(".data-carousel").find("li");
        var $carBg=$(".carouselBg");
        $dataC.eq(i).show();
        run();
        if(($(".data-carousel").length>0)&&($(window).width()>764)){
            var $imgH=$(".data-carousel img").css("height");
            var windowHeight=$(window).height();
            $(".right-banner-content").css("height",windowHeight);
            var $bg=$(".carouselBg");
            $imgH=$imgH.replace(/px/,"");
            $(".carouselBg").css("height",$(".dropMenu").css("height"));
        }
        $(".carousel-li").find("ul").find("li").each(function(index){
            $(this).click(function(){
                i=index;
                $dataC.eq(i).stop().fadeIn(1500).siblings().fadeOut();
            })
        })
        function run(){
            timer=setInterval(function(){
                i++;
                if(i>3){
                    i=0;
                }
                $dataC.eq(i).stop().fadeIn(1500).siblings().fadeOut();
            },3000);
        }
        $carBg.mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            run();
        });
    }());
    $(".user").mouseover(function(){
        $(".rbl-user").show();
    });
    $(".rbl-user").mouseover(function(){
        $(".rbl-user").show();
    })
    $(".rbl-user").mouseout(function(){
        $(".rbl-user").hide();
    });
    $(".user").mouseout(function(){
        $(".rbl-user").hide();
    });
    $(".rs-like").mouseover(function(){
        $(".rbl-love").show();
    });
   
    $(".rs-like").mouseout(function(){
        $(".rbl-love").hide();
    });
   
    $(".rs-money").mouseover(function(){
        $(".rbl-hurt").show();
    });
   
    $(".rs-money").mouseout(function(){
        $(".rbl-hurt").hide();
    });
    /*=================================浮动导航栏=============================================*/
    var $flowSearch=$(".hide-nav");
    var $flowNav=$(".floatled");
    if($("#fruit").length>0){
        var fruit=$("#fruit").offset().top;
        var fish=$("#fish").offset().top;
        var rice=$("#rice").offset().top;
        var tea=$("#tea").offset().top;
        var footer=$(".footer").offset().top;
        var left_=$("#fruit").offset().left-81;
    }
    var $htmlBody=$("html,body");
    var $publish=$(".publish");
    fruit-=40;
    fish-=40;
    rice-=40;
    tea-=40;
    var $ID1=$("#1");
    var $ID2=$("#2");
    var $ID3=$("#3");
    var $ID4=$("#4");
    var $ID5=$("#5");
    left_=left_+"px";
    $flowNav.css("left",left_);
    if($(window).width()>768){
        $(window).scroll(function(){
            var _top=$(window).scrollTop();
            if(_top>400&&_top<(tea)){
                $flowSearch.show();
                $flowNav.show();
                $publish.show();
               
                if(_top>(fruit-220)&&_top<(fish-220)){
                    $ID2.removeClass("active-blue");
                    $ID3.removeClass("active-green");
                    $ID4.removeClass("active-orange");
                    $ID1.addClass("active-red");
                }
                if(_top>(fish-220)&&_top<(rice-220)){
                    $ID1.removeClass("active-red");
                    $ID3.removeClass("active-green");
                    $ID4.removeClass("active-orange");
                    $ID2.addClass("active-blue");
                }
                if(_top>(rice-220)&&_top<(tea-220)){
                    $ID1.removeClass("active-red");
                    $ID2.removeClass("active-blue");
                    $ID4.removeClass("active-orange");
                    $ID3.addClass("active-green");
                }
                if(_top>(tea-220)&&_top<footer){
                    $ID1.removeClass("active-red");
                    $ID2.removeClass("active-blue");
                    $ID3.removeClass("active-green");
                    $ID4.addClass("active-orange");
                }
            }
        else{
            $flowSearch.hide();
            $flowNav.hide();
            $publish.hide();
        }
    });
    }

   
   
   
    $ID1.click(function(){
        $htmlBody.animate({scrollTop:fruit},500);
    });
    $ID2.click(function(){
        $htmlBody.animate({scrollTop:fish},500);
    });
    $ID3.click(function(){
        $htmlBody.animate({scrollTop:rice},500);
    });
    $ID4.click(function(){
        $htmlBody.animate({scrollTop:tea},500);
    });
    $("#6").click(function(){
        $htmlBody.animate({scrollTop:0},500);
    });
    /*========================================分类效果================================================*/
    var $item=$(".drop-item a");
    function showProduct(index){
        $(".product[cid="+index+"]").show();
    }
    function hideProduct(index){
        $(".product[cid="+index+"]").hide();
    }
    $item.mouseover(function(){
        var xid=$(this).attr("xid");
        showProduct(xid);
    });
    $item.mouseout(function(){
        var xid=$(this).attr("xid");
        hideProduct(xid);
    });
    if($(".sortAll").length>0){
        (function(){
            var height=$(".mobie-bottom").css("height");
            height=height.replace(/px/,"");
            var height2=(Number($(".header").css("height").replace(/px/,""))+Number($(".sortAll").css("height").replace(/px/,"")));
            var $viewHeight=($(window).height()-height-height2);
            var $itemHeight=$viewHeight/($(".drop-item").length);
            // var $productHeight=$viewHeight/($(".row").length);
            var $productHeight=$viewHeight/8;
            $(".drop-item").css({
                "height":
                $itemHeight+"px",
                "line-height":
                $itemHeight+"px"
            });
            $(".row").css("height",$productHeight);
            
            $(".sortProduct[xid=1]").show().siblings().hide();
            
            $(".drop-item").click(function(){
                var xid=$(this).attr("xid");     
                 $(".sortProduct[xid="+xid+"]").show().siblings().hide();     
            })
        }())
    }
    /*============================================================================================*/
    if($(".show-item").length>0){
        if($(window).width()>768){
            var $height=$(".show-item").css("height");
            var $width=$(".show-item").css("width");
            $height=$height.replace(/px/,"");
            $height/=2;
            $(".show-content").css("height",$height+"px");
            $(".show-content").css("width",$width);
        }
       
    }
    /*====================================缩略图效果=====================================*/
    var $imgSmall=$("img.small");
    $imgSmall.mouseenter(function(){
        var bigUrl=$(this).attr("bigUrl");
        $("img.big").attr("src",bigUrl);
    });
    $("img.big").load(function(){
        $imgSmall.each(function(){
            var url=$(this).attr("bigUrl");
            img =new Image();
            img.src=url;
            img.onload=function(){
                $("div.img4load").append($(img));
            }
        })
    });
    $(".cuxiao").children().click(function(){
        window.location.href="促销.html";
    });
    /*======================================登陆注册=============================================*/
    $("#toEmail").click(function(){
        $(".register-email").animate({left:"0"},200);
        $(".register-phone").animate({left:"400px"},10);
    });
    $("#toPhone").click(function(){
        $(".register-phone").animate({left:"0"},200);
        $(".register-email").animate({left:"-400px"},10);
    })
    /*=====================================图片懒加载==================================================*/
    $(window).scroll(function(){
        var $wTop=$(window).scrollTop();
        var $wHeight=$(window).height();
        if($(".content").length>0){
            if($(".content").find("img").offset().top-$wTop<$wHeight){
                $(".content").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($(".cuxiao").offset().top-$wTop<$wHeight){
                $(".cuxiao-main").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if(fruit-$wTop<$wHeight){
                $(".show-content").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
        }
        if($("#row1").length>0){
           
            if($("#row1").offset().top-$wTop<$wHeight){
                $("#row1").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($("#row2").offset().top-$wTop<$wHeight){
                $("#row2").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($("#row3").offset().top-$wTop<$wHeight){
                $("#row3").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($("#row4").offset().top-$wTop<$wHeight){
                $("#row4").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($("#row5").offset().top-$wTop<$wHeight){
                $("#row5").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
            if($("#row6").offset().top-$wTop<$wHeight){
                $("#row6").find(".market-each").find("img").each(function(){
                    $(this).attr("src",$(this).attr("data-src"));
                })
            }
        }
        
    })
    /*====================================移动端适配================================*/
    //全部分类页面
    if($(window).width()<=768){
          //购物车页面
        $(".cart-item").find("td").each(function(){
            if($(this).find("a").text()=="删除"){
                if($(this).attr("class")!="mobie-item"){
                    $(this).hide();
                }     
            }
        });
        var $wHeight=$(window).height();
        var $wWidth=$(window).width();
       
        
        var dcH=$(document).height();  
        var dcH2;
        var dcH3;
        var dcH4;
        /*=====================上拉加载=================*/
        $(window).scroll(function(){
            if($(window).scrollTop() + $(window).height() >=dcH-100){
                setTimeout(function(){
                        $("#row3").show();  
                        dcH2=$(document).height();
                        
                },1000);
            }
            if($(window).scrollTop() + $(window).height() >=dcH2-50){
                setTimeout(function(){
                        $("#row4").show();  
                        dcH3=$(document).height();  
                       
                },1000);
            }
            if($(window).scrollTop() + $(window).height() >=dcH3-50){
                setTimeout(function(){
                        $("#row5").show();  
                        dcH4=$(document).height();  
                       
                },1000);
            }
            if($(window).scrollTop() + $(window).height() >=dcH4-100){
                setTimeout(function(){
                        $("#row6").show();  
                        $(".mobie-slide").text("我也是有底线的");
                        $("#spF").show();
                },1000);
            }
        })
    }
});

