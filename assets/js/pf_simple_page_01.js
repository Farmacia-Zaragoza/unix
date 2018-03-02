$(document).ready(function(){
    /* Menus Start */


    //initVertical();
    $('.slideRightContainer').css("display", "block");
    initHorizontal();
    $('.slideRightContainer').css("display", "none");
    
    /* Horizontaol Menu Start*/
    var scrollSpeed = 5;

    //Random Id Generator
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
    //Assigning random Id For Every Horizontal Menu and resizing the menuContainer
    function initHorizontal(){
        $(".horizontalMenu").each(function(){
            let id = makeid();
            $(this).attr("id", id);
            let mainWidth = $(this).width();
            let arrowWidth = $(this).children('i').outerWidth(true);
            let calculatedWidth = mainWidth - (arrowWidth*2);
            $(this).children('.menuContainer').css('width', calculatedWidth);
        });
    }
    
    //mouseenter on arrow Horizontal Menu
     $(".horizontalMenu > i").on("mouseenter", function() {

         var topParentId = $(this).parent('.horizontalMenu')[0].id;
         var leftArrow = $(this).hasClass('pull-left');
         var rightArrow = $(this).hasClass('pull-right');

         var remLength = $("#"+ topParentId +" >.menuContainer>.innerContainer")[0].scrollWidth - $("#"+ topParentId +" >.menuContainer>.innerContainer").width();
         var scrollableLength = remLength - $("#"+ topParentId +" >.menuContainer>.innerContainer").scrollLeft();

         if(rightArrow){
             $("#"+ topParentId +">.menuContainer>.innerContainer").animate({
                scrollLeft: remLength
             }, scrollSpeed * scrollableLength, hArrowVisibilityCheck(topParentId));
         }else if(leftArrow){
            $("#"+ topParentId +">.menuContainer>.innerContainer").animate({
                 scrollLeft: 0
             }, scrollSpeed * $("#"+ topParentId +" >.menuContainer>.innerContainer").scrollLeft(), hArrowVisibilityCheck(topParentId));
         }
     });

     //Mouse Leave from Arrow Horizontal Menu
     $(".horizontalMenu > i").on("mouseleave", function() {
        var topParentId = $(this).parent('.horizontalMenu')[0].id;
        $("#"+ topParentId +" >.menuContainer>.innerContainer").stop();
        hArrowVisibilityCheck(topParentId);
     });

     function hArrowVisibilityCheck(parentId){
        var remLength = $("#"+ parentId +" >.menuContainer>.innerContainer")[0].scrollWidth - $("#"+ parentId +" >.menuContainer>.innerContainer").width();
        var scrollableLength = remLength - $("#"+ parentId +" >.menuContainer>.innerContainer").scrollLeft();
        
        
        if(scrollableLength <= 3){
            $("#"+ parentId +" > i.pull-right").css('visibility', 'hidden');
        }else{
            $("#"+ parentId +" > i.pull-right").css('visibility', 'visible');
        }

        if( $("#"+ parentId +" >.menuContainer>.innerContainer").scrollLeft() >= 1 ){
            $("#"+ parentId +" > i.pull-left").css('visibility', 'visible');
        }else{
            $("#"+ parentId +" > i.pull-left").css('visibility', 'hidden');
        }
     }
     /* Horizontaol Menu End*/


// here start jquery code for tool box font size (increase and decrease)
// ======================================================================
var pf_simple_page = $("body").hasClass("pf_simple_page");
$(function () {
    $(".font-button").bind("click", function () {
        $(".tab-pane").addClass("content");
        var size = parseInt($('.content p').css("font-size"));
        if ($(this).hasClass("plus-arrow")) {
            size = size + 2;
            if(size >= 30){
                size = 30;
            }
        } else {
            size = size - 2;
            if (size <= 10) {
                size = 15;
            }
        }

        if (pf_simple_page) {
            $('.content p').animate({'font-size': size});
        }
    });
});


//here start juery for paragraph space change
//============================================
$(".paragraph-space").removeClass().addClass("paragraph-space option-no-"+$('#paragraphSpaceOPtion').find('option:selected').val());
$("#paragraphSpaceOPtion").on("change",function(){
  var val=$(this).find('option:selected').val();
  $(".paragraph-space").removeClass().addClass("paragraph-space option-no-"+val);
});


//here start js code for even color picker
//============================================
$(".tab-pane").addClass("content-color");
$("#colorWell").change(function(){
    var evenColor = $(this).val();
    //console.log("color value : "+evenColor);
    $(".content-color p:nth-child(even)").css("color",evenColor);
});
//here start js code for odd color picker
//============================================
$("#colorWell2").change(function(){
    var oddColor = $(this).val();
    //console.log("color value : "+evenColor);
    $(".content-color p:nth-child(odd)").css("color",oddColor);
});


// paragraph scroll js code start here
// =====================================

// $(".scroll-inner-container").css("background-color","yellow");

    function verticalSlideUp(){
        $(".scroll-inner-container").each(function(){
            let id = makeid();
            var div = $(this);
            $(this).attr("id",id);
            var remHeight = div[0].scrollHeight - $(this).height();
            var scrollableHeight = remHeight - div.scrollTop();
            console.log("remaining height : "+remHeight);
            var pos = div.scrollTop();
            console.log("pos : "+ pos);
            div.animate({
                scrollTop:remHeight
            },5*scrollableHeight);
            
            
        });
    };
 
    function verticalSlideDown(){
        $(".scroll-inner-container").each(function(){
            let id = makeid();
            var div = $(this);
            $(this).attr("id",id);
            var remHeight = div[0].scrollHeight - $(this).height();
            var scrollableHeight = remHeight - div.scrollTop();
            console.log("remaining height : "+remHeight);
            var pos = div.scrollTop();
            console.log("pos : "+ pos);
            div.animate({
                scrollTop:0
            },5*div.scrollTop());
            
            
        });
    };

// keyboard enable function
// =====================================
function keyboardActive(){

    $(".keyboard-enable").mouseenter(function(){

        $("body").addClass("keyboardEnable");
        $("span img.keyboard-enable").attr("src","img/box/brqx_2017_keyboard_enabled_green_100.png");
        $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_red_100.png");
        $(".scroll-outer-container").append('<div class="overlayTop"></div><div class="overlayBottom"></div>');
        $(".overlayBottom").mouseenter(function(){
            console.log("mouse in this boutton");
            verticalSlideUp();
        });
        $(".overlayTop").mouseenter(function(){
            console.log("mouse in this boutton");
            verticalSlideDown();
        });

        $(".overlayBottom").on("mouseleave", function(){
            var div = $('.scroll-inner-container');
            div.stop();
        });

        $(".overlayTop").on("mouseleave", function(){
            var div = $('.scroll-inner-container');
            div.stop();
        });
    });

};

// keyboard disable function start here
// ====================================
function keyboardDisable(){
    $(".keyboard-enable").click(function(){
        $("body").removeClass("keyboardEnable");
        $("body").addClass("keyboardDisable");
        $("span img.keyboard-enable").attr("src","img/box/brqx_2017_keyboard_enabled_red_100.png");
        $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_green_100.png");
    });
}

// finction have been call here for keyboard activaton
// ====================================================
keyboardActive();
keyboardDisable()















// js code for diffarent menu color:
//====================================
var colors = ['blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan']

$("ul.innerContainer li a").each(function(index, item){
    $(item).css('color',colors[index]);
});



// $("ul.innerContainer li a").each(function(index , item){
//     $(item).mouseenter(function(){
//         $(item).css({
//             'background-color':colors[index],
//             'color':'black',
//         });
//     });
// });

// $("ul.innerContainer li a").each(function(index , item){
//     $(item).mouseleave(function(){
//         $(item).css({
//             'background-color':'#F5E2F2',
//             'color':colors[index],
//         });
//     });
// });



$(".menu1").mouseenter(function(index){
    $(this).css("background-color","blue");
    $(this).css("color","black");
});

$(".menu2").mouseenter(function(index){
    $(this).css("background-color","blueviolet");
    $(this).css("color","black");
});


$(".menu3").mouseenter(function(index){
    $(this).css("background-color","brown");
    $(this).css("color","black");
});

$(".menu4").mouseenter(function(index){
    $(this).css("background-color","burlywood");
    $(this).css("color","black");
});

$(".menu5").mouseenter(function(index){
    $(this).css("background-color","cadetblue");
    $(this).css("color","black");
});

$(".menu6").mouseenter(function(index){
    $(this).css("background-color","chartreuse");
    $(this).css("color","black");
});

$(".menu7").mouseenter(function(index){
    $(this).css("background-color","chocolate");
    $(this).css("color","black");
});

$(".menu8").mouseenter(function(index){
    $(this).css("background-color","coral");
    $(this).css("color","black");
});

$(".menu9").mouseenter(function(index){
    $(this).css("background-color","cornflowerblue");
    $(this).css("color","black");
});

$(".menu10").mouseenter(function(index){
    $(this).css("background-color","cornsilk");
    $(this).css("color","black");
});

$(".menu11").mouseenter(function(index){
    $(this).css("background-color","crimson");
    $(this).css("color","black");
});

$(".menu12").mouseenter(function(index){
    $(this).css("background-color","cyan");
    $(this).css("color","black");
});





$(".menu1").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[0]);
});
$(".menu2").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[1]);
});
$(".menu3").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[2]);
});
$(".menu4").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[3]);
});
$(".menu5").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[4]);
});
$(".menu6").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[5]);
});
$(".menu7").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[6]);
});
$(".menu8").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[7]);
});
$(".menu9").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[8]);
});
$(".menu10").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[9]);
});
$(".menu11").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[10]);
});
$(".menu12").mouseenter(function(index){
    $(".pf_tab_container").css("background-color",colors[11]);
});


// $("ul.innerContainer li a").mouseleave(function(index){
//     $(".pf_tab_container").css("background-color","#D0DEEE");
// });

// function setBgColor(){
//     var colorId;
//     $("ul.innerContainer li").each(function(){
//         colorId = makeid();
//         $(this).attr("id",colorId);
//         $("#"+colorId).css('background-color','blue');
//     });
    
// }

// setBgColor();
// var colorName = $('ul.innerContainer li a');
// var pf_simple_content_area = $('#pf_simple_content_area');
// for (var i = 0; i <= colorName.length; i++) {
//     colorText  = getRandomTextColor();
//     colorBg  = getRandomBgColor();
//     $(colorName[i] , pf_simple_content_area[i]).css('background-color',colorBg);
//     // $().css('background-color',colorBg);
// }


    // $('ul.innerContainer li a').each(function(index,item) {
    //    colorText  = getRandomTextColor();
    //    colorBg  = getRandomBgColor();
    //    $(item).css('color',colorText);
       
    //    $(item).hover(function(){
    //         $(item).css('background-color',colorBg);
    //         $(".pf_tab_container").css('background-color',colorBg);
    //    });

    // });

   // function getRandomTextColor() {
   //      var letters = '0123456789ABCDEF';
   //      var colorText = '#';
   //      for (var i = 0; i < 6; i++) {
   //          colorText += letters[Math.floor(Math.random() * 16)];
   //      }
   //  return colorText;
   //  }


   // function getRandomBgColor() {
   //      var letters = '0123456789ABCDEF';
   //      var colorBg = '#';
   //      for (var i = 0; i < 6; i++) {
   //          colorBg += letters[Math.floor(Math.random() * 16)];
   //      }
   //  return colorBg;
   //  }

















});