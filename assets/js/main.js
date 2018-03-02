 (function($) {
     $(document).ready(function() {
        'use strict';
        // Replace no-js and adjust touch classes  
        ! function() {
            document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
            var yesIfTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            if (yesIfTouchDevice) {
                 document.documentElement.className += " touch";
            } else {
                 document.documentElement.className += " no-touch";
            }
        }();
        //replacing no-js and touch finishes

        // Global Module starts: For user agent device details
        var userAgent = function() {
            var yesIfTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            var yesIfRatina = (window.devicePixelRatio > 1);

            function isTouchDevice() {
                return yesIfTouchDevice;
             }

            function isRatina() {
                return yesIfRatina;
            }

            function width() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            }


            return {
                isTouchDevice: isTouchDevice,
                isRatina: isRatina,
                width: width
            }
        }();
         // Global Module finishes: User Agent

        //for some instatnt viewport change issue fix
        var viewPortWidth = userAgent.width();
        $(window).on('resize orientationChange', function(event) {
            viewPortWidth = userAgent.width();
        });
        
        //Relode On Resize / ZoomIn/Out
        // var windowWidth = $(window).width();
        // var windowHeight = $(window).height();

        // $(window).resize(function() {
        //     if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
        //         location.reload();
        //         return;
        //     }
        // });

// blazy plugin for ressponsive image

     if ($("body").hasClass("page_id_images")) {
         //Global blazy module starts
         var bLazy = new Blazy({
              breakpoints: [{
                        width: 767, // max-width
                        src: 'data-src'
                         }],
             error: function(ele, msg) {

                 var image = $(ele)[0];
                 if (msg === 'missing') {
                     console.warn("Custom ERROR: ", image, " data-src is missing\n");
                 } else if (msg === 'invalid') {
                     console.warn("Custom ERROR: ", image, " data-src is invalid\n");
                 }
             }
         });
     }    
//Global blazy module finishes
// country name horizontalmenu start
    /* Menus Start */
    initVertical();
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
            console.log("masud width: "+mainWidth);
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
        console.log("scrollWidth: "+$("#"+ parentId +" >.menuContainer>.innerContainer")[0].scrollWidth+" width: "+$("#"+ parentId +" >.menuContainer>.innerContainer").width());
        console.log('remlength: '+ remLength + " scrollableLength: "+scrollableLength);
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


    //Assigning random Id For Every Vertical Menu and resizing the verticalInnerContainer

    function initVertical(){
        $(".verticalMenu").each(function(){
            let id = makeid();
            $(this).attr("id", id);
            let mainHeight = $(this).height();
            console.log("verticalMenu actual height = "+ mainHeight);
            let arrowHeight = $(this).children('i').outerHeight(true);
            console.log("verticalMenu actual arrowHeight height = "+ arrowHeight);
            let calculatedHeight = mainHeight - (arrowHeight*2);
            console.log("verticalInnerContainer actual height = "+ calculatedHeight);
            $(this).children('.verticalInnerContainer').css('height', calculatedHeight);
        });
    }
    //Mouse Enter On Arrow Vertical Menu 
    
    $(".verticalMenu>i").mouseenter(function(){
        var parentId = $(this).parent('.verticalMenu')[0].id;
        var upArrow = $(this).hasClass('upArrow');
        var downArrow = $(this).hasClass('downArrow');
        // let scrollSpeed = 5;
        var verticalInnerContainer = $("#"+parentId+" .verticalInnerContainer");
        var remHeight = verticalInnerContainer[0].scrollHeight - verticalInnerContainer.height();
        var scrollableHeight = remHeight - verticalInnerContainer.scrollTop();

        if(upArrow){
            verticalInnerContainer.animate({
                scrollTop: 0
             }, scrollSpeed * verticalInnerContainer.scrollTop());
        }else if(downArrow){
            verticalInnerContainer.animate({
                scrollTop: remHeight
             }, scrollSpeed * scrollableHeight);
        }
    });

    //Mouse Leave From Arrow Vertical Menu 
    $(".verticalMenu>i").on("mouseleave", function() {
        var parentId = $(this).parent('.verticalMenu')[0].id;
        var verticalInnerContainer = $("#"+parentId+" .verticalInnerContainer");
        verticalInnerContainer.stop();
     });

 /* Vertical Menu End */

   /* PullDown Menu Start */
    $('.slideRightContainer').width('0');
    $(".verticalMenu>.verticalInnerContainer>li").hover(            
        function() {
            var top = parseFloat($(this).position().top);
            $(this).children('.slideRightContainer').css('top', top);
            var slideRightContainer = $(this).children('.slideRightContainer');
            var width = $(slideRightContainer).children('.horizontalMenu2').outerWidth();
            slideRightContainer.show().animate({
              "width" : width
            }, 175);    
        },
        function() {
            var slideRightContainer = $(this).children('.slideRightContainer');
            slideRightContainer.animate({
              "width" : '0'
            }, 175, function(){
              slideRightContainer.hide();
            });       
        }
    );
 /* PullDown Menu End */


// country name horizontalmenu end
// individual variable name for all pages name

var homePage = $("body").hasClass("page-id-homepage");
var normalPage =  $("body").hasClass("page-id-normalpage");
var paragraphPage=  $("body").hasClass("page-id-paragraphpage");

if (homePage || normalPage || paragraphPage) {
 //Global blazy module starts
 var bLazy = new Blazy({

      breakpoints: [{
         // width: 767, //max-width
         src: 'data-src-small'
     }],

     error: function(ele, msg) {

         var image = $(ele)[0];
         if (msg === 'missing') {
             console.warn("Custom ERROR: ", image, " data-src is missing\n");
         } else if (msg === 'invalid') {
             console.warn("Custom ERROR: ", image, " data-src is invalid\n");
         }
     }
 });
 //Global blazy module finishes
};

// ddslick js plugine initialization start
// ddslick plugin start here
if(homePage || normalPage || paragraphPage){
(function (factory) {

    if (typeof define === "function" && define.amd) {
        /** AMD. Register as an anonymous module. */
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        /** Node/CommonJS */
        module.exports = factory(require("jquery"));
    } else {
        /** Browser globals */
        factory(window.jQuery);
    }

}(function ($) {

    $.fn.ddslick = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exists.");
        }
    };

    var methods = {};
    var settingsMap = {};
    var defaults = {
        data: [],
        keepJSONItemsOnTop: false,
        animationTime: 50,
        width: 260,
        height: null,
        background: "#eee",
        selectText: "",
        defaultSelectedIndex: null,
        truncateDescription: true,
        imagePosition: "left",
        showSelectedHTML: true,
        clickOffToClose: true,
        embedCSS: true,
        onSelected: function() { }
    };

    var closeListenerInitialized = false;
    var ddSelectHtml = "<div class='dd-select'><input class='dd-selected-value' type='hidden' /><a class='dd-selected'></a><span class='dd-pointer dd-pointer-down'></span></div>";
    var ddOptionsHtml = "<ul class='dd-options'></ul>";

    //CSS for ddSlick
    var ddslickCSS = "<style id='css-ddslick' type='text/css'>" +
        ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" +
        ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" +
        ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}" +
        ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" +
        ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" +
        ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" +
        ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" +
        ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" +
        ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" +
        ".dd-option:hover{ background:#f3f3f3; color:#000;}" +
        ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" +
        ".dd-option-selected { background:#f6f6f6; }" +
        ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" +
        ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" +
        ".dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>";

    //Public methods
    methods.init = function (userOptions) {
        //Preserve the original defaults by passing an empty object as the target
        //The object is used to get global flags like embedCSS.
        var options = $.extend({}, defaults, userOptions);

        //CSS styles are only added once.
        if ($("#css-ddslick").length <= 0 && options.embedCSS) {
            $(ddslickCSS).appendTo("head");
        }

        //Apply on all selected elements
        return this.each(function() {
            //Preserve the original defaults by passing an empty object as the target
            //The object is used to save drop-down"s corresponding settings and data.
            var options = $.extend({}, defaults, userOptions);

            var obj = $(this),
                data = obj.data("ddslick");
            //If the plugin has not been initialized yet
            if (!data) {

                var ddSelect = [];

                //Get data from HTML select options
                obj.find("option").each(function() {
                    var $this = $(this), thisData = $this.data();
                    ddSelect.push({
                        text: $.trim($this.text()),
                        value: $this.val(),
                        selected: $this.is(":selected"),
                        description: thisData.description,
                        imageSrc: thisData.imagesrc //keep it lowercase for HTML5 data-attributes
                    });
                });

                //Update Plugin data merging both HTML select data and JSON data for the dropdown
                if (options.keepJSONItemsOnTop)
                    $.merge(options.data, ddSelect);
                else options.data = $.merge(ddSelect, options.data);

                //Replace HTML select with empty placeholder, keep the original
                var original = obj, placeholder = $("<div>").attr("id", obj.attr("id"));
                obj.replaceWith(placeholder);
                obj = placeholder;

                // Save options
                var settingsId = "ID_" + (new Date()).getTime();
                $(obj).attr("data-settings-id", settingsId);
                settingsMap[settingsId] = {};
                $.extend(settingsMap[settingsId], options);

                //Add classes and append ddSelectHtml & ddOptionsHtml to the container
                obj.addClass("dd-container").append(ddSelectHtml).append(ddOptionsHtml);

                // Inherit name attribute from original element
                obj.find("input.dd-selected-value")
                    .attr("id", $(original).attr("id"))
                    .attr("name", $(original).attr("name"));

                //Get newly created ddOptions and ddSelect to manipulate
                var ddOptions = obj.find(".dd-options");
                ddSelect = obj.find(".dd-select");

                //Set widths
                ddOptions.css({ width: options.width });
                ddSelect.css({ width: options.width, background: options.background });
                obj.css({ width: options.width });

                //Set height
                if (options.height !== null)
                    ddOptions.css({ height: options.height, overflow: "auto" });

                //Add ddOptions to the container. Replace with template engine later.
                $.each(options.data, function (index, item) {
                    if (item.selected) options.defaultSelectedIndex = index;
                    var ddList = $("<li>").append($("<a>").addClass("dd-option"));
                    var ddOption = ddList.find("a");
                    if(item.value) ddOption.append($("<input>").addClass("dd-option-value").attr("type", "hidden").val(item.value));
                    if(item.imageSrc) ddOption.append($("<img>").attr("src", item.imageSrc).addClass("dd-option-image" + (options.imagePosition === "right" ? " dd-image-right" : "")));
                    if(item.text) ddOption.append($("<label>").addClass("dd-option-text").text(item.text));
                    if(item.description) ddOption.append($("<small>").addClass("dd-option-description dd-desc").text(item.description));
                    ddOptions.append(ddList);
                });

                //Save plugin data.
                var pluginData = {
                    settings: options,
                    original: original,
                    selectedIndex: -1,
                    selectedItem: null,
                    selectedData: null
                };

                obj.data("ddslick", pluginData);

                //Check if needs to show the select text, otherwise show selected or default selection
                if (options.selectText.length > 0 && options.defaultSelectedIndex === null) {
                    obj.find(".dd-selected").html(options.selectText);
                }
                else {
                    var index = (options.defaultSelectedIndex != null && options.defaultSelectedIndex >= 0 && options.defaultSelectedIndex < options.data.length)
                                ? options.defaultSelectedIndex
                                : 0;
                    selectIndex(obj, index, false);
                }

                //EVENTS
                //Displaying options
                obj.find(".dd-select").on("mouseenter.ddslick", function() {
                    open(obj);
                });

                //Selecting an option
                obj.find(".dd-option").on("click.ddslick", function() {
                    selectIndex(obj, $(this).closest("li").index(), true);
                });

                //Click anywhere to close
                if (options.clickOffToClose) {
                    ddOptions.addClass("dd-click-off-close");
                    obj.on("click.ddslick", function (e) { e.stopPropagation(); });
                    // Close listener needs to be added only once
                    if(!closeListenerInitialized) {
                        closeListenerInitialized = true;
                        $("body").on("click", function () {
                            $(".dd-open").removeClass("dd-open");
                            $(".dd-click-off-close").slideUp(options.animationTime).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up");
                        });
                    }
                }
            }
        });
    };

    //Public method to select an option by its index
    methods.select = function (options) {
        return this.each(function() {
            if (options.index !== undefined)
                selectIndex($(this), options.index);
            if (options.value !== undefined)
                selectValue($(this), options.value);
            if (options.id !== undefined)
                selectValue($(this), options.id);
        });
    };

    //Public method to open drop down
    methods.open = function() {
        return this.each(function() {
            var $this = $(this),
                pluginData = $this.data("ddslick");

            //Check if plugin is initialized
            if (pluginData)
                open($this);
        });
    };

    //Public method to close drop down
    methods.close = function() {
        return this.each(function() {
            var $this = $(this),
                pluginData = $this.data("ddslick");

            //Check if plugin is initialized
            if (pluginData)
                close($this);
        });
    };

    //Public method to destroy. Unbind all events and restore the original Html select/options
    methods.destroy = function() {
        return this.each(function() {
            var $this = $(this),
                pluginData = $this.data("ddslick");

            //Check if already destroyed
            if (pluginData) {
                var originalElement = pluginData.original;
                $this.removeData("ddslick").unbind(".ddslick").replaceWith(originalElement);
            }
        });
    };

    //Private: Select by value
    function selectValue(obj, value) {
        var index = obj.find(".dd-option-value[value= '" + value + "']").parents("li").prevAll().length;
        selectIndex(obj, index);
    }

    //Private: Select index
    function selectIndex(obj, index, callbackOnSelection) {

        //Get plugin data
        var pluginData = obj.data("ddslick");

        //Get required elements
        var ddSelected = obj.find(".dd-selected"),
            ddSelectedValue = ddSelected.siblings(".dd-selected-value"),
            selectedOption = obj.find(".dd-option").eq(index),
            selectedLiItem = selectedOption.closest("li"),
            settings = pluginData.settings,
            selectedData = pluginData.settings.data[index];

        //Highlight selected option
        obj.find(".dd-option").removeClass("dd-option-selected");
        selectedOption.addClass("dd-option-selected");

        //Update or Set plugin data with new selection
        pluginData.selectedIndex = index;
        pluginData.selectedItem = selectedLiItem;
        pluginData.selectedData = selectedData;

        //If set to display to full html, add html
        if (settings.showSelectedHTML) {
            var ddSelectedData = $("<div>");
            if(selectedData.imageSrc) ddSelectedData.append($("<img>").addClass("dd-selected-image" + (settings.imagePosition === "right" ? " dd-image-right" : "")).attr("src", selectedData.imageSrc));
            if(selectedData.text) ddSelectedData.append($("<label>").addClass("dd-selected-text").text(selectedData.text));
            if(selectedData.description) ddSelectedData.append($("<small>").addClass("dd-selected-description dd-desc" + (settings.truncateDescription ? " dd-selected-description-truncated" : "")).text(selectedData.description));
            ddSelected.html(ddSelectedData.html());
        }
        //Else only display text as selection
        else ddSelected.html(selectedData.text);

        //Updating selected option value
        ddSelectedValue.val(selectedData.value);

        //BONUS! Update the original element attribute with the new selection
        pluginData.original.val(selectedData.value);
        obj.data("ddslick", pluginData);

        //Close options on selection
        close(obj);

        //Adjust appearence for selected option
        adjustSelectedHeight(obj);

        //Callback function on selection
        if (callbackOnSelection && typeof settings.onSelected == "function") {
            settings.onSelected.call(this, pluginData);
        }
    }

    //Private: Close the drop down options
    function open(obj) {

        var $this = obj.find(".dd-select"),
            ddOptions = $this.siblings(".dd-options"),
            ddPointer = $this.find(".dd-pointer"),
            wasOpen = ddOptions.is(":visible"),
            settings = settingsMap[obj.attr("data-settings-id")];

        //Close all open options (multiple plugins) on the page
        $(".dd-click-off-close").not(ddOptions).slideUp(settings.animationTime);
        $(".dd-pointer").removeClass("dd-pointer-up");
        $this.removeClass("dd-open");

        if (wasOpen) {
            ddOptions.slideUp(settings.animationTime);
            ddPointer.removeClass("dd-pointer-up");
            $this.removeClass("dd-open");
        }
        else {
            $this.addClass("dd-open");
            ddOptions.slideDown(settings.animationTime);
            ddPointer.addClass("dd-pointer-up");
        }

        //Fix text height (i.e. display title in center), if there is no description
        adjustOptionsHeight(obj);
    }

    //Private: Close the drop down options
    function close(obj) {
        //Close drop down and adjust pointer direction
        var settings = settingsMap[obj.attr("data-settings-id")];
        obj.find(".dd-select").removeClass("dd-open");
        obj.find(".dd-options").slideUp(settings.animationTime);
        obj.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up");
    }

    //Private: Adjust appearence for selected option (move title to middle), when no desripction
    function adjustSelectedHeight(obj) {

        //Get height of dd-selected
        var lSHeight = obj.find(".dd-select").css("height");

        //Check if there is selected description
        var descriptionSelected = obj.find(".dd-selected-description");
        var imgSelected = obj.find(".dd-selected-image");
        if (descriptionSelected.length <= 0 && imgSelected.length > 0) {
            obj.find(".dd-selected-text").css("lineHeight", lSHeight);
        }
    }

    //Private: Adjust appearence for drop down options (move title to middle), when no desripction
    function adjustOptionsHeight(obj) {
        obj.find(".dd-option").each(function() {
            var $this = $(this);
            var lOHeight = $this.css("height");
            var descriptionOption = $this.find(".dd-option-description");
            var imgOption = obj.find(".dd-option-image");
            if (descriptionOption.length <= 0 && imgOption.length > 0) {
                $this.find(".dd-option-text").css("lineHeight", lOHeight);
            }
        });
    }

}));
};
// ddslick plugin end here
// ===========================
// flag combo js(flag combo dropdown menu) start here
if (homePage || normalPage || paragraphPage) {

var ddData = [
    {
        text: "China",
        value: 1,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_china_2016_320_200.png"
    },
    {
        text: "England",
        value: 2,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_england_2016_320_200.png"
    },
    {
        text: "France",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_france_2016_320_200.png"
    },
    {
        text: "India",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_india_2016_320_200.png"
    },
    {
        text: "Italy",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_italy_2016_320_200.png"
    },
    {
        text: "Portugal",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_portugal_2016_320_200.png"
    },
    {
        text: "Spain",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_spain_2016_320_200.png"
    },
    {
        text: "Rasia",
        value: 4,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_rusia_2016_320_200.png"
    }
];
var ddData2 = [
    {
        text: "China",
        value: 1,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_china_2016_320_200.png"
    },
    {
        text: "England",
        value: 2,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_england_2016_320_200.png"
    },
    {
        text: "France",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_france_2016_320_200.png"
    },
    {
        text: "India",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_india_2016_320_200.png"
    },
    {
        text: "Italy",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_italy_2016_320_200.png"
    },
    {
        text: "Portugal",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_portugal_2016_320_200.png"
    },
    {
        text: "Spain",
        value: 3,
        width:100,
        selected: true,
        imageSrc: "img/flags/brqx_flag_spain_2016_320_200.png"
    },
    {
        text: "Rasia",
        value: 4,
        width:100,
        selected: false,
        imageSrc: "img/flags/brqx_flag_rusia_2016_320_200.png"
    }
];
// flag-combo-left
$('#myDropdown').ddslick({
    data:ddData,
    width:250,
    height:200,
    selectText: "Select your preferred social network",
    imagePosition:"left",
    onSelected: function(selectedData){
        //callback function: do something with selectedData;
    }   
});
// flag-combo-right
$('#myDropdown2').ddslick({
    data:ddData2,
    width:250,
    height:200,
    selectText: "Select your preferred social network",
    imagePosition:"left",
    onSelected: function(selectedData){
        //callback function: do something with selectedData;
    }   
});

};
// flag combo js(flag combo dropdown menu) end here

// js for normal page where page id = (page-id-normalpage);
if (normalPage) {
    $(".main-content-middle-area").css({
        'width':'100%',
        'left':'0px',
    });
    $(".content-artical").css({
        'padding-top':'20px',
        'padding-left':'30px',
        'padding-right':'30px',
        'padding-bottom':'20px',
    });

    $("p").css({
        'margin-bottom':'15px',
        'text-align':'justify',
    });
    $("#footer p").css("color", "#ffffff");
} else if(homePage){
    $(".main-content-middle-area").css('width', '81%').css('width', '-=275px');
    $(".main-content-middle-area").css('left', '266px');
    $("p").css({
        'margin-bottom':'15px',
        'text-align':'justify',
    });
} else if(paragraphPage){
    $(".main-content-middle-area").css({
        'width':'100%',
        'left':'0px',
    });
    $(".content-artical").css({
        'padding-top':'20px',
        'padding-left':'30px',
        'padding-right':'30px',
        'padding-bottom':'20px',
    });
    // $("p:nth-child(odd)").css("color", "#285E1A");
    // $("p:nth-child(even)").css("color", "#581A5E");
    $("p").css({
        'margin-bottom':'15px',
        'text-align':'justify',
    });

    $("#footer p").css("color", "#ffffff");
}


// // here start jquery code for tool box font size (increase and decrease)
// // ======================================================================
// $(function () {
//     $(".font-button").bind("click", function () {
//         var size = parseInt($('.content p').css("font-size"));
//         if ($(this).hasClass("plus-arrow")) {
//             size = size + 2;
//             if(size >= 30){
//                 size = 30;
//             }
//         } else {
//             size = size - 2;
//             if (size <= 10) {
//                 size = 15;
//             }
//         }

//         if (paragraphPage || homePage) {
//             $('.content p').animate({'font-size': size});
//         }
//     });
// });

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


// copy text to clipboard click to the button js code here
// =============================================================

    // function copyToClipboard(element) {
        
    //   var $temp = $("<input>");
    //   $("body").append($temp);
    //   $temp.val($(element).text()).select();
    //   document.execCommand("copy");
    //   $temp.remove();

    // }

    // copy to clipboard on selected text
    //-------------------------------------------

    // function getSelectionText(){
    //     var selectedText = ""
    //     if (window.getSelection){ // all modern browsers and IE9+
    //         selectedText = window.getSelection().toString()
    //     }
    //     return selectedText
    // }


    // function copySelectionText(){
    //     var copysuccess // var to check whether execCommand successfully executed
    //     try{
    //         copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    //     } catch(e){
    //         copysuccess = false
    //     }
    //     return copysuccess
    // }



    // create tooltip finction
    // var tooltip,hidetooltiptimer;

    // function createtooltip(){
    //   tooltip = document.createElement('div');
    //   tooltip.style.cssText = 
    //   'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
    //   + 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
    //   + 'opacity:0;transition:opacity 0.3s'

    //   tooltip.innerHTML = 'Copied!'
    //   document.body.appendChild(tooltip);
    // }
    // show  tooltip finction

    // function showtooltip(event){
    //   var evt = event;
    //   clearTimeout(hidetooltiptimer);
    //   tooltip.style.left = evt.pageX - 10 + 'px'
    //   tooltip.style.top = evt.pageY + 15 + 'px'
    //   tooltip.style.opacity = 1
    //   hidetooltiptimer = setTimeout(function(){
    //     tooltip.style.opacity = 0
    //   }, 500);
    // }

    //createtooltip(); // create tooltip by calling it ONCE per page. See "Note" below


    // create tooltip finction 2 for not copyed

    // show  tooltip finction



    //createtooltip2(); // create tooltip by calling it ONCE per page. See "Note" below

    // $('div.content').on('mouseup',function(){
    //     // var copysuccess = copySelectionText();
    //     // var selected = getSelectionText();
    //     var copysuccess = copySelectionText();
    //     // showtooltip(event);
    //     if (copysuccess) {
    //       // var copysuccess = copySelectionText();
    //       showtooltip(event);
          
    //     }
    // });

    // copy to clipboard yes/no button show hide
























// lightbox plugin

    var $lightbox = $('#lightbox');
    $('[data-target="#lightbox"]').on('click', function(event) {
        var $img = $(this).find('img'),
            src = $img.prop('currentSrc');
            console.log("current image : "+src);
            $('a.image-warpper').attr('href', src);

    });






/*    var $lightbox = $('#lightbox');
    
    $('[data-target="#lightbox"]').on('click', function(event) {
        var $img = $(this).find('img'),
            src = $img.prop('currentSrc'),
            alt = $img.attr('alt'),
            css = {
                'maxWidth': $(window).width() + 100,
                'maxHeight': $(window).height() + 100,
            };
        $lightbox.find('.close').addClass('hidden');
        $lightbox.find('img').attr('src', src);
        $lightbox.find('img').attr('alt', alt);
        $lightbox.find('.modal-dialog').css(css);
        $lightbox.find('img').css(css);
    });
    
    $lightbox.on('shown.bs.modal', function (e) {
        var $img = $lightbox.find('img');
        // $lightbox.find('.modal-dialog').css({'width': $img.width()});
        $lightbox.find('.close').removeClass('hidden');
    });*/


/*
	pf_hover_image.html start here
	=======================================
*/

	

	// $("#zoom_01").elevateZoom();
	var hoverPage = $("body").hasClass("page_id_hover_image");
	var zoomImage = $('#zoom_01');
	if (hoverPage) {
    	var width;
    	$(window).on('resize',function(){
    		var width = $('.page_id_hover_image').width();
			console.log('width on load + resize : '+ width);
			if(width >= 768){
				
				$('#zoom_01').attr('id','hoverZoomEnable');
				zoomImage.elevateZoom();
			    // $("#hoverZoomEnable").elevateZoom({
			    //     constrainType:"height", 
			    //     constrainSize:274, 
			    //     zoomType: "lens", 
			    //     containLensZoom: true, 
			    //     cursor: 'pointer'
			    // });
			}else{
				console.log('stop');
				$('#hoverZoomEnable').removeAttr('id');
				//Remove 
				$('.zoomContainer').remove();
				zoomImage.removeData('elevateZoom');
				zoomImage.removeData('zoomImage');
			}
    	}).resize();
	}



// copy to clipboard text by select
// ===========================================

    function getSelectionText(){
        var selectedText = ""
        if (window.getSelection){ // all modern browsers and IE9+
            selectedText = window.getSelection().toString()
        }
        return selectedText
    }


    function copySelectionText(){
        var copysuccess // var to check whether execCommand successfully executed
        try{
            copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
        } catch(e){
            copysuccess = false
        }
        return copysuccess
    }

    // create tooltip finction
    var tooltip,hidetooltiptimer;

    function createtooltip(){
      tooltip = document.createElement('div');
      tooltip.style.cssText = 
      'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
      + 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
      + 'opacity:0;transition:opacity 0.3s'

      tooltip.innerHTML = 'Copied!'
      document.body.appendChild(tooltip);
    }
    // show  tooltip finction

    function showtooltip(event){
      var evt = event;
      clearTimeout(hidetooltiptimer);
      tooltip.style.left = evt.pageX - 10 + 'px'
      tooltip.style.top = evt.pageY + 15 + 'px'
      tooltip.style.opacity = 1
      hidetooltiptimer = setTimeout(function(){
        tooltip.style.opacity = 0
      }, 500);
    }

    createtooltip(); // create tooltip by calling it ONCE per page. See "Note" below

// fade in dive is defult hide
// $('#copytoClipboard-area').css('display','none');

/*    var buddhaquote = document.getElementById('copyTextId')
    buddhaquote.addEventListener('mouseup', function(e){
        var selected = getSelectionText() // call getSelectionText() to see what was selected
        if (selected.length > 0){ // if selected text length is greater than 0
            var copysuccess = copySelectionText() // copy user selected text to clipboard
            showtooltip(e)
            $('#copytoClipboard-area').css('display','block').fadeIn(5000);
            setTimeout(function(){$('#copytoClipboard-area').fadeOut(2000);}, 3000);
        }
    }, false)*/

// copy to clipboard a paragraph by click event...
// =================================================

    // $('.content p').on('click', function(){
    //     $('.content p.textCopy').removeClass('textCopy');
    //     $(this).addClass('textCopy');

    // });

    $('.content p').addClass('textCopy');

    var copyTextBox = document.getElementById('copyContentBox')

    function selectElementText(el){
        var range = document.createRange() // create new range object
        range.selectNodeContents(el) // set range to encompass desired element text
        var selection = window.getSelection() // get Selection object from currently user selected text
        selection.removeAllRanges() // unselect any user selected text (if any)
        selection.addRange(range) // add range to Selection object to select it
    }
    
/*    copyTextBox.addEventListener('click', function(e){
        var e = e || event // equalize event object between modern and older IE browsers
        var target = e.target || e.srcElement // get target element mouse is over
        if (target.className == 'textCopy'){
            selectElementText(target) // select the element's text we wish to read
            var copysuccess = copySelectionText()
            if (copysuccess){
                //showtooltip(e)
                $('#copytoClipboard-area').css('display','block').fadeIn(5000);
                setTimeout(function(){$('#copytoClipboard-area').fadeOut(2000);}, 3000);
            }
        }
    }, false)*/



    //this flag is checked against to see if the "click" function can happen
    var clickIsValid = true;
    //this is how many milliseconds you want to allow before click doesn't count
    var delay = 500;
    //this function sets the flag to false
    var dontClick = function(){
        clickIsValid = false;
    }

    //mousedown, a global variable is set to the timeout function
    var cancelClick;
    $('.content p').mousedown( function(){
        cancelClick = setTimeout( dontClick, delay );
    })

    //mouseup, the timeout for dontClick is cancelled
    $('.content p').mouseup( function(){
        
        clearTimeout( cancelClick );
       
        //if the time limit wasn't passed, this will be true
        if(clickIsValid){
            // this is where you call the function you want to happen on  a quick click
            console.log('click event');

            var e = e || event // equalize event object between modern and older IE browsers
            var target = e.target || e.srcElement // get target element mouse is over
            if (target.className == 'textCopy'){
                selectElementText(target) // select the element's text we wish to read
                var copysuccess = copySelectionText()
                if (copysuccess){
                    //showtooltip(e)
                    $('#copytoClipboard-area').fadeIn(1000);
                    setTimeout(function(){$('#copytoClipboard-area').fadeOut(1000);}, 3000);
                }
            }

        }else{
            console.log('not click event..');

            var selected = getSelectionText() // call getSelectionText() to see what was selected
            if (selected.length > 0){ // if selected text length is greater than 0
                var copysuccess = copySelectionText() // copy user selected text to clipboard
                //showtooltip(e)
                $('#copytoClipboard-area').fadeIn(1000);
                setTimeout(function(){$('#copytoClipboard-area').fadeOut(1000);}, 3000);
            }

        }
        //reset the values to their defaults
         clickIsValid = true;
        
    })





// progressivev image area start fron here METHODE -1
// ----------------------------------------
/*$(function(){

  $('.progressive-image').each(function(){
    var image = new Image();
    var previewImage = $(this).find('.loadingImage');
    var newImage = $(this).find('.overlay');

    image.onload = function(){
      newImage.css('background-image', 'url(' + image.src + ')');
      newImage.css('opacity', '1');
      // newImage.css('height', '100%');
      console.log('complete');
    };
    image.src = previewImage.data('image');

  });

});*/





// progressivev image area start fron here METHODE -2
// --------------------------------------------------

if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

  // start
  var pItem = document.getElementsByClassName('progressive replace'), pCount, timer;

  // scroll and resize events
  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', scroller, false);

  // DOM mutation observer
  if (MutationObserver) {

    var observer = new MutationObserver(function() {
      if (pItem.length !== pCount) inView();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });

  }

  // initial check
  inView();


  // throttled scroll/resize
  function scroller() {

    timer = timer || setTimeout(function() {
      timer = null;
      inView();
    }, 300);

  }


  // image in view?
  function inView() {

    if (pItem.length) requestAnimationFrame(function() {

      var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
      while (p < pItem.length) {

        cRect = pItem[p].getBoundingClientRect();
        pT = wT + cRect.top;
        pB = pT + cRect.height;

        if (wT < pB && wB > pT) {
          loadFullImage(pItem[p]);
          pItem[p].classList.remove('replace');
        }
        else p++;

      }

      pCount = pItem.length;

    });

  }


  // replace with full image
  function loadFullImage(item) {

    var href = item && (item.getAttribute('data-href') || item.href);
    if (!href) return;

    // load image
    var img = new Image();
    if (item.dataset) {
      img.srcset = item.dataset.srcset || '';
      img.sizes = item.dataset.sizes || '';
    }
    img.src = href;
    img.className = 'reveal';
    if (img.complete) addImg();
    else img.onload = addImg;

    // replace image
    function addImg() {

      requestAnimationFrame(function() {

        // disable click
        if (href === item.href) {
          item.style.cursor = 'default';
          item.addEventListener('click', function(e) { e.preventDefault(); }, false);
        }

        // add full image
        item.appendChild(img).addEventListener('animationend', function(e) {

          // remove preview image
          var pImg = item.querySelector && item.querySelector('img.preview');
          if (pImg) {
            e.target.alt = pImg.alt || '';
            item.removeChild(pImg);
            e.target.classList.remove('reveal');
          }

        });

      });

    }

  }

}, false);





/*===============end jquery===============*/

     });
 })(jQuery);


