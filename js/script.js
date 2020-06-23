//intro page
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

var rotate=0;var isRotating=0;
var lock=1,stone=1;
window.onload=function(){ 
    var scHeight = $('#stoneContainer').height();
    var tanHeight = $('#tanishq-logo').height();
    var intro = $('#intro').height();
    var winHeight =  $(window).height();
    $('html,body').animate({scrollTop:0},10);
    optionTop =   winHeight - $('#customize').height();
    //$('#tanishq-logo').css('margin-top',(winHeight-tanHeight)/2);

    // $('#intro').css('margin-top',-tanHeight);
    
   // $('#optionContainer1').css('top',optionTop/2+"px");
   descTop =   winHeight-$('.descWrapper').height();
  // $('.descWrapper').css('top',descTop/2+"px");
        var scHeight = $('#stoneContainer').height();
        $('.pallets').css('height',Math.ceil(scHeight*10/9));
if(getCookie("flag").length){
    
    console.log("been here done that");
    $('#loader').hide();
    $('#wrapper').css('opacity',1);
}    
else{
   // $('.logo,.')
    $('#loader-gif').hide();
    $('#tanishq-logo').show();
    //$('#wrapper').css('opacity',1);
       setTimeout(function(){
           $('#tanishq-logo').addClass('close');
           setTimeout(function(){
                   $('#intro').addClass('animate');
                setTimeout(function(){
                    $('#loader').fadeOut(1200);

                   setTimeout(function(){

                         $('#wrapper').css('opacity',1);
                         setTimeout(function(){

                           // $('body').removeClass('nooverflow');
                            

                            },2000);
                    },1500);
        //         },5);
        //      },2);
        // },3);
                    
                },3000);
             },1000);
        },1000);
     createCookie("flag","flag",1);
 }


        border_btn();






 
};

function border_btn(){
    $('#id-customize-info,.border-btn-random').click(function () {

        $('.instruction-container').fadeOut(200);
        $('.pallets').css('visibility','visible').fadeIn(700).css('opacity', '1');
        $('.options2').fadeIn(200);


        setTimeout(function(){
            set_tictactoe()
        },1000);


    });
}
function set_tictactoe(){
    var _top = $('.options2').offset().top;
    var _left = $('#stoneDesc').offset().left;
    $('.tictactoe').css('top',_top+'px').css('left',_left+'px');
    $('.tictactoe').fadeIn(200);
}
$('.tweetcount').click(function(e){
    $('#tweetlogin').css('left',e.pageX-62+"px").show();


});


function isMobile(){
    return $(window).width() <=1024
}



// customize or randomize

function resizePallet(){

            var scHeight = $('#stoneContainer').height();

            $('.pallets').css('height',Math.ceil(scHeight*10/9));

            optionTop =   $(window).height() - $('#customize').height();
         //   $('#optionContainer1').css('top',optionTop/2+"px");
    //set_tictactoe()
    };

$(document).ready(function(){
    $(window).resize(resizePallet);    
    $('#livefeedvid,#tweetcolor,#tweetfeed').delay(2000).fadeIn(2000);
    $('#livefeed').fadeOut(2000);
    var scHeight = $('#stoneContainer').height();
    $('.pallets').css('height',Math.ceil(scHeight*10/9));
    $('#city').change(function(){    $('.address').hide();    var city = $(this).val(); $('.'+city).show(); });


$('.menu-dropdown').click(function(){
    $(this).toggleClass('open');
    $('nav').toggleClass('open');
});

/*($('nav').mouseleave(function(){
    setTimeout(function(){
        if($('.menu-dropdown').hasClass('open')){
            $('.menu-dropdown').removeClass('open');
            $('nav').removeClass('open');
            }
        
    },3000);
});*/

    $('#howto').click(function(){
        $('.hidden').fadeIn(100,function(){
            $('.pop_imgs').addClass('animate-popup')
        });
    });

    $('.overlay,.pclose').click(function(){
        $('.hidden').fadeOut(100,function(){
            $('.pop_imgs').removeClass('animate-popup')
        });
    });



});



var stoneCircle = $('#stoneContainer');
var lockCircle = $('#lockContainer');

var lockText = [
/*Yellow Gold Studded – */"A ring of studded yellow gold sparkles flawlessly on your hand",//
/*Rose Gold –*/ "A delicate ring of rose gold adds a feminine glow to your outfit",
/*Yellow Gold  – */"A ring of pure yellow gold adds the perfect touch of charm to your look",
/*White Gold studded –*/ "A scintillating ring of white gold studded shines brilliantly against your ensemble"
];

var stoneText = [

// #PaletteOchre @
"Cognac Quartz – Perfect for an afternoon at the coffee shop, the Cognac Quartz captures the serenity and sublime mood effortlessly. ",
// #PaletteBlue @
"Blue Topaz – Paired with an evening dress, the Blue Topaz captures your fun spirit as you dance the night away.",
// #PaletteGreen @
"Green Topaz – Fresh and spunky, the Green Topaz gives your look an exciting twist perfect for impulsive adventures.",
// #PaletteRed @
"Red Garnet – The deep intense tone  of the Red Garnet should be your pick for an evening out with the one you love. ",
// #PaletteBlack@
"Black Onyx – Pair the Black Onyx with a classic look and bring a sparkle of elegance to the occasion.",
//#PaletteLime @
"Lemon Topaz – Just right for that walk in the park on a pleasant winter afternoon, the Lemon Topaz captures the warmth of the moment perfectly.",
//#Palettepink @
"Pink Amethyst – With a blissful summer feel, the Pink Amethyst works elegantly with floral prints and classic pastels.",
//#PaletteOrange @
"Madeira Citrine – The Madeira Citrine is perfect for a Sunday brunch and is a perfect conversation starter.",
//#PalettePurple @
"Amethyst – As versatile as you are, the Amethyst is perfect for the confident achiever look you want."
];




function changeBg(){
    if(stone==0 || lock==0){return;}
        isRotating = 0;
        $('#stoneDesc,#lockDesc').addClass('show');
        $('.bgFixed div.active').removeClass('active').siblings().addClass('active'); 
        $('.descWrapper').show();
        setTimeout(function() {
          if(!isRotating){  $('.bgFixed').css('opacity',1);}
        },2000)
        
    
}




$('.optionClose').click(function(){
    $('#optionContainer1').addClass('çlose');
});


function rotateInit(){
    rotate=1;
    $('.stone,.lock').trigger('mouseout');
    $('#optionContainer1').fadeOut(100);
    $('.options2').fadeIn(2200);
    
    $('#lockContainer').removeClass('animate');
    $('.bgFixed').css('opacity',0);

    $('#stoneDesc,#lockDesc').removeClass('show');
    $('.descWrapper').hide();
    $('.bgFixed div.active').attr('src','');
};
$('.stone,.lock').mouseover(function(e){
    $('.hoverdiv').addClass('active').css({"left":(e.pageX-100)+"px","top":(e.pageY-100)+"px"}).text($(this).attr("data-text"));
}).mouseout(function(){
    $('.hoverdiv').removeClass('active');
});


$('.stone').click(function(){
    if(isRotating==1){return;}
        isRotating = 1;
    rotateInit();
    $('.options2 div').removeClass('active');
    $('.options2 .customize').addClass('active');

        $('.pallets svg').css('display','none');
        var color = $(this).attr('data-color');
        var index = $(this).index();
        var circle = $(this).closest('.circle');
        var active = circle.find('.active').removeClass('active');
        var curActive =  circle.attr('data-active');
        var change  =index-curActive;
        var deg,plus=true;
        if (change<0){
            plus =false;
        }
        change= Math.abs(change);
        change = 40*((change)<5?change:change-9);
        if(plus){
        deg = parseInt(circle.attr('data-rotate'))-change;
        }else{
            deg = parseInt(circle.attr('data-rotate'))+change;
        }   
        console.log(deg);
        txt = stoneText[index-1];
        $('#stoneDesc span').text(txt);

        circle.attr('data-active',index);
        circle.attr('data-rotate',deg);
        stone = $(this).attr('data-stone');
        var transTime = (Math.abs(change/40))*0.5;
        transTime = (transTime<=0.5)?0.8:transTime;
        setTimeout(function(){
        
        $('.pallets svg *').attr('fill',color);
        if(stone>0){
            $(this).addClass('active');
            $('.pallets svg').fadeIn(10);
            $('.stoneFixed img.active').removeClass('active').siblings().attr('src','images/stones/stone'+stone+'.png').addClass('active');
        }
        $('#lockContainer').css('opacity',1);
        changeBg();    
            if(lock == 0){
                $('#lockContainer').addClass('animate');
            }
        },transTime*1000-100);
        $('.bgFixed div:not(.active) img').attr("src","images/illustrations/ils-s"+stone+"-l"+lock+".png");
        circle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+deg+'deg);-webkit-transform:rotateZ('+deg+'deg);-o-transform:rotateZ('+deg+'deg);-moz-transform:rotateZ('+deg+'deg);');    
    });


    $('.lock').click(function(){
        if(isRotating==1){return;}
        isRotating = 1;
        rotateInit();
        $('.options2 div').removeClass('active');
        $('.options2 .customize').addClass('active');
        var deg = $(this).attr('data-rotate');
        lock = $(this).attr('data-lock');
        $('.lockFixed img').attr('src','images/locks/lock'+lock+'.png');
        txt = lockText[$(this).index()-1];
        
        setTimeout(function(){
            $('#lockDesc span').text(txt);
            $('#lockDesc').addClass('show');
            $('#stoneDesc').addClass('show');
        $(this).closest('.circle').find('.active').removeClass('active');
        $(this).addClass('active');
        $('.lockFixed img:not(.active)').attr('src','images/locks/lock'+lock+'.png');
        
        changeBg();    
        },800);
        $('.bgFixed div:not(.active) img').attr("src","images/illustrations/ils-s"+stone+"-l"+lock+".png");
        $(this).closest('.circle').attr('style','transform:rotateZ('+deg+'deg);-webkit-transform:rotateZ('+deg+'deg);-moz-transform:rotateZ('+deg+'deg);-o-transform:rotateZ('+deg+'deg);');    
        spanDeg = -deg;
        lockCircle.find('.lock').attr('style','transform:rotateZ('+spanDeg+'deg);-webkit-transform:rotateZ('+spanDeg+'deg);-o-transform:rotateZ('+spanDeg+'deg);-moz-transform:rotateZ('+spanDeg+'deg);');
    });

$('#customize,.customize').click(function(){
    $('.pallets').css('visibility','visible').fadeIn(700).css('opacity',1);

    $('.options').removeClass('active');
    $('.options2 div').removeClass('active');
    $('#optionContainer1').fadeOut(100);
    $('.options2').fadeIn(2200);
    $('.options2 .customize').addClass('active');
    $('#stoneContainer').addClass('animate');

});

$('#randomize,.randomize,.border-btn-random').click(function(){
    if(isRotating==1){return;}
    isRotating = 1;
    $('.instruction-container').fadeOut(200);
    rotateInit();

    $('.tictactoe').fadeIn(200);
    $('.pallets').css('visibility','visible');
    $('.options2').fadeIn(2200);
    $('.options2 div.active').removeClass('active');
    $('.randomize').addClass('active');
    $('.pallets svg').css('display','none');
    $('.options').removeClass('active');
    $(this).addClass('active');
   // $('.stone,.lock').unbind('click');

    var stoneIndex= Math.ceil(9*Math.random());
    var lockIndex= Math.ceil(4*Math.random());

    var stoneDeg = -(360*Math.round(Math.random()))-(stoneIndex-1)*40;
    var lockDeg = (360*Math.round(Math.random()))-(lockIndex-1)*90;

    stoneCircle.attr({'data-rotate':stoneDeg,'data-active':stoneIndex});
    lockCircle.attr({'data-rotate':lockDeg,'data-index':lockIndex});
    stone = stoneIndex;
    lock= lockIndex;

    
    $('.stone.active,.lock.active').removeClass('active');     

    var transTime = (Math.abs(stoneDeg/40))*0.5;
    transTime = (transTime<=0.5)?0.8:transTime;
    setTimeout(function(){
            
        stoneColor = stoneCircle.find('.stone:nth-child('+(stoneIndex+1)+')').addClass('active').attr('data-color');
        lockCircle.find('.lock:nth-child('+(lockIndex+1)+')').addClass('active');
          
        $('#stoneDesc span').text(stoneText[stone-1]);        
       $('#lockDesc span').text(lockText[lock-1]);

        $('.desc').addClass('show');
        $('.pallets svg *').attr('fill',stoneColor)
        $('.pallets svg').fadeIn(10);
        $('.stoneFixed img:not(.active)').attr('src','images/stones/stone'+stoneIndex+'.png');
        $('.lockFixed img:not(.active)').attr('src','images/locks/lock'+lockIndex+'.png');
        $('.stoneFixed img.active,.lockFixed img.active').removeClass('active').siblings().addClass('active');
        console.log(stone+" "+ lock);
        changeBg();    
    },transTime*1000-100);
    $('.bgFixed div:not(.active) img').attr("src","images/illustrations/ils-s"+stone+"-l"+lock+".png");
    
    console.log(transTime+" "+stone+" "+lock);
    //spanDeg = -lockDeg;
    stoneCircle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+stoneDeg+'deg);-webkit-transform:rotateZ('+stoneDeg+'deg);-o-transform:rotateZ('+stoneDeg+'deg);-moz-transform:rotateZ('+stoneDeg+'deg);');
    lockCircle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+lockDeg+'deg);-webkit-transform:rotateZ('+lockDeg+'deg);-o-transform:rotateZ('+lockDeg+'deg);-moz-transform:rotateZ('+lockDeg+'deg);');
    //lockCircle.find('.lock').attr('style','transform:rotateZ('+spanDeg+'deg);-webkit-transform:rotateZ('+spanDeg+'deg);-o-transform:rotateZ('+spanDeg+'deg);-moz-transform:rotateZ('+spanDeg+'deg);');
});




//Ameer
var instruction_slide = function(){
    var icontainer = $('.icontainer');
    return {

        init : function(){
            _t = this;
           //if(this.ismobile()){
               $('.info-btn').click(_t.show);
           //}
           // else {
               //$('.info-btn').mouseenter(this.show).mouseleave(this.hide);
          // }
        },
        show : function(){
            var _this = $(this);
            if(_this.hasClass('showing-info')){
                _t.hide();
            }
            else{
                var info_class = _this.attr('data-info');
                _this.addClass('showing-info');
                icontainer.addClass(info_class);
            }

                /*$('.border-btn').click(function () {
                    $('.instruction-container').fadeOut(200);
                    $('.pallets').css('visibility','visible').fadeIn(700).css('opacity', '1');
                    $('.options2').fadeIn(200);
                });*/

        },
        hide : function(){
            $('.info-btn').removeClass('showing-info');
            icontainer.removeClass('customize-info');
            icontainer.removeClass('randomize-info');
        },
        ismobile:function(){
                return $(window).width() <=1024
        }
    };

}();

$(document).ready(function(){
        $('.screen-height').height(screen_heigth());


       instruction_slide.init();

      //  $('.info-btn')
});

$(window).resize(function(){
    $('.screen-height').height(screen_heigth());
});

var screen_heigth = function(){
    var sh;
    var _window = $(window);
    if(_window.width() > 640){
        sh = _window.height();
    }
    else{
        sh = _window.height()/2;
    }
    return sh/* - $('header').height()*/;
};

