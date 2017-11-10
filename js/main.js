$(function(){
    var i=0;
    var $imgH=$(".carousel img").css("height");
    var windowHeight=$(window).height();
    $(".right-banner-content").css("height",windowHeight);
    var $bg=$(".carouselBg");
    $(".carousel img[cid=0]").show();
    $(".carouselBg").css("height",$imgH);
    $(".carousel-li li").eq(i).click(function(){
        switch(i){
            case 0:$bg.css("background","#F44661");break;
            case 1:$bg.css("background","#0F1024");break;
            case 2:$bg.css("background","#55BE59");break;
        }
        if(i==2){
            $(".carousel img[cid="+i+"]").fadeOut();
            $(".carousel img[cid=0]").fadeIn();
            i=0;
        }
        else{
            $(".carousel img[cid="+i+"]").fadeOut();
            $(".carousel img[cid=3]").fadeOut();
            i++;
            $(".carousel img[cid="+i+"]").fadeIn();
        }
    });
    setInterval(function(){
        $(".carousel-li li").trigger("click");
    },3000);

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
    /*=================================浮动导航栏=============================================*/
    var $flowSearch=$(".hide-nav");
    var $flowNav=$(".floatled");
    var fruit=$("#fruit").offset().top;
    var fish=$("#fish").offset().top;
    var rice=$("#rice").offset().top;
    var tea=$("#tea").offset().top;
    var footer=$(".footer").offset().top;
    var $htmlBody=$("html,body");
    fruit-=40;
    fish-=40;
    rice-=40;
    tea-=40;
    var $ID1=$("#1");
    var $ID2=$("#2");
    var $ID3=$("#3");
    var $ID4=$("#4");
    var $ID5=$("#5");
    $(window).scroll(function(){
        var _top=$(window).scrollTop();
        if(_top>500&&_top<(footer-720)){
            $flowSearch.show();
            $flowNav.show();
            if(_top>500){
                $flowSearch.show();
                $flowNav.show();
            }
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
    }
    });
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
    /*============================================================================================*/
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
    /*============================================================================================*/
    var $height=$(".show-item").css("height");
    var $width=$(".show-item").css("width");
    $height=$height.replace(/px/,"");
    $height/=2;
    $(".show-content").css("height",$height+"px");
    $(".show-content").css("width",$width);
});