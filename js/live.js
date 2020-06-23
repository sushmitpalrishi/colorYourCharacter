var tweet_notset = 1;
	var ismobile = false;
	
	$(document).on("click", "#tweetBut", function(ex7) {
		ex7.preventDefault();
		var rid = $('#tweetSelect').val();
		var tweet_text = $('#tweet_text').val(); 
		dataString = 'tweet_text='+tweet_text+'&rid='+rid;
		$('#tweet').hide();
		//ajax call to publish tweet.
		$.ajax({
			type: 'POST',
			url: 'post_tweet.php',
			data: dataString,
			dataType: 'json',
			success: function(html) {
				var errorStatus = html['status'];
			    if(errorStatus=='200'){
					$("#errMsg").html(html['msg']).hide();	
					tweetDiv = '<div class="twt"><div class="twtname">'+html['full_name']+'</div><div class="handle">'+html['screen_name']+'</div><div class="twt-text">'+tweet_text+'</div></div>';
					$('#twtContainer').prepend(tweetDiv);
					$('#twtContainer').scrollTop(0);
					tweet_notset = 2;
			    }else if(errorStatus=='403'){
				    $("#errMsg").html(html['msg']);
			    } 				
			}
		});//end of ajax call.
		return false;
	});
	
	
	$(document).on("click", ".tw_login", function(ex7) {
		ex7.preventDefault();
		$('#tweet').css({'left':'50%','top':'50%'});
    	if(!tweet_notset){$('#tweet').show();}
		var data = $(this).attr('data-text'); 		
		var dataid = $(this).attr('data-id'); //$('#tweetSelect option[value="'+data+'"]').attr("selected", "selected");
		$('#tweetSelect').val(dataid);
		changeText(data); //console.log(tweet_notset);		
		switch(tweet_notset){
			default:
			case 0: break; 
			case 1: 
			        var link = base_url+'redirect.php?rbtb='+uniqueId;
					var win =  window.open(link, '', 'width=600,height=400,resizable=yes,scrollbars=yes');
					break;
			case 2:   
					$('#tweet').show();
					break;
		}
		/*if(tweet_notset===1){
			var link = '<?php echo BASEURL . 'redirect.php?rbtb='.uniqid(); ?>';
			var win =  window.open(link, '', 'width=600,height=400,resizable=yes,scrollbars=yes');
		}*/		
		return false;
	});  
	
	/*$(document).on("change", "#tweetSelect", function(ex) {
		ex.preventDefault();
		var data = $(this).val();
		changeText(data);
		return false;
	});*/
	function changeText(data){
		$('#tweet_text').val(data); 
	}
	//mathew twitter code
	function test_twitter() {
		tweet_notset = 0;//console.log("anything");		
		//$('tweetDiv').css('display','block');		
		$('#tweet').show();

		/*if(selID != "" && selID != null && typeof selID !== 'undefined') {
			$('#submitForm').submit();
		} else {
			window.location.href = baseurl + "index.php?rbtb=<?php echo uniqid(); ?>";
		}
		//window.location.href = baseurl + "index.php?rbtb=<?php echo uniqid(); ?>";*/		
	}		

$('#tweetcounter .tweetcount').click(function(e){
    $('#tweet').css({'left':(e.pageX)+"px",'top':(e.pageY-10)+"px"});
    if(!tweet_notset){$('#tweet').show();}
});
$('.select-count .tw_login').click(function(e){
    $('#tweet').css({'left':'50%','top':'50%'});
    if(!tweet_notset){$('#tweet').show();}
});

$('.tclose').click(function(){
	$('#tweet').hide();
});
window.onload = function(){
	
	$('#tanishq-logo').show();
    //$('#wrapper').css('opacity',1);
       setTimeout(function(){
           $('#tanishq-logo').addClass('close');
           setTimeout(function(){
                   $('#intro').addClass('animate');
           },3000);
       },3000);
	if(window.innerWidth<=768){
		$('#livefeed').delay(2000).fadeOut(2000);

		$('#livefeedvid').delay(2000).fadeIn(100);

		$('iframe').click(function(){
			$('#switchTab').delay(2000).fadeIn(2000);	
		});
		
		
	}
	else{
		$('#livefeedvid,#tweetcolor,#tweetfeed').delay(2000).fadeIn(2000);
    	$('#livefeed').fadeOut(2000);
	}


	$('#howto').trigger('click');
};
$('.menu-dropdown').click(function(){
    $(this).toggleClass('open');
    $('nav').toggleClass('open');
});
$('#livefeedvid').click(function(){

$('#tweet').hide();
$('.tab-block>div').removeClass('show');
$('.p_tab').removeClass('active');


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

$(document).ready(function(){
var win_wid = $(document).width();
	if (win_wid < 1000){
			if(document.querySelectorAll('.p_tab').length > 0){
			new ToggleClass(document.getElementById('switchTab'))
		}
	}

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