import $ from 'jquery'
$(document).ready(function(){
	$(".ser_content h2").on("click",function(){
	   $(this).parents(".ser_provider").toggleClass("active"); 
	});

	$(".quote-box h2").on("click",function(){
		$(this).parent(".quote-box").toggleClass("active");
	})
});
