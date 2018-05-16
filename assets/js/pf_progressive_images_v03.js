$(function(){
   // window resize to set image with right device width START
   $(window).on("resize",function(){
   		var W = $(window).width();
   		var H = $(window).height();
   		function replaceMainImageUrl(e1,e2){
   			var flag = 0;
   			if (flag == 0) {
               if(e2 == undefined){
               $('a.myImageData').attr('href',e1);
               $('a.myImageData img').attr('src',e1);
               } else{
                  $('a.myImageData').attr('href',e1);
                  $('a.myImageData img').attr('src',e2);
               }
               console.log("else block - main-images : = " + e1);
               console.log("else block - placholder images : = " + e2);
   			}
   		}

   		if (W <= 320) {
            var imgUrl = $('a.myImageData[data-image-320]').data("image-320");
   			var progressiveImgUrl = $('a.myImageData img[data-progressive-image-320]').data("progressive-image-320");
            // replaceProgressiveImageUrl(progressiveImgUrl);

            replaceMainImageUrl(imgUrl, progressiveImgUrl);

   		}else if (321 <= W && W <= 480) {
   			var imgUrl = $('a.myImageData[data-image-320]').data("image-480");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-480]').data("progressive-image-480");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);

   		}else if (481 <= W && W <= 767) {
   			var imgUrl = $('a.myImageData[data-image-767]').data("image-767");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-767]').data("progressive-image-767");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);

   		}else if (768 <= W && W <= 1024) {
   			var imgUrl = $('a.myImageData[data-image-1024]').data("image-1024");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-1024]').data("progressive-image-1024");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);

   		}else if (1025 <= W && W <= 1280) {
   			var imgUrl = $('a.myImageData[data-image-1280]').data("image-1280");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-1280]').data("progressive-image-1280");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);
   		}else if (1281 <= W && W <= 1824) {
   			var imgUrl = $('a.myImageData[data-image-1824]').data("image-1824");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-1824]').data("progressive-image-1824");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);
   		}else if (1825 <= W && W <= 2100) {
   			var imgUrl = $('a.myImageData[data-image-2100]').data("image-2100");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-2100]').data("progressive-image-2100");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);
   		}else if (2101 <= W && W <= 4608) {
   			var imgUrl = $('a.myImageData[data-image-4608]').data("image-4608");
            var progressiveImgUrl = $('a.myImageData img[data-progressive-image-4608]').data("progressive-image-4608");
            // replaceProgressiveImageUrl(progressiveImgUrl);
            replaceMainImageUrl(imgUrl, progressiveImgUrl);
   		}


   }).resize();

// window resize to set image with right device width end


// progressivev image area start fron here METHODE -2
// --------------------------------------------------
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) {

   window.addEventListener('load', function() {
      // start
      var pItem = document.getElementsByClassName('progressive replace'), pCount, timer;
      // scroll and resize events
      window.addEventListener('scroll', scroller, false);
      window.addEventListener('resize', scroller, false);

      // DOM mutation observer START
      // if (MutationObserver) {

      //  var observer = new MutationObserver(function() {
      //    if (pItem.length !== pCount) inView();
      //  });

      //  observer.observe(document.body, 
      //    { 
      //       subtree: true, 
      //       childList: true, 
      //       attributes: true, 
      //       characterData: true 
      //    });
      // }
      // DOM mutation observer END

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
         // console.log("main images : = " + href);
         if (!href) return;
      // load image
         var img = new Image();
         if (item.dataset) {
            // img.srcset = item.dataset.srcset || '';
            // img.sizes = item.dataset.sizes || '';
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
                     // add "b-lazy" class for b- lazy plugine
                     // e.target.classList.add('b-lazy');
                  }
               });
            });
         }
      }
   }, false);
}





// lightbox plugine
    var $lightbox = $('#lightbox');
    $('[data-target="#lightbox"]').on('click', function(event) {
        var $img = $(this).find('img'),
            src = $img.attr('src');
            console.log("current image : "+src);
            $('a.image-warpper').attr('href', src);

    });


   



});


