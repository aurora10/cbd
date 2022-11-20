jQuery( document ).ready( function( $ ) {
	// INIT SLICK SLIDER IN HOME
	$( '.slider-home-medical-advisory' ).slick( {
		autoplay: false,
		slidesToShow: 1,
		prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
		nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
		mobileFirst: true,
		swipeToSlide: true,
		responsive: [ {
			breakpoint: 660,
			settings: {
				slidesToShow: 2,
			},

		} ],
	} );
} );
