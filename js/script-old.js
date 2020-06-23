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


var lock=0,stone=0;
window.onload=function(){ 
    var scHeight = $('#stoneContainer').height();
    var tanHeight = $('#tanishq-logo').height();
    var intro = $('#intro').height();
    var winHeight =  $(window).height();
    $('html,body').animate({scrollTop:0},10);
    optionTop =   winHeight - $('#customize').height();
    $('#tanishq-logo').css('margin-top',(winHeight-tanHeight)/2);

     $('#intro').css('margin-top',-tanHeight);
    
   // $('#optionContainer1').css('top',optionTop/2+"px");
   descTop =   winHeight-$('.descWrapper').height();
   $('.descWrapper').css('top',descTop/2+"px");
        var scHeight = $('#stoneContainer').height();
        $('.pallets').css('height',Math.ceil(scHeight*10/9));
/*if(getCookie("flag").length){
    
    console.log("been here done that");
    $('body').removeClass('nooverflow');
    $('#tanishq-logo').addClass('close');
    $('#loader').hide();
    $('#wrapper').css('opacity',1);
}    
else{*/
    $('#tanishq-logo').css('margin-top',(winHeight-tanHeight)/2).show();
       setTimeout(function(){
            $('#tanishq-logo').addClass('close');
            setTimeout(function(){
                $('#intro').addClass('animate');   
                setTimeout(function(){
                    $('#loader').fadeOut(500);
                    setTimeout(function(){                    
                         $('#wrapper').css('opacity',1);
                         setTimeout(function(){  
                            $('body').removeClass('nooverflow');
                            
                //            $('.options2').fadeIn(2200); 
                            },2000);
                    },1500);
        //         },5);
        //      },2);
        // },3);
                    
                },3500);
             },2000);
        },3000);
    // createCookie("flag","flag",1);
// }

 
};
$('.tweetcount').click(function(e){
    $('#tweetlogin').css('left',e.pageX-62+"px").show();
    console.log(e.pageX);

});






// customize or randomize

function resizePallet(){

            var scHeight = $('#stoneContainer').height();
            
            $('.pallets').css('height',Math.ceil(scHeight*10/9));

            console.log("rr");

            optionTop =   $(window).height() - $('#customize').height();
         //   $('#optionContainer1').css('top',optionTop/2+"px");
    };

$(document).ready(function(){
    $(window).resize(resizePallet);    
    $('#livefeedvid,#tweetcolor,#tweetfeed').delay(2000).fadeIn(2000);
    $('#livefeed').fadeOut(2000);
    var scHeight = $('#stoneContainer').height();
    $('.pallets').css('height',Math.ceil(scHeight*10/9));
    $('#city').change(function(){    $('.address').hide();    var city = $(this).val();  console.log(city);  $('.'+city).show(); });


$('.menu-dropdown').click(function(){
    $(this).toggleClass('open');
    $('nav').toggleClass('open');
});

$('nav').mouseleave(function(){
console.log('mouseout');
    setTimeout(function(){
        if($('.menu-dropdown').hasClass('open')){
            $('.menu-dropdown').removeClass('open');
            $('nav').removeClass('open');
            }
        
    },3000);
});

});



var stoneCircle = $('#stoneContainer');
var lockCircle = $('#lockContainer');

var lockText = [
/*Yellow Gold Studded – */"A ring of studded yellow gold sparkles flawlessly on your hand",//
/*Rose Gold –*/ "A delicate ring of rose gold adds a feminine glow to your outfit",
/*Yellow Gold  – */"A ring of pure yellow gold adds the perfect touch of charm to your look",
/*White Gold –*/ "A scintillating ring of white gold shines brilliantly against your ensemble"
];

var stoneText = [

// #PaletteOchre @
"Cognac Quartz – A gentle yet striking accompaniment to your immaculate office wear, the cognac quartz gemstone has a good measure of sophistication.",
// #PaletteBlue @
"Blue Topaz – Paired with an evening dress with a hint of shimmer, the blue topaz gemstone is the ideal choice for an evening of regality.",
// #PaletteGreen @
"Green Topaz – When you’re feeling energetic and social, the green topaz gemstone will work as the ideal conversation starter.",
// #PaletteRed @
"Red Garnet – Celebrating a special bond with a special person calls for a deep red garnet gemstone that will sparkle in the candle light.",
// #PaletteBlack@
"Black Onyx – Paired with a classic combination, the black onyx gemstone is the perfect companion for the dress down look you love.",
//#PaletteLime @
"Lemon Topaz – A reflection of your serene and sublime mood, the lemon topaz gemstone captures your elegant persona effortlessly.",
//#Palettepink @
"Pink Amethyst – Spend a pristine summer day in floral prints and allow the pink amethyst gemstone to cheerfully catch the summer sun.",
//#PaletteOrange @
"Madiera Citrine – With a subtle glow on a sunny day, the madiera citrine gemstone accentuates your warm, affable personality.",
//#PalettePurple @
"Amethyst – Whether it’s a special occasion or an accessory to your ethnic chic ensemble, the amethyst gemstone captures your merry mood.",

];



function changeBg(){
    if(stone==0 || lock==0){return;}

        $('#stoneDesc,#lockDesc').addClass('show');
        $('.bgFixed div:not(.active) img').attr("src","images/illustrations/ils-s"+stone+"-l"+lock+".png");
        $('.bgFixed div.active').removeClass('active').siblings().addClass('active'); 
        $('.descWrapper').show();
        setTimeout(function() {
            $('.bgFixed').css('opacity',1);
        },2000)
        
    
}

$('.optionClose').click(function(){
    $('#optionContainer1').addClass('çlose');
});


function rotateInit(){
    $('.stone,.lock').trigger('mouseout');
    $('#optionContainer1').fadeOut(100);
    $('.options2').fadeIn(2200);
    
    $('#lockContainer').removeClass('animate');
    $('.bgFixed').css('opacity',0);

    $('#stoneDesc,#lockDesc').removeClass('show');
    $('.bgFixed div.active').attr('src','');
};
$('.stone,.lock').mouseover(function(e){
    console.log($(this).attr("data-text"));

$('.hoverdiv').addClass('active').css({"left":(e.pageX-100)+"px","top":(e.pageY-100)+"px"}).text($(this).attr("data-text"));
}).mouseout(function(){

    $('.hoverdiv').removeClass('active');
});
$('.stone:not(.active)').click(function(){
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
        circle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+deg+'deg);-webkit-transform:rotateZ('+deg+'deg);-o-transform:rotateZ('+deg+'deg);-moz-transform:rotateZ('+deg+'deg);');    
    });


    $('.lock').click(function(){
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
        $(this).closest('.circle').attr('style','transform:rotateZ('+deg+'deg);-webkit-transform:rotateZ('+deg+'deg);-moz-transform:rotateZ('+deg+'deg);-o-transform:rotateZ('+deg+'deg);');    
        spanDeg = -deg;
        lockCircle.find('.lock').attr('style','transform:rotateZ('+spanDeg+'deg);-webkit-transform:rotateZ('+spanDeg+'deg);-o-transform:rotateZ('+spanDeg+'deg);-moz-transform:rotateZ('+spanDeg+'deg);');
    });

$('#customize,.customize').click(function(){
    $('.options').removeClass('active');
    $('.options2 div').removeClass('active');
    $('#optionContainer1').fadeOut(100);
    $('.options2').fadeIn(2200);
    $('.options2 .customize').addClass('active');
    $('#stoneContainer').addClass('animate');

});

$('#randomize,.randomize').click(function(){
    rotateInit();
    $('.options2 div.active').removeClass('active');
    $('.randomize').addClass('active');

    

    $('.pallets svg').css('display','none');
    $('.options').removeClass('active');
    $(this).addClass('active');
   // $('.stone,.lock').unbind('click');

    var stoneIndex= Math.ceil(9*Math.random());
    var lockIndex= Math.ceil(4*Math.random());

    var stoneDeg = -(360*Math.round(2*Math.random()))-(stoneIndex-1)*40;
    var lockDeg = (360*Math.round(2*Math.random()))+(lockIndex-1)*90;

    stoneCircle.attr({'data-rotate':stoneDeg,'data-active':stoneIndex});
    lockCircle.attr({'data-rotate':lockDeg,'data-index':lockIndex});
    stone = stoneIndex;
    lock= lockIndex;

    
    $('.stone.active,.lock.active').removeClass('active');     

    var transTime = (Math.abs(stoneDeg/40))*0.5;
    transTime = (transTime<=0.5)?0.8:transTime;
    setTimeout(function(){
            
        stoneColor = stoneCircle.find('.stone:nth-child('+(stoneIndex+1)+')').addClass('active').attr('data-color');
        lockCircle.find('.lock:nth-child('+(lockIndex)+')').addClass('active');
          
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
    console.log(transTime+" "+stoneDeg+" "+lockDeg);
    spanDeg = -lockDeg;
    stoneCircle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+stoneDeg+'deg);-webkit-transform:rotateZ('+stoneDeg+'deg);-o-transform:rotateZ('+stoneDeg+'deg);-moz-transform:rotateZ('+stoneDeg+'deg);');
    lockCircle.attr('style','transition-duration: '+transTime+'s;-moz-transition-duration: '+transTime+'s;-webkit-transition-duration: '+transTime+'s;transform:rotateZ('+lockDeg+'deg);-webkit-transform:rotateZ('+lockDeg+'deg);-o-transform:rotateZ('+lockDeg+'deg);-moz-transform:rotateZ('+lockDeg+'deg);');
    lockCircle.find('.lock').attr('style','transform:rotateZ('+spanDeg+'deg);-webkit-transform:rotateZ('+spanDeg+'deg);-o-transform:rotateZ('+spanDeg+'deg);-moz-transform:rotateZ('+spanDeg+'deg);');
});

/*
var bcanvas,bcontext;
var logoImage = new Image();
var bgImage = new Image();
var ringImage = new Image();
var lockImage = new Image();
var stoneImage = new Image();



logoImage.src = 'images/logo.png';
ringImage.src = 'images/ring.png';
var cw=1200,ch=630;
bcanvas = document.createElement('canvas');
bcontext = bcanvas.getContext("2d");
bcanvas.setAttribute('width', 1200);
bcanvas.setAttribute('height', 630);

function saveShare(){
    
    bcontext.clearRect(0,0,cw,ch);
    
    bcontext.drawImage(0,0,cw,ch);
    bcontext.drawImage(logoImage,0,0,200,150,cw-300,30,200,150);// logo
    bcontext.drawImage(bgImage,0,0,600,600,300,15,600,600);//illustration
    bcontext.drawImage(ringImage,0,0,300,356,600,30,300,356);//ring
    bcontext.drawImage(lockImage,0,0,300,356,600,30,300,356);//lock
    bcontext.drawImage(stoneImage,0,0,300,356,600,30,300,356);//stone
    document.getElementById('optionContainer1').appendChild(bcanvas);
    var dataURL = bcanvas.toDataURL();

    $.ajax({
    type: "POST",
    url: "saveimage.php",
    data: { 
         imgBase64: dataURL,
         stone:"",
         lock:""
        }
    }).done(function(response) {//returns false or file name
        if(response!="false"){
            var loc =  window.location.origin+window.location.pathname;
            shref= loc+'?id='+response;
            $('.overlay').fadeIn(500).find('img#userimg').attr('src',dataURL);
            $('.share').show();         
            $('.share.twt').attr('data-href',shref);
        }
    else{console.log('bsaksalaa');}
});
}
function fbshare(){
    FB.ui(
    {
        method: 'share',
        href: shref,
    });
}

*/