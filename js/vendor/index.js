$(function() {
          
	var $slider = $('#da-slider');

	// initialize the slider
	$slider.cslider();

	// initialize the slick
	if ($('.hard-slide').length) {
		$('.hard-slide').slick({
		    slidesToShow: 4,
	  		slidesToScroll: 4
		});
	};
	
	var $note = $('#note'),
	 initHtml = '请用50-100字简单说明产品用途';

	 if ($note.length>0) {
	 	initTextarea2();
	 };
	
	$note.focus(function(){
		initTextarea();
	}).keydown(function(){
		initTextarea2();
	}).blur(function(){
		initTextarea3();
	})

	function initTextarea(){
		if ($note.val().length == 0 || $note.val() == initHtml) {
			$note.val(initHtml).addClass('blank');
			$('#next-step').removeClass('primary').addClass('disabled').attr('disabled','disabled');
			$note.addClass('blank').val('');
		}else{
			$note.removeClass('blank');
			$('#next-step').addClass('primary').removeClass('disabled').removeAttr('disabled');
		}
	}

	function initTextarea2(){
		if ($note.val().length > 0 && $note.val() != initHtml) {
			$note.removeClass('blank');
			$('#next-step').addClass('primary').removeClass('disabled').removeAttr('disabled');
		}else{
			$note.addClass('blank');
			$('#next-step').removeClass('primary').addClass('disabled').attr('disabled','disabled');
		}
	}

	function initTextarea3(){
		if ($note.val().length > 0 && $note.val() != initHtml) {
			$note.removeClass('blank');
			$('#next-step').addClass('primary').removeClass('disabled').removeAttr('disabled');
		}else{
			$('#next-step').removeClass('primary').addClass('disabled').attr('disabled','disabled');
			$note.addClass('blank').val(initHtml);
		}
	}

	$(document).on('mouseenter','.has-menu,.has-ul',function(e){
		$this = $(this);
		$(this).children('ul').addClass('active');
	});

	$(document).on('mouseleave','.has-menu',function(e){
		$this = $(this);
		$('.has-menu').children('ul').removeClass('active');
	});

	$(document).on('mouseleave','.has-ul',function(e){
		$this = $(this);
		$('.has-ul').children('ul').removeClass('active');
	});

	//购买和定制
	$(document).on('click','.hard-list .actions .button',function(e){
		$this = $(this);
		$('.overlay').animate({
			'right':'0'
		});
		if($this.attr('class').match('diy')=='diy'){
			$('.form.diy').fadeIn();
			$('.form.diy').siblings('form').fadeOut(0);
		}

		$('#buy_img').attr("src",$this.parent().prev().prev().prev().attr("src"));
		$('#buy_product').text($this.parent().prev().prev().text());
		$('#buy_jieshao').text($this.parent().prev().text());
		e.preventDefault();
	});

	var $input = $('.diy.form input');

	if ($input.length>0) {
		checkSubmit()
	};
	
	$input.keydown(function(){
		checkSubmit()
	}).blur(function(){
		checkSubmit()
	});

	function checkSubmit(){
		var name = $('#name').val(),
			company = $('#company').val(),
			email = $('#email').val(),
			tel = $('#tel').val(),
			code = $('#code').val(),
			agree = $('#agree-argu').is(':checked');

		if (name.length == 0 || company.length == 0 || email.length == 0 || 
			tel.length == 0 || code.length == 0 ||  
			agree == 'false') {
			$('#submit-mul-form').removeClass('primary').addClass('disabled').attr('disabled','disabled');
		}else{
			$('#submit-mul-form').addClass('primary').removeClass('disabled').removeAttr('disabled');
		}
	}

	$(document).on('click','.close,.sure',function(e){
		$('.overlay').animate({
			'right':'-110%'
		});
		$('.succeed-info').fadeOut(0);
		e.preventDefault();
	});

	$(document).on('click','#submit-mul-form',function(e){
		var code_math = $("#code").val();
		$.post("/php/chk_code.php?act=math",{code:code_math},function(msg){
			if(msg==1){
				//document.getElementById('order_form').submit();
				$('.succeed-info').fadeIn();
				$.ajax({ 
				type: "POST", 
				url: "/php/order.php", 
				data: $('#order_form').serialize() + "&cpu=" + document.getElementById('span_cpu').innerText + "&size=" + document.getElementById('span_size').innerText+ "&interface=" + document.getElementById('interface').innerText + "&ant=" + document.getElementById('span_ant').innerText, //提交表单，相当于CheckCorpID.ashx?ID=XXX 
				}); 

				$("#getcode_math").attr("src",'/php/code_math.php?' + Math.random());
				document.getElementById('name').value=""
				document.getElementById('company').value=""
				document.getElementById('usage').value=""
				document.getElementById('email').value=""
				document.getElementById('tel').value=""
				document.getElementById('code').value=""
			}else{
				alert("验证码错误，请重新填写！");
				$("#getcode_math").attr("src",'/php/code_math.php?' + Math.random());
				document.getElementById('code').value=""
			}
		});		
	});

	$(document).on('click','#submit-buy-form',function(e){
		var code_math = $("#code").val();
		$.post("/php/chk_code.php?act=math",{code:code_math},function(msg){
			if(msg==1){
				//document.getElementById('buy_form').submit();
				$('.succeed-info').fadeIn();
				$.ajax({ 
				type: "POST", 
				url: "/php/buy.php", 
				data: $('#buy_form').serialize() + "&product=" + $('#buy_product').text(), //提交表单，相当于CheckCorpID.ashx?ID=XXX 
				}); 

				$("#getcode_math").attr("src",'/php/code_math.php?' + Math.random());
				document.getElementById('name').value=""
				document.getElementById('company').value=""
				document.getElementById('usage').value=""
				document.getElementById('email').value=""
				document.getElementById('tel').value=""
				document.getElementById('code').value=""
			}else{
				alert("验证码错误，请重新填写！");
				$("#getcode_math").attr("src",'/php/code_math.php?' + Math.random());
				document.getElementById('code').value=""
			}
		});		
	});

	//select
	jQuery.fn.select = function(options){ 
        return this.each(function(){ 
            var $this = $(this); 
            var $shows = $this.find('.shows'); 
            var $selectOption = $this.find('.selectOption'); 
            var $el = $this.find('ul > li'); 
                                       
            $this.click(function(e){ 
                $(this).toggleClass('zIndex active'); 
                $(this).children('ul').toggleClass('dis'); 
                e.stopPropagation(); 
            }); 
               
            $el.bind('click',function(){ 
                var $this_ = $(this);
                var thisText = $this_.text();
                var radioInputArray = new Array();
                    
                $this.find('span').removeClass('gray'); 
                $this_.parent().parent().find('.selectOption').text(thisText); 
                switch(thisText){
					case 'MT7620N':
					  radioInputArray.push('flash-size3','ram2','ram3','ram4');
					  disableRadioInput(radioInputArray);
					  break;
					case 'MT7628AN':
					  radioInputArray.push('ram4');
					  disableRadioInput(radioInputArray);
					  break;
					case 'MT7688AN':
					  radioInputArray.push('ram4');
					  disableRadioInput(radioInputArray);
					  break;
					case 'Hi3516A':
					  radioInputArray.push('');
					  disableRadioInput(radioInputArray);
					  break;
					case 'Hi3518E':
					  radioInputArray.push('ram1','ram2','ram3','ram4');
					  disableRadioInput(radioInputArray);
					  break;
					case 'QCA9531':
					  radioInputArray.push('flash-size3','ram4');
					  disableRadioInput(radioInputArray);
					  break;
				}
            }); 
               
            $('body').bind('click',function(){ 
                $this.removeClass('zIndex'); 
                $this.find('ul').removeClass('dis');   	  
            });
        //eahc End   
        }); 
           
    }

    var disableRadioInput = function(radioInputArray) {
    	$('input[name="ram"], input[name="flash"]').attr('disabled', false);

    	for (i in radioInputArray) {
    		$('#' + radioInputArray[i]).attr('disabled', true);
    	};
    };

    var $sc = $('.selectContainer');
    if ($sc.length) $sc.select();

    //if display the aside menu
    if($('.left-aside').length){
	    $(window).scroll(function(){
	    	var winHeight = $(window).height()-50;  
	    	var toTop = $(document).scrollTop();
	    	if(toTop > winHeight){
	    		$('.left-aside').fadeIn();
	    	}else{
	    		$('.left-aside').fadeOut();
	    	}

	    	var pro1 = $('#wrtnode2r').offset().top,
	    		pro2 = $('#wrtnode2p').offset().top;
	    		//pro3 = $('#product3').offset().top,
	    		//pro4 = $('#product4').offset().top;

	    	//deside witch is the current link
	    	if(toTop < pro1){
	    		$('.left-aside li').eq(0).addClass("cur-panel").siblings().removeClass("cur-panel");
	    	}else if(toTop < pro2){
	    		$('.left-aside li').eq(1).addClass("cur-panel").siblings().removeClass("cur-panel");
	    	//}else if(toTop < pro3){
	    	//	$('.left-aside li').eq(2).addClass("cur-panel").siblings().removeClass("cur-panel");
	    	//}else if(toTop < pro4){
	    	//	$('.left-aside li').eq(3).addClass("cur-panel").siblings().removeClass("cur-panel");
	    	}else{
	    		$('.left-aside li').eq(2).addClass("cur-panel").siblings().removeClass("cur-panel");
	    	}
	    	
	    });
	}

    //aside
    $(document).on('click','.left-aside a',function(e){
    //$('.left-aside a').click(function(e){

		var href = $(this).attr("href");
		var pos = $(href).offset().top;

    	$("html,body").animate({scrollTop: pos}, 1000,function(){
			location.hash = href;
		});
		e.preventDefault();

	});

	$("#getcode_math").click(function(){
		$(this).attr("src",'/php/code_math.php?' + Math.random());
	});

});
