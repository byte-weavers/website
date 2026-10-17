/* Template: Reevan Web Design & Digital Marketing Agency HTML5 Template*/
/*Author: Rajesh-Doot*/
/*File Description: Main JS file of the template*/

/**Table of contents**
1. Mobile sidebar menu   2. Sticky Header    3. Bootstrap Tooltips    4.  Owl-Carousel   5. Counter Up   6. Video magnific Popup    7  .scroll to top  **/

(function ($) {
  "use strict";

 //Preloader
    window.addEventListener( 'load', function () {
      var preloadpage = document.getElementById( "page-load" );
      preloadpage.style.display = "none";
});

 //Mobile sidebar menu
  var Nav = new hcOffcanvasNav('#main-nav', {
    disableAt: false,
    customToggle: '.toggle',
    levelSpacing: 40,
    navTitle: 'Byte Weavers Menu',
    levelTitles: true,
    labelClose: false,
    levelTitleAsBack: true,   
    closeOnClick: true,
    insertClose: true,
    closeActiveLevel: true,
    insertBack: true,
    swipeGestures:true
 
  });

  //Sticky Header 
  function updateScroll() {
    if ($(window).scrollTop() >= 80) {
      $(".ree-header").addClass('sticky');
    } else {
      $(".ree-header").removeClass("sticky");
    }
  }
  $(function () {
    $(window).scroll(updateScroll);
    updateScroll();
  });

// Tooltips
  $('[data-toggle="tooltip"]').tooltip();

//Owl-Carousel - Home hero brands
$(window).on("load", function () {
  $('.hero-brands').owlCarousel({
      items: 6,
      nav: false,
      dots: false,
      autoplay: true,
      loop: true,   
      center: false,   
      margin: 10,
      autoplayTimeout: 300000,
      autoplayHoverPause: true,
      autoHeight: true,
      smartSpeed: 2000,   
     responsive: {
      0: {
        items: 2
      },
      520: {
        items: 3
      },
      768: {
        items: 4
      },
      1200: {
        items: 6
      },
      1400: {
        items: 6
      },
      1600: {
        items: 6
      },
    }
  });
});

//Owl-Carousel - Home work slide
$(window).on("load", function () {
  $('.full-work-block').owlCarousel({
      items: 3,
      nav: true,
      dots: false,
      autoplay: false,
      loop: true,
      center: false,
      margin: 20,
      autoplayTimeout: 35000,
      autoplayHoverPause: true,     
      autoHeight: true,
      smartSpeed: 1000,
      navText:["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
      responsive: {
        0: {
          items: 1
        },
        520: {
          items:1
        },
        768: {
          items: 2
        },
        1200: {
          items: 3
        },
        1400: {
          items: 3
        },
        1600: {
          items: 3
        },
      }
    });
});

 
//Owl-Carousel - Home reivew slide
$(window).on("load", function () {
  $('.home-review-slider').owlCarousel({
      items: 1,
      nav: false,
      dots: true,
      autoplay: false,
      loop: true,
      center: true,
      margin: 20,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      autoHeight: true,
      smartSpeed: 2000,
      navText:["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    });
});

//Owl-Carousel - home app reivew slide
$(window).on("load", function () {
  $('.testimonial-card-b').owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    dotsContainer: "#testimonials-avatar",
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      1024: {
        items: 1
      },
      1400: {
        items: 1
      }
    }
  });
});


//Owl-Carousel - contact page review slide
$(window).on("load", function () {
  $('.trust-review ').owlCarousel({
      items: 1,
      nav: false,
      dots: true,
      autoplay: true,
      loop: true,
      center: true,
      margin: 20,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      autoHeight: true,
      smartSpeed: 2000,     
    });
});


//Owl-Carousel - app work slide
$(window).on("load", function () {
  $('.full-work-app').owlCarousel({
      items: 4,
      nav: true,
      dots: false,
      autoplay: false,
      loop: true,
      center: false,
      margin: 20,
      stagePadding: 90,
      autoplayTimeout: 35000,
      autoplayHoverPause: true,     
      autoHeight: true,
      smartSpeed: 1000,
      navText:["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
      responsive: {
        0: {
          items: 1,
          stagePadding: 40,
        },
        520: {
          items:1,
          stagePadding: 40,
        },
        768: {
          items: 2
        },
        1200: {
          items: 3
        },
        1400: {
          items: 4
        },
        1600: {
          items: 4
        },
      }
    });
});




//Owl-Carousel - creative agency service
$(window).on("load", function () {
  $('.ree-ca-service').owlCarousel({
      items:3,
      nav: false,
      dots: false,
      autoplay: false,
      loop: true,
      center: false,
      margin: 20,      
      autoplayTimeout: 2500000,
      autoplayHoverPause: true,     
      autoHeight: true,
      smartSpeed: 1500,
      navText:["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
      responsive: {
        0: {
          items: 1,         
        },
        520: {
          items:1,         
        },
        768: {
          items: 2
        },
        1200: {
          items: 3
        },
        1400: {
          items: 3
        },
        1600: {
          items: 3
        },
      }
    });
});


//Owl-Carousel - digital agency hero slider
$(window).on("load", function () {
  $('.hero-owl').owlCarousel({
      items:1,
      nav: false,
      dots: true,
      autoplay: true,
      loop: true,
      center: false,
      margin: 20,      
      autoplayTimeout: 350000,
      autoplayHoverPause: true,     
      autoHeight: true,
      smartSpeed: 1500,
      navText:["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    });
});


		//Owl-Carousel - app screens
    $(window).on("load", function () {
      $('.app-screenss').owlCarousel({
          items: 5,
          nav: false,
          dots: true,
          autoplay: true,
          loop: true,   
          center: false,   
          margin: 30,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          autoHeight: true,
          smartSpeed: 2000,   
         responsive: {
          0: {
            items: 2
          },
          520: {
            items: 3
          },
          768: {
            items: 4
          },
          1200: {
            items:4
          },
          1400: {
            items: 5
          },
          1600: {
            items: 5
          },
        }
      });
    });


//counter animation
$(window).on("load", function () {
  $('.counter').counterUp({
    delay: 10,
    time: 4500
  });
});

 

//Video magnificPopup
$(window).on("load", function () {
    $('.video-popup').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
    });
  });


//Background image
$("[data-background]").each(function () {
  $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})

//aos animation
AOS.init({ 
  offset: 10, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


//Header mega menu
    var $nav = $('li.megamenu');
    $nav.hover(
      function () {
        $(this).addClass('hover');
      },
      function () {
        $(this).removeClass('hover');
      }
 );

   
})(jQuery);


