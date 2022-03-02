jQuery(window).ready(function ($) {
hw = $('.history-page-wrapper').width();
scrollh = $('.history-page').height(hw);
count = $('.timeline-group').length;
wh = $(window).height();
dh = $(document).height();
w = $('.timeline-group').width();
d = $(document).width();


target = ((dh - wh) / (count - 0.75));

$(window).scroll(function () {
    var scroll = $(window).scrollTop(),
    value = (scroll / (dh - wh)) * 82.5;
    value2 = (scroll / (dh - wh)) * 95;
    value3 = 100+(((scroll - hw)/hw) * 100 );
    data = 0.2;
    datanull = 1.4;
    $('.history-page-wrapper').css("left", -value * (count - 1) + 'vw');
    
    if (scroll == dh - wh) {
        $('.history-page').addClass("opa-wrapper");
    } else {
        $('.history-page').removeClass("opa-wrapper");
    }
    for (i = 2; i <= count; i++) {
        if (scroll > (target * (i - 1)) - (target / 1.2)) {
            if($(".timeline-group:nth-child(" + i + ")").hasClass('timeline_active')){
                if($(".target:nth-child(" + i + ")").text() != ''){
                    if($(".target:nth-child(" + i + ")").prev().text() == ''){
                        data = 0.43;
                        $('.progress-width').css('width', value3 - (data *(i-1)) + '%');

                    }else{
                        $('.progress-width').css('width', value3 - (data *(i-1.2)) + '%');
                    }
                    
                }else if($(".target:nth-child(" + i + ")").text() == '' && !$(".target:nth-child(" + i + ")").next().hasClass('target_active')){
                    if($(".target:nth-child(" + i + ")").next().text() != ''){
                        datanull = 1.4;
                    }
                
                    $('.progress-width').css('width', value3 - (datanull +(data *(i-1))) + '%');
                    
                }
                
            }
            else if (i <= 1){
                $('.progress-width').css('width', 0 + '%');
            }
            
            $(".timeline-group:nth-child(" + i + ")").addClass("timeline_active");
            $(".target:nth-child(" + i + ")").addClass("target_active");
            
        } else {
            $(".timeline-group:nth-child(" + i + ")").removeClass("timeline_active");
            $(".target:nth-child(" + i + ")").removeClass("target_active");
        }
    }
});

setTimeout(() => {
    for (i = 1; i <= count; i++) {
        $(".target:nth-child(" + i + ")").addClass("target" + i);
        $(".target" + i).attr("data-attr", i);
        $(".target" + i).attr("data-scoll", target * (i - 1));
    }
    $(".target").click(function () {
        var dataTarget = $(this).attr('data-attr');
        targest(dataTarget);
    });
}, 1000);
function targest(i) {
    if (i == 1) {
        $(window).scrollTop(0);
    } else {
        $(window).scrollTop(target * (i - 1));
    }
}
});