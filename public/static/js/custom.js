jQuery(document).ready(function($) {
    var scrolled = jQuery(window).scrollTop();
    jQuery(window).scroll(function(e) {
        var scrolled = jQuery(window).scrollTop();
        if (scrolled > 100) {

            jQuery('.top-fix').addClass('fixed');
        } else {
            jQuery('.top-fix').removeClass('fixed');
        }
    });
    jQuery('.closer-click').click(function(e) {
        jQuery('#modal-9').removeClass('md-show');
    });
    jQuery('.hamburger').click(function(e) {
        e.stopPropagation(); // stop the click from bubbling
        e.preventDefault(); // prevent the default action

        jQuery('#st-container').toggleClass('st-effect-7 st-menu-open');
        // click body one click for close menu
        jQuery(document).one('click', function closeMenu(e) {
            if (jQuery('#st-container').has(e.target).length === 0) {
                jQuery('#st-container').removeClass('st-effect-7  st-menu-open');
            } else {
                jQuery(document).one('click', closeMenu);
            }
        });
        //    jQuery('.button-menu').focusout(function(event){
        //     jQuery('nav.nav').slicknav('open');
        // });
    });
    jQuery(function() {
        jQuery('#accordion').on('shown.bs.collapse', function(e) {
            var offset = jQuery('.panel.panel-default > .panel-collapse.in').offset();
            if (offset) {
                jQuery('html,body').animate({
                    scrollTop: jQuery('.panel-title a').offset().top - 20
                }, 500);
            }
        });
    });
});
jQuery(document).ready(function() {
    jQuery('.collapse.in').prev('.panel-heading').addClass('active');
    jQuery('#accordion, #bs-collapse')
        .on('show.bs.collapse', function(a) {
            jQuery(a.target).prev('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(a) {
            jQuery(a.target).prev('.panel-heading').removeClass('active');
        });
    jQuery('.nav-menu-top li.dropdown').hover(function() {
        jQuery(this).find('.dropdown-menu').stop(true, true).delay(100).slideDown(300);
    }, function() {
        jQuery(this).find('.dropdown-menu').stop(true, true).delay(100).slideUp(300);
    });
 
    // toggle menu
    $('.menu-icon').click(function() {
        $(".logo").toggleClass("logo_active");
        $(".menu").toggleClass("menu_active");
        $(".group-icon").toggleClass("group-icon_active");
        $(".form_search").toggleClass("form_search_slide");

        $(".search-result").toggleClass("search-result_hbg");

    });
    // search
    $('.icon-search').click(function(event) {
        $(".icon-search").toggleClass("text-light");
        $(".form_search").toggleClass("form_search-active");
        $(".search-result").toggleClass("search-result_active");

        event.stopPropagation();
    });

    $('.icon-close').click(function() {
        $(".icon-search").removeClass("text-light");
        $(".form_search").removeClass("form_search-active");
        $(".search-result").removeClass("search-result_active");
    });

    // select-site
    $('.select-site').click(function(event) {
        $(".select-site").toggleClass("text-light");
        $(".site-option").toggleClass("site-option_active");

        $(".icon-search").removeClass("text-light");
        $(".form_search").removeClass("form_search-active");
        $(".search-result").removeClass("search-result_active");

        $(".select-lang").removeClass("text-light");
        $(".lang-option").removeClass("lang-option_active");
        event.stopPropagation();
    });
     // select-LANGUAGE
    $('.select-lang').click(function(event) {
        $(".select-lang").toggleClass("text-light");
        $(".lang-option").toggleClass("lang-option_active");

        $(".icon-search").removeClass("text-light");
        $(".form_search").removeClass("form_search-active");
        $(".search-result").removeClass("search-result_active");

        $(".select-site").removeClass("text-light");
        $(".site-option").removeClass("site-option_active");
        event.stopPropagation();
    });

    // stopPropagation
    $(document).on("click", function(event) {
        // select-LANGUAGE
        $(".select-lang").removeClass("text-light");
        $(".lang-option").removeClass("lang-option_active");
        // select-site
        $(".select-site").removeClass("text-light");
        $(".site-option").removeClass("site-option_active");

        $(".icon-search").removeClass("text-light");
        $(".form_search").removeClass("form_search-active");
        $(".search-result").removeClass("search-result_active");

    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll < 100) {

            $(".menu-item ").removeClass('h-60px');
            $(".bg-space ").removeClass('h-60px');
            $(".icon-search").removeClass('h-60px');

            $(".search").removeClass('top-60px');
            $(".icon-close").removeClass('top-80px');
            $(".group-icon").removeClass('h-60px');

            $(".logo-small").removeClass('slideUp');
            $(".editorial_left").removeClass('images-left-box');

            $(".search-result").removeClass('top-120px');
        } else {
            $(".menu-item ").addClass('h-60px');
            $(".bg-space ").addClass('h-60px');
            $(".icon-search").addClass('h-60px');

            $(".search").addClass('top-60px');
            $(".icon-close").addClass('top-80px');
            $(".group-icon").addClass('h-60px');
            
            $(".logo-small").addClass('slideUp');
            $(".editorial_left").addClass('images-left-box');
            
            $(".search-result").addClass('top-120px');

        }
    });
});

jQuery(document).ready(function($) {
    var width = $('.group-timeline').length;
    var widthLenght =  "4."+width;
    var width_browser = $( window ).width();
    $(".history-page-wrapper").css({'width': width_browser*width+"px"})
    $(".history-page").css({'height':(width_browser*width)-3800+"px"})
    var height = jQuery( window ).height();
    var scrolled = jQuery(window).scrollTop();
        jQuery(window).scroll(function(e){ 
          var scrolled = jQuery(window).scrollTop();
          jQuery(".history-page-wrapper").css({'left':-scrolled+"px"});
          if(scrolled > 700){
            $('.progress-width').css({'width':((scrolled)/130)+'%'});
          }
      });
});