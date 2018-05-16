
// here end jquery code for keybord
// ============================================
//here start juery for paragraph space change
//============================================

$(".content").removeClass().addClass("content option-no-"+$('#paragraphSpaceOPtion').find('option:selected').val());
$("#paragraphSpaceOPtion").on("change",function(){
  var val=$(this).find('option:selected').val();
  $(".content").removeClass().addClass("content option-no-"+val);
});


//here start js code for even color picker
//============================================
$("#colorWell").change(function(){
    var evenColor = $(this).val();
    //console.log("color value : "+evenColor);
    $(".content p:nth-child(even)").css("color",evenColor);
});
//here start js code for odd color picker
//============================================
$("#colorWell2").change(function(){
    var oddColor = $(this).val();
    //console.log("color value : "+evenColor);
    $(".content p:nth-child(odd)").css("color",oddColor);
});

// ================================

// **************************|
// js code for pf_simple.html|
// **************************|

// here start jquery code for tool box font size (increase and decrease)
// ======================================================================
var pf_simple_page = $("body").hasClass("pf_simple_page");
var pf_simple = $("body").hasClass("pf_simple");
$(function () {
    $(".font-button").bind("click", function () {
        $(".tab-pane").addClass("content");
        var size = parseInt($('.content p').css("font-size"));
        if ($(this).hasClass("plus-arrow")) {
            size = size + 2;
            // font-size max limit
            /*if(size >= 30){
                size = 30;
            }*/
        } else {
            size = size - 2;
            // font-size mini limit
            /*if (size <= 10) {
                size = 15;
            }*/
        }

        if (pf_simple_page || pf_simple) {
            $('.content p').animate({'font-size': size});
        }
    });
});


//here start juery for paragraph space change
//============================================
/*$(".paragraph-space").removeClass().addClass("paragraph-space option-no-"+$('#paragraphSpaceOPtion').find('option:selected').val());*/

$("#paragraphSpaceOPtion").on("change",function(){
  var val=$("#paragraphSpaceOPtion").find('option:selected').val();
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

//toolbox button hover massege js code start here here

// paragraph scroll js code start here
// =====================================

    function verticalSlideUp(){
        $(".scroll-inner-container").each(function(){
            let id = makeid();
            var div = $(this);
            div.stop();
            $(this).attr("id",id);
            var remHeight = div[0].scrollHeight - $(this).height();
            var scrollableHeight = remHeight - div.scrollTop();
            var pos = div.scrollTop();
            var remainingTime = (remHeight - pos) * 100 / 5; //here 5 is a speed
            // console.log("pos : "+ pos);
            div.animate({
                scrollTop:remHeight
            },{
                duration: remainingTime,
                easing: "linear",
            });
        });
    };
 
    function verticalSlideDown(){
        $(".scroll-inner-container").each(function(){
            let id = makeid();
            var div = $(this);
            
            div.stop();
            $(this).attr("id",id);
            var remHeight = div[0].scrollHeight - $(this).height();
            var scrollableHeight = remHeight - div.scrollTop();
            var pos = div.scrollTop();
            // console.log("pos : "+ pos);
            var remainingTime = (pos * 100) / 5; //here 5 is a speed

            div.animate({
                scrollTop:0
            },{
                duration: remainingTime,
                easing: "linear",

            });

        });
    };


// keyboard enable function
// =====================================

// disable auto croll
//----------------------------

/*
    $(".scroll-outer-container").append('<div class="overlayTop for-cursor-down"></div><div class="overlayBottom for-cursor-up"></div>');
    var disableAutoScroll = true;
    $(".scroll-btn").click(function(){
        if (disableAutoScroll) {
            disableAutoScroll = false;
            $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_red_100.png");
            $(".overlayTop").removeClass("for-cursor-down");
            $(".overlayBottom").removeClass("for-cursor-up");

        } else {
            disableAutoScroll = true;
            $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_green_100.png");

            $(".overlayTop").addClass("for-cursor-down");
            $(".overlayBottom").addClass("for-cursor-up");
        }
    });

    $(".overlayBottom").mouseenter(function(){
        if(disableAutoScroll == true){
            verticalSlideUp();
            
        }
    });

    $(".overlayTop").mouseenter(function(){
        if(disableAutoScroll == true){
            verticalSlideDown();
        }
        
    });


    $(".overlayBottom").on("mouseleave", function(){
        var div = $('.scroll-inner-container');
        div.stop();
    });

    $(".overlayTop").on("mouseleave", function(){
        var div = $('.scroll-inner-container');
        div.stop();
    });
*/

// text container scroll Up/Down start here
// ============================================
// auto scroll controll function

var disableAutoScroll = true;

$('.scroll-btn').click(function(){
    if (disableAutoScroll) {
        disableAutoScroll = false;
        $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_red_100.png");
    }else{
        disableAutoScroll = true;
        $("span img.auto-scroll-enable").attr("src","img/box/brqx_2017_auto_scroll_enabled_green_100.png");
    }
});



// mouse movement exucution start here .when mouse hover over 10% top or 10% bottom then scroll up/down start
var obj = $('.scroll-inner-container');
var top, left, bottom, right;
var excldH,objHeight,objWidth;
getPos(obj);

//Calls fuction on mouse over
obj.mousemove(function(e) {
    handleMouseMove(e)
});
//Get position of mouse pointer
function handleMouseMove(e) {
        var posX = e.clientX;
            var posY = e.clientY;

        if(posY < top+excldH && disableAutoScroll == true){
            
            verticalSlideDown();
            /*$(".scroll-inner-container").css("background-color", "yellow");*/ //those color only for mouse position testing parpous 
        }else if(posY > bottom-excldH && disableAutoScroll == true){
            
            verticalSlideUp();
            /*$(".scroll-inner-container").css("background-color", "green");*/ //those color only for mouse position testing parpous 
        }else{
            var div = $('.scroll-inner-container');
            div.stop();
        }
 };

// Get position of the div 'scroll-inner-container'
 function getPos(obj) {
    var offsets = obj.offset();
    objHeight = obj.height();
    objWidth = obj.width();
    excldH = objHeight/3; //Caculating 10% height
    top = offsets.top,
    left = offsets.left,
    bottom = top+objHeight,
    right = left+objWidth
};


    // scroll top/down button js code
    // -------------------------------------

    $(".scrollToBottom").click(function(){
        var div = $(".scroll-inner-container");
        var remHeight = div[0].scrollHeight - $(this).height();
        var scrollableHeight = remHeight - div.scrollTop();
        var pos = div.scrollTop();
        var remainingTime = (scrollableHeight - pos) * 100 / 100; //here 100 is a speed
        $(".scroll-inner-container").animate({
            scrollTop:remHeight
        },{
            duration: remainingTime,
            easing: "linear",
        });
    });


    $(".scrollToTop").click(function(){
        var div = $(".scroll-inner-container");
        var remHeight = div[0].scrollHeight - $(this).height();
        var scrollableHeight = remHeight - div.scrollTop();
        var pos = div.scrollTop();

        console.log("pos : "+ pos);
        var remainingTime = (pos * 100) / 100; //here 100 is a speed
        $(".scroll-inner-container").animate({
            scrollTop:0
        },{
            duration: remainingTime,
            easing: "linear",
        });
    });
  
    var controlsEnabled = true;
    $(".keyboard-btn").on('click', function () {
        //controlsEnabled = !controlsEnabled;
        if (controlsEnabled) {
            controlsEnabled = false;
            $("span img.keyboard-enable").attr("src","img/box/brqx_2017_keyboard_enabled_red_100.png");

        } else {
            controlsEnabled = true;
            $("span img.keyboard-enable").attr("src","img/box/brqx_2017_keyboard_enabled_green_100.png");
        }

    });




$(document).keydown(function (e) {

    if (controlsEnabled)
    {
        if (e.keyCode == 38) { 

            verticalSlideDown();
            //console.log("pressed key for Down : "+e.keyCode);
        }

        if (e.keyCode == 40) {
           verticalSlideUp();
           //console.log("pressed key for Up: "+e.keyCode);
        }
        if (e.keyCode == 13) {
            var div= $(".scroll-inner-container");
            //console.log("pressed key for stop : "+e.keyCode);
           div.stop();
        }
    }

});



    // scroll top/down button js code for toolbar button
    // ---------------------------------------------------
    $(".goToDown").click(function(){
        var div = $(".scroll-inner-container");
        div.stop();
        var remHeight = div[0].scrollHeight - $(this).height();
        var scrollableHeight = remHeight - div.scrollTop();
        var pos = div.scrollTop();
        var remainingTime = (scrollableHeight - pos) * 100 / 100; //here 100 is a speed
        $(".scroll-inner-container").animate({
            scrollTop:remHeight
        }/*,{
            duration: remainingTime,
            easing: "linear",
        }*/);
    });


    $(".goToTop").click(function(){
        var div = $(".scroll-inner-container");
        div.stop();
        console.log('go to down button clicked..!');
        var remHeight = div[0].scrollHeight - $(this).height();
        var scrollableHeight = remHeight - div.scrollTop();
        var pos = div.scrollTop();

        console.log("pos : "+ pos);
        var remainingTime = (pos * 100) / 100; //here 100 is a speed
        $(".scroll-inner-container").animate({
            scrollTop:0
        }/*,{
            duration: remainingTime,
            easing: "linear",
        }*/);
    });


// scroll by keyboard (two methode) js code start
// ===================================
//==> NETHODE : (ONE)
//--------------------------------------
// function moveContent(px) {
//     var top = $('.scroll-inner-container').position().top;
//     $(".scroll-inner-container").css("top", top+px);
// }
// $(document).keydown(function(e){
//     if (e.keyCode == 38) { 
//        moveContent(-5);
//     }
//     if (e.keyCode == 40) { 
//        moveContent(5);
//     }
// });

//==> NETHODE : (TWO)
//--------------------------------





// STOP MOUSE WHEEL ON WEBPAGE
// ==============================
// document.onmousewheel=function(){return false};

// mouse position start


// under testing js code
// ==========================

function mousePositionTop(){
    var x,y;
    $(".scroll-middle-container").mousemove(function(event){
        var offset = $(this).offset();
        x = event.pageX - offset.left;
        y = event.pageY - offset.top;
        $("#result").html("X : "+x+" Y : "+y);
        if (y >= 1 && y <= 150 ) {
            verticalSlideUp();
            // verticalSlideDown();
            console.log("position Y : "+y );
        } else{
            var div= $(".scroll-inner-container");
            
           div.stop();
        }
    });
};

function mousePositionBottom(){
    var x,y,bottom;
    $(".scroll-middle-container").mousemove(function(event){
        var $el = $(".scroll-middle-container");
        var offset = $(this).offset();
        x = event.pageX - offset.left;
        y = event.pageY - offset.top;
        bottom = $el.position().top + $el.outerHeight(true);
        console.log("bottom position : "+bottom);
        console.log("bottom position - 150 : "+(bottom -150));
        if(bottom == 0){
            alert("bottom : "+ bottom);
        }
        $("#result").html("X : "+x+" Y : "+y);
        
    });
};
// mousePositionTop();
// mousePositionBottom();



// ressponsive font size for every device
// ----------------------------------------

var causeRepaintsOn = $(".content");
$(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
});










