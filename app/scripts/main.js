var nbDrop = 5;

// function to generate a random number range.
function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

var body = document.body,
    html = document.documentElement;

var height = 0; //Math.max( body.scrollHeight, body.offsetHeight,
    //html.clientHeight, html.scrollHeight, html.offsetHeight );

// function to generate drops
/*function createRain() {

    for( var i=1;i<nbDrop;i++) {
        var dropLeft = randRange(100,400);
        //var dropTop = randRange(0,height);
        //var hue = 'rgb(' + (randRange( 1, 120)) + ',' + (randRange( 40, 160)) + ',' + (randRange( 1, 255)) + ')';

        $('.rain').append('<div style="font-size: '+ randRange(18, 50)+'px" class="icomatic droplets" id="drop'+i+'">drop</div>');
        $('#drop'+i).css('left',dropLeft);
        $('#drop'+i).css('top',height);
    }

};*/
/*function doEmpty(){
    $('.rain').empty();
}*/
// Make it rain
setInterval(function(){
    //doEmpty();
    //createRain();
},10000);

/*$(function() {

    var a = $('a[href*=#]:not([href=#])');
    a.on('click',function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1);
                return false;
            }
        }
    });

});*/

function key(){
    $(document).keydown(function(e) {
       return e.keyCode;
    });
}

$(window).on('scroll', function(){
    if(key() == 32){
        console.log('------------------------->'+$(document).scrollTop());
    }
})

//to jump bubbles
$(document).ready(function() {

    //for Discovery
    var kids0 = $( '#zero' ).children( '.info-circle' );
    var kids1 = $( '#one' ).children( '.info-circle' );
    var kids2 = $( '#two' ).children( '.info-circle' );
    var kids3 = $( '#three' ).children( '.info-circle' );
    var kids4 = $( '#four' ).children( '.info-circle' );
    var kids5 = $( '#five' ).children( '.info-circle' );
    var kids6 = $( '#six' ).children( '.info-circle' );

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    //function to determine viewport visibility
    $.fn.isOnScreen = function(){
    
        var win = $(window);
        
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));  
    };

    //to call the function each time whenever a user scrolls the window

    $(window).scroll(function() {
        // for Navigation comes after scroll
        var secondaryNavigation = $('#secondary-navigation'), windows = $(this);
        if(windows.scrollTop() > 160){
            secondaryNavigation.addClass('translate-down').removeClass('translate-up');
        } else {
            secondaryNavigation.addClass('translate-up').removeClass('translate-down');
        }
    });
});

$(document).ready(function(){
    $("#myAffix").affix();
});

//Menu component to scroll
setTimeout(function() {
      $('#secondary-navigation ul li a').on('click', function(en){
            //getting value from name property
            var anchorName = en.currentTarget.name;
            var windowHeight = $(window).height();
            //Will work for every node in Menu - target id and name property of anchor tag should be same.
            if(anchorName != 'document'){
                console.log(anchorName);
                var target = '#' + anchorName;
                var topDistance = $(target).offset().top;
                $(document.body).animate({
                    'scrollTop':  topDistance - 150
                }, 1000);
            }
            //Will work only for top
            if (anchorName == 'document'){
                $(document.body).animate({
                    'scrollTop':  0
                }, 1000);
            }
      });
}, 1000);

if(window.location.pathname.split('/pages/')[1] == '/services/services.html'){
    (function fixCircle(){
        var pos = $('.circleContainer').offset().top;
        $(window).on('scroll', function(){
            //console.log(x.offset().top +'-------'+ main.scrollTop());
            if( pos <= $(document).scrollTop()){
                $('#display').addClass('affix');
            }else{
                $('#display').removeClass('affix');
            }
        });
    })();
}

$.fn.scrollStopped = function(callback) {
    $(this).scroll(function(){
        var self = this, $this = $(self);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,250,self));
    });
};

/*(function contentSwitcher(){
    $(window).on("scroll", function (e) {
        e.preventDefault();
        var pos = $('#display').offset();
        $('.getContent').each(function () {
            if ($(this).next().hasClass('getContent')){
                if (pos.top >= $(this).offset().top && pos.top <= $(this).next().offset().top) {
                    //$('#display').html($(this).find('.inner-circle').clone());
                    $('#display').html($(this).find('.inner-circle').clone());
                    //$('#display').find('.bounce').children().removeClass('hide');
                    return;
                }
            }
        });
    });
    $(window).scrollStopped(function(){
        var pos = $('#display').offset();
        $('.getContent').each(function () {
            if ($(this).next().hasClass('getContent')){
                if (pos.top >= $(this).offset().top && pos.top <= $(this).next().offset().top) {
                    $('#display').append($(this).find('.bounce').clone());
                    $('#display').find('.bounce').children().removeClass('hide');
                    return;
                }else if($('.circleContainer').offset().top >= $(document).scrollTop()){
                    $('#display').find('.bounce').children().remove();
                    //console.log($('.circleContainer').offset().top +' - '+ $(this).offset().top);
                }
            }
        });
    });
    $(document).ready(function () {
        $(window).trigger('scroll'); // init the value
    });
})();*/


$(window).on("changeContent", function (e) {
    e.preventDefault();
    var pos = $('#display').offset().top;
    $('.getContent').each(function () {
        if ($(this).next().hasClass('getContent')){
            if (pos >= $(this).offset().top && pos <= $(this).next().offset().top) {
                $('#display').html($(this).find('.inner-circle').clone());
                return;
            }
        }
    });
});

function findBreakPoint(){
    var arr = [];
    $('.getContent').each(function () {
        arr.push($(this).offset().top);
    });
    return arr;
}

(function evntTrgr(){
    var a = findBreakPoint();
    $(window).on('scroll', function(){
        var pos = $(document).scrollTop();
        $.each(a, function(){
            console.log(pos +' ------ '+ $(this)[0] +' || '+ ($(this)[0] + 50));
            if(pos >= parseInt($(this)[0], 10) && pos <= (parseInt($(this)[0], 10)+50)){
                $(document).trigger('changeContent');
                return;
            }
        });
    });
})();





/*$('#zero').find('.continue a').on('click', function(){
    $(document).scrollTop($(document).find($('#zero').find('.continue a').attr('href')).offset().top)
});*/
