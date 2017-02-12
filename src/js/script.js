jQuery.noConflict()(function($) {
	'use strict';

	$(document).ready(function () {

		$('.content, .sidebar').theiaStickySidebar({
	      	additionalMarginTop: 30,
	      	additionalMarginBottom: 30
	    });

	    $('body').scrollspy({
	    	target: '#scrollspy', 
	    	offset: 100
	    });

		$('a[href^="#"]').on('click', function() {
		   
		    var id = $(this).attr('href');
		    scrollToAnchor(id);

		    return false;

		});

		function scrollToAnchor(aid){
		    var aTag = $(aid);
		    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
		}


	});


});