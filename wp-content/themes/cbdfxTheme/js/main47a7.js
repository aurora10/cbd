jQuery(document).ready(function ($) {

    // recalculate_header();

    // calculate_mega_menu_positioning();

	$( '.button-social-login-email' ).on( 'click', function() {
		$( '#customer_login' ).toggleClass( 'd-none' );
	} );

	if ( typeof wpApiSettings !== 'undefined' ) {
		$initialOffset = Number( wpApiSettings.offset );
		$offset = Number( wpApiSettings.offset );
	}

	$( '#reviews .bear-load-reviews-btn button' ).on( 'click', function() {
		// console.log("Button clicked");

		const $thisbutton = $( this );
		if ( ! $thisbutton.hasClass( 'add-in-progress' ) ) {
			$thisbutton.data( 'button-text', $thisbutton.text() );
			buttonWidth = $thisbutton.outerWidth();
			$thisbutton.css( { 'min-width': buttonWidth } );
			$thisbutton.text( '' );
			$thisbutton.append( '<span class="fas fa-spin fa-spinner"></span>' );
			$thisbutton.addClass( 'add-in-progress' );

			// $('.bear-loader').show();
		}

		$.ajax( {
			url: wp_ajax_object.ajaxurl,
			method: 'POST',
			dataType: 'html',
			data: {
				action: 'yotpo_get_more_reviews',
				post_id: wpApiSettings.post_id,
				offset: $offset,
				per_page: wpApiSettings.per_page,
				// 'nonce' : wpApiSettings.nonce

			},
			// beforeSend: function (xhr) {
			//     xhr.setRequestHeader("X-WP-Nonce", wpApiSettings.nonce);
			// },
		} ).done( function( response ) {
			if ( $thisbutton.hasClass( 'add-in-progress' ) ) {
				$thisbutton.removeClass( 'add-in-progress' );
			}
			$thisbutton.find( '.fa-spinner' ).remove();
			$thisbutton.text( 'Load more reviews' );

			// console.log( response );
			if ( response !== '0' ) {
				$( '#reviews .bear-load-reviews-btn' ).before(
					response
				);
				$offset += $initialOffset;
				// console.log($offset);
			} else {
				$( '#reviews .bear-load-reviews-btn' ).addClass(
					'invisible'
				);
			}
		} );
	} );

	// Handle Load More Questions Button
	$( '#questions .bear-load-reviews-btn button' ).on( 'click', function() {
		// console.log("More Questions clicked");

		const $thisbutton = $( this );
		if ( ! $thisbutton.hasClass( 'add-in-progress' ) ) {
			$thisbutton.data( 'button-text', $thisbutton.text() );
			buttonWidth = $thisbutton.outerWidth();
			$thisbutton.css( { 'min-width': buttonWidth } );
			$thisbutton.text( '' );
			$thisbutton.append( '<span class="fas fa-spin fa-spinner"></span>' );
			$thisbutton.addClass( 'add-in-progress' );
		}

		$.ajax( {
			url: wp_ajax_object.ajaxurl,
			method: 'POST',
			dataType: 'html',
			data: {
				action: 'yotpo_get_more_questions',
				post_id: wpApiSettings.post_id,
				offset: $offset,
				per_page: wpApiSettings.per_page,
				// 'nonce' : wpApiSettings.nonce
			},
			// beforeSend: function (xhr) {
			//     xhr.setRequestHeader("X-WP-Nonce", wpApiSettings.nonce);
			// },
		} ).done( function( response ) {
			// console.log( response );

			if ( $thisbutton.hasClass( 'add-in-progress' ) ) {
				$thisbutton.removeClass( 'add-in-progress' );
			}
			$thisbutton.find( '.fa-spinner' ).remove();
			$thisbutton.text( 'Load more questions' );

			if ( response !== '0' ) {
				$( '#questions .bear-load-reviews-btn' ).before(
					response
				);
				$offset += $initialOffset;
				// console.log($offset);
			} else {
				$( '#questions .bear-load-reviews-btn' ).addClass(
					'invisible'
				);
			}
		} );
	} );

	const vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );
	//BEGIN handle changes in the product variations ratios applying into the woocommerce dropdowns
	//select default option
	$( $( '.variation-radios input[type=radio]:checked' ).prop( 'labels' ) ).addClass( 'selected' );
	//apply changes to label and hidden dropdown when the radios change
	$( document ).on( 'change', '.variation-radio-container input', function() {
		$( 'select[name="' + $( this ).attr( 'name' ) + '"]' ).val( $( this ).val() ).trigger( 'change' );
		$( '.variation-radio-container' ).find( 'label' ).removeClass( 'selected' );
		const label = $( this ).prop( 'labels' );
		$( label ).addClass( 'selected' );
		movePriceToTop();
	} );
	$( document ).on( 'change', '.variation-radios input', function() {
		$( 'select[name="' + $( this ).attr( 'name' ) + '"]' ).val( $( this ).val() ).trigger( 'change' );
		$( this ).parent( '.variation-radios' ).find( 'label' ).removeClass( 'selected' );
		const label = $( this ).prop( 'labels' );
		$( label ).addClass( 'selected' );
		movePriceToTop();
	} );
	$( document ).on( 'woocommerce_update_variation_values', function() {
		$( '.variation-radios input' ).each( function( index, element ) {
			$( element ).removeAttr( 'disabled' );
			const thisName = $( element ).attr( 'name' );
			const thisVal = $( element ).attr( 'value' );
			if ( $( 'select[name="' + thisName + '"] option[value="' + thisVal + '"]' ).is( ':disabled' ) ) {
				$( element ).prop( 'disabled', true );
			}
		} );
	} );
	//END handle changes in the product variations ratios applying into the woocommerce dropdowns

	//BEGIN handle click in the reviews link send the scroll to the element
	$( document ).on( 'click', '.woocommerce-review-link', function( e ) {
		e.preventDefault();
		$( 'a[href="#reviews"' ).trigger( 'click' );
		$( 'html, body' ).animate( { scrollTop: $( '#bear-reviews-section' ).offset().top }, 1000 );
	} );
	//END handle click in the reviews link send the scroll to the element


    //BEGIN handle click mobile category read more description
    $(document).on('click', '#bear-read-more', function (e) {
        e.preventDefault();
        if($('.bear-category-description-text').hasClass('collapsed')){
            $('.bear-category-description-text').removeClass('collapsed');
            $(this).removeClass('active');
        }else{
            $('.bear-category-description-text').addClass('collapsed');
            $(this).addClass('active');
        }
    });
    //END handle click mobile category read more description

	//BEGIN handle changing quantity using the "fake" plus and minus
	$( '.product .btn-plus, .product .btn-minus' ).on( 'click', function( e ) {
		e.preventDefault();
		const isNegative = $( e.target ).closest( '.btn-minus' ).is( '.btn-minus' );
		const input = $( e.target ).closest( '.input-group' ).find( 'input' );
		if ( input.is( 'input' ) ) {
			input[ 0 ][ isNegative ? 'stepDown' : 'stepUp' ]();
			input.trigger( 'change' );
			if ( $( 'body' ).hasClass( 'is-static-bundle-variations' ) ) {
				// console.log("is static");
				updateTotalPriceStaticBundleVariation( input.val() );
			} else if( $( 'body' ).hasClass( 'is-static-bundle' ) ) {
				// console.log("is static");
				updateTotalPriceStaticBundle( input.val() );
			} else {
				updateTotalPrice( input.val() );
			}
		}
	} );

	//END handle changing quantity using the "fake" plus and minus

	// BEGIN open and close answers to questions
	$( '#questions .open-answer' ).click( function( e ) {
		e.preventDefault();

		$answersContainer = $( this ).next( '.answer-container' );
		$answers = $answersContainer.find( '.single-answer-container' );

		$.each( $answers, function() {
			$( this ).toggleClass( 'd-none' );
		} );
	} );
	// END open and close answers to questions

	// when clicking on the "Write a Review" button, we need to hide "Ask A Question" section
	$( '.single-product-write-review' ).click( function() {
		// if add question is open, we need to hide that
		if ( ! $( '.single-product-submit-question-wrapper' ).hasClass( 'd-none' ) ) {
			$( '.single-product-submit-question-wrapper' ).toggleClass( 'd-none' );
		}

		$( '.single-product-submit-review-wrapper' ).toggleClass( 'd-none' );
	} );

	// when clicking on the "Ask A Question" button, we need to hide "Write a Review" section
	$( '.single-product-submit-question' ).click( function() {
		// if add review is open, we need to hide that
		if ( ! $( '.single-product-submit-review-wrapper' ).hasClass( 'd-none' ) ) {
			$( '.single-product-submit-review-wrapper' ).toggleClass( 'd-none' );
		}

		$( '.single-product-submit-question-wrapper' ).toggleClass( 'd-none' );
	} );

	//BEGIN handle product images
	$( '.bear-image-thumb' ).on( 'click', function( e ) {
		e.preventDefault();
		const imageId = $( this ).data( 'image-id' );
		$( '.bear-images-full div' ).hide();
		$( '.bear-images-full div#image-' + imageId ).show();
	} );
	//END handle product images

	//BEGIN product mobile image slider
	//useTransform: false because a bug in chrome caused fonts to gets blurry if enabled
	$( '.bear-images-thumbs' ).slick( {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
		nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
		dots: true,
		mobileFirst: true,
		swipeToSlide: true,
		responsive: [ {
			breakpoint: 767,
			settings: 'unslick',
		} ],
	} );
	//END product mobile image slider

	//BEGIN related/upsells slider for product single only in desktop
	$( '.related .products' ).slick( {
		slidesToShow: 4.3,
		slidesToScroll: 1,
		autoplay: false,
		prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
		nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
		swipeToSlide: true,
		responsive: [ {
			breakpoint: 767,
			settings: 'unslick',
		} ],
	} );
	//END related/upsells slider for product single only in desktop

	// BEGIN init slider in products box featured - HOME
	ProductsBox.initSlider( $ );
	// END init slider in products box featured - HOME

	// BEGIN principal slider in HOME
	PrincipalHomeSlider.initSlider( $ );
	// END principal slider in HOME

	// BEGIN principal slider in HOME
	PrincipalHomeSlider.setImageDependSize( $ );
	// END principal slider in HOME

	// BEGIN slider may also you like
	ProductsBox.initSliderYouMayAlsoLike( $ );
	// END slider may also you like

	// BEGIN slider Home instagram
	HomeInstagram.initSlider( $ );
	// END slider Home instagram

	// BEGIN init open menu
	MainMenuExtended.initOpenMenu( $ );
	// END init open menu

	// BEGIN set the position top fo menu extended
	MainMenuExtended.setPositionOfMenu( $ );
	// END set the position top fo menu extended

	// BEGIN if click out of menu, close it
	MainMenuExtended.closeMenuDesktop( $ );
	// END if click out of menu, close it

	// BEGIN Drowpdown menu in mobile
	MainMenuExtended.dropdownMenuMobile( $ );
	// END Drowpdown menu in mobile

	// BEGIN init apply code link
	CheckOutPage.initApplyCode( $ );
	// END init apply code link

	// BEGIN listen if dropdwon is collapsed
	CheckOutPage.checkArrowInShowOrder( $ );
	// END listen if dropdwon is collapsed

	// BEGIN print eyes after inputs passwords
	InputFields.inputPasswordEye( $ );
	// END print eyes after inputs passwords

	// BEGIN init all datepickers
	InputFields.initDatePickers( $ );
	// END init all datepickers

	// BEGIN init action to toggle Open class in search bar
	SearchBar.toggleSearchBar( $ );
	SearchBar.closeSearchBar( $ );
	// END init action to toggle Open class in search bar

	SearchBar.resetSearch( $ );

	// BEGIN toggle class "open" in Cart Box
	CartBox.toggleCartBox( $ );
	// END toggle class "open" in Cart Box

	// BEGIN toggle class "open" in Cart Box
	CartBox.closeCartBox( $ );
	// END toggle class "open" in Cart Box

	// BEGIN submit form contact effect loader
	ContactPage.submitFormEffect( $ );
	// END submit form contact effect loader

	// BEGIN Move contact information to menu in tablet footer.
	Footer.moveToMenuInTablet( $ );
	// END Move contact information to menu in tablet footer.

	// CHECK IF NAVIGATOR IS SAFARI
	const ua = navigator.userAgent.toLowerCase();
	if ( ua.indexOf( 'safari' ) != -1 ) {
		if ( ua.indexOf( 'chrome' ) == -1 ) {
			$( 'html' ).addClass( 'bear-safari' );
		}
	}

	// CHECK IF HAS ORIGIN IN URL
    var urlParams = new URLSearchParams(window.location.search);
    var origin = urlParams.get('origin');
    if(origin){
        $('#modalUKusers').modal('show')
    }else{
        $('#modalUKusers').modal('hide')
    }

	// BEGIND Init masonry for desktop menu
	// MainMenuExtended.initMasonry($)
	// END Init masonry for desktop menu

	// BEGIN Subscribe buttonEffects, open loader
	$( document ).on( 'click', '#bear-subcribe-content form .gform_footer button', function( e ) {
		$( '.bear-loader' ).show();

		setTimeout( function() {
			$( '.bear-loader' ).hide();
		}, 1000 );
	} );

	$( document ).on( 'click', '#bear-page-lab-reports-single .lab-report .right .content-batch .buttons .visor button', function() {
		const pdf = $( this ).data( 'href' );

		$( '#pdf-visor' ).attr( 'src', pdf );

		$( '#pdfModal' ).modal( 'show' );
	} );

	// BEGIN Modal sezzle
	$( document ).on( 'click', '.sezzle-promo img', function( e ) {
		e.preventDefault();

		$( '#modalSezzle' ).modal( 'show' );
	} );
	// END Modal sezzle

	// BEGIN calculate top of box cart, jona
	$( '#bear-been-featured .bear-logos .slider' ).slick( {
		autoplay: true,
		infinite: true,
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		swipeToSlide: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				},
			},
			// {
			//     breakpoint: 580,
			//     settings: {
			//         slidesToShow: 1,
			//     }
			// }
		],
	} );
	// END calculate top of box cart

	// BEGIN Effects buttons
	buttonEffects( $ );
	// END Effects buttons

	//UI feedback for add to cart on product loops
	$( document ).on( 'click', '.ajax_add_to_cart', function() {
		const $thisbutton = $( this );
		if ( ! $thisbutton.hasClass( 'add-in-progress' ) ) {
			$thisbutton.data( 'button-text', $thisbutton.text() );
			buttonWidth = $thisbutton.outerWidth();
			$thisbutton.css( { 'min-width': buttonWidth } );
			$thisbutton.text( '' );
			$thisbutton.append( '<span class="fas fa-spinner"></span>' );
			$thisbutton.addClass( 'add-in-progress' );
			$( '.bear-loader' ).show();
		}
	} );

	//UI feedback for add to cart on product loops
	$( 'body' ).on( 'added_to_cart', function() {
		const $thisbutton = $( '.add-in-progress' );
		$thisbutton.find( '.fa-spinner' ).remove();
		$thisbutton.append( '<span class="fas fa-check"></span>' );
		setTimeout( function() {
			$thisbutton.find( '.fa-check' ).remove();
			$thisbutton.text( $thisbutton.data( 'button-text' ) );
			$thisbutton.removeClass( 'add-in-progress' );
			$( '.bear-loader' ).hide();
			jQuery( 'html' ).scrollTop( 0 );
			setTimeout( function() {
				jQuery( 'body' ).toggleClass( 'cart-open' );
				jQuery( '#bear-content-cart' ).toggleClass( 'open' );
				jQuery( '.cart-overlay' ).toggleClass( 'open' );
			}, 100 );
		}, 200 );
	} );

	window.addEventListener( 'resize', function() {
		MainMenuExtended.setPositionOfMenu( jQuery );
		PrincipalHomeSlider.setImageDependSize( jQuery );
	} );

	$( '#bear-open-filters-desktop' ).on( 'click', function( ev ) {
		ev.preventDefault();
		$( '#bear-filters-modal' ).fadeIn( 300, function() {
			$( 'body' ).on( 'click', listenForOutsideClicks );
		} );
	} );

	$( '#bear-clear-filters' ).on( 'click', function( ev ) {
		$( '.bear-category-filter' ).prop( 'checked', false );
		$( 'input[name=products]' ).prop( 'checked', true );
		reloadCategories( ev );
	} );

	$( '.bear-category-filter' ).on( 'change', function() {
		if ( $( '.bear-category-filter:checked' ).length === 0 ) {
			$( 'input[name=products]' ).prop( 'checked', true );
		}
	} );

	$( '#bear-show-results' ).on( 'click', reloadCategories );
	$( '.bear-category-badges' ).on( 'click', 'span', function( ev ) {
		$( 'input[name=' + $( this ).data( 'slug' ) + ']' ).prop( 'checked', false );
		$( this ).remove();
		reloadCategories( ev );
	} );

	//BEGIN change dynamic price to be below the title and outside the variations module
	if ( $( '.bundle_form' ).length === 0 ) {
		movePriceToTop();
	} else {
		updateTotalPrice();
	}
	//END change dynamic price to be below the title and outside the variations module

	if ( $( '.bear-product-bundle' ).length > 0 ) {
		//handle product bundled with default layout (sequential selects with options for addons to main product)
		const bundleOptional = $( '.bear-bundled-optional' );
		if ( bundleOptional.length > 0 ) {
			const $bundledProducts = $( '.bundled_product:not(:first)' );
			const products = document.createElement( 'SELECT' );
			const option = document.createElement( 'option' );
			option.text = 'Select Vape Juice';
			option.value = '0';
			products.add( option );
			$bundledProducts.each( function() {
				const option = document.createElement( 'option' );
				const data = $( this ).find( '.bundled_item_cart_content' );
				if ( data.data( 'custom_data' ) !== undefined ) {
					option.text = data.data( 'title' );
					const productJson = data.data( 'custom_data' );
					option.value = productJson.bundled_item_id;
					products.add( option );
				}
			} );
			$( products ).addClass( 'bear-bundle-product-select' );
			bundleOptional.append( products );
			$( '.product' ).on( 'change', '.bear-bundle-product-select', productSelected );
			jQuery( '.bundled_product_summary select' ).on( 'change', optionsSelected );
		}
	}

	$( document ).on( 'click', '.woocommerce-remove-coupon', function( ev ) {
		ev.preventDefault();
		const $thisButton = $( this );
		jQuery.get( $thisButton.attr( 'href' ) ).done( function( data ) {
			jQuery( document.body ).trigger( 'wc_fragment_refresh' );
		} );
	} );
	setTimeout( function() {
		$( '.bear-cbdfx-price' ).show();
	}, 200 );

	//event listener for quantity inputs in mini cart
	$( document.body ).on( 'blur', '.woocommerce-mini-cart-item .qty', handleMiniCartQuantityChange );
	$( document.body ).on( 'keyup', '.woocommerce-mini-cart-item .qty', function( ev ) {
		if ( ev.keyCode === 13 ) {
			handleMiniCartQuantityChange( ev, this );
		}
	} );

	jQuery( 'div.woocommerce' ).on( 'change keyup mouseup', 'input.qty', function() { // keyup and mouseup for Firefox support
		refreshCart();
	} );

	$( document.body ).on( 'click', '.woocommerce-cart-form .btn', function( ev ) {
		ev.preventDefault();
		const $button = $( this );
		const $input = $button.siblings( 'input[type=number]' );
		let quantity = $input.val();
		if ( $button.hasClass( 'btn-plus' ) ) {
			quantity++;
		} else {
			quantity--;
		}
		$input.val( quantity );
		$input.trigger( 'change' );
	} );

	// ---------------------------------------------------------
	//    event listener for quicklinks drag scroll
	// ---------------------------------------------------------
	const quicklinks = jQuery( '#menu-quicklinks' );
	let isDown = false;
	let startX;
	let scrollLeft;

	quicklinks.on( 'click', ( e ) => {
		if ( startX != ( e.pageX - quicklinks.offset().left ) ) {
			// e.preventDefault();
		}
	} );

	quicklinks.on( 'mousedown', ( e ) => {
		isDown = true;
		startX = e.pageX - quicklinks.offset().left;
		scrollLeft = quicklinks.scrollLeft();
	} );

	quicklinks.on( 'mouseleave', ( e ) => {
		isDown = false;
	} );

	quicklinks.on( 'mouseup', ( e ) => {
		isDown = false;
	} );

	quicklinks.on( 'mousemove', ( e ) => {
		if ( ! isDown ) {
			return;
		}
		e.preventDefault();
		const x = e.pageX - quicklinks.offset().left;
		const walk = x - startX;
		quicklinks.scrollLeft( scrollLeft - walk );
	} );

	// ---------------------------------------------------------
	//   Finish event listener for quicklinks drag scroll
	// ---------------------------------------------------------
} );

function productSelected( ev ) {
	const allSelects = jQuery( '.bundled_product_summary select' );
	allSelects.hide();
	jQuery( '.bear-bundled-optional .bundled_product:not(:first) .quantity .qty' ).val( 0 );
	resetBundlePrice();
	if ( jQuery( this ).find( 'option:selected' ).val() !== '0' ) {
		jQuery( this ).addClass( 'selected' );
		const product = ( jQuery( ev.target ).find( 'option:selected' ) ).val();
		let variations = jQuery( '.bundled_item_' + product ).find( '.variations select' );
		//filter out selects with only one valid selection - those are selected by default and should remain hidden
		variations = variations.filter( function() {
			return jQuery( this ).find( 'option' ).length > 2;
		} );
		variations.val( '' );
		variations.trigger( 'change' );
		variations.show();
	} else {
		jQuery( this ).removeClass( 'selected' );
	}
	updateTotalPrice();
}

function optionsSelected( ev ) {
	const product = jQuery( '.bear-bundle-product-select option:selected' ).val();
	const productWrapper = ( jQuery( '.bundled_item_' + product ) );
	if ( jQuery( this ).find( 'option:selected' ).val() !== '' ) {
		jQuery( this ).addClass( 'selected' );
		//check if all the selects visible are also selected
		// if (jQuery('.bear-bundled-optional select.selected:visible').length === jQuery('.bear-bundled-optional select:visible').length) {
		productWrapper.find( '.quantity .qty' ).val( 1 );
		// }
	} else {
		jQuery( this ).removeClass( 'selected' );
		productWrapper.find( '.quantity .qty' ).val( 0 );
	}
	updateTotalPrice();
}

function movePriceToTop() {
	const price = jQuery( '.summary .price' );
	if ( price.text() === '' ) {
		setTimeout( movePriceToTop, 100 );
	} else {
		const priceElement = jQuery( '.bear-cbdfx-price' );
		const quantity = jQuery( '.quantity .qty' ).val();
		priceElement.html( price.html() );
		const priceText = ( price.find( 'ins' ).length > 0 ) ? price.find( 'ins' ).text() : price.text();
		const priceNum = ( priceText.match( /\d.+/ )[ 0 ] );
		const payments = ( ( priceNum * quantity ) / 4 );
		const totalElem = jQuery( '.bear-price-total' );
		if ( totalElem.length > 0 ) {
			totalElem.text( '$' + ( priceNum * quantity ).toFixed( 2 ) );
			jQuery( '.sezzle-promo span' ).text( '$' + payments.toFixed( 2 ) );
		} else {
			jQuery( '.sezzle-promo span' ).text( '$' + payments.toFixed( 2 ) );
		}
	}
}

var ProductsBox = {

	// init Slick Slider for home
	initSlider( $ ) {
		$( '.bear-featured-products .bear-container-products-box .slider' ).slick( {
			autoplay: false,
			infinite: true,
			prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
			nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
			mobileFirst: true,
			swipeToSlide: true,
		} );
	},

	// init slider YOU MAY ALSO LIKE
	initSliderYouMayAlsoLike( $ ) {
		$( '#bear-container-you-may-also-like .bear-container-fluid .slider' ).slick( {
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			infinite: true,
			prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
			nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
			arrows: true,
			swipeToSlide: true,
			// mobileFirst: true,
			responsive: [ {
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 1,
					centerMode: true,
				},
			} ],
		} );
	},

};

var HomeInstagram = {

	initSlider( $ ) {
		$( '#bear-instagram .slider' ).slick( {
			slidesToShow: 4.5,
			slidesToScroll: 1,
			arrows: false,
			autoplay: false,
			infinite: true,
			prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
			nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
			swipeToSlide: true,
			responsive: [ {
				breakpoint: 768,
				settings: {
					slidesToShow: 2.5,
				},
			} ],
		} );
	},

};

var Footer = {

	// Move contact us to menu in Tablet
	moveToMenuInTablet( $ ) {
		$( '#move-to-menu-tablet' ).appendTo( 'footer .for-tablet .content-menu-grid #menu-footer-desktop-menu' );
	},

};

var PrincipalHomeSlider = {

	// init Slick Slider for home
	initSlider( $ ) {
		$( '#bear-content-slider .principal-slider' ).slick( {
			autoplay: false,
			infinite: false,
			swipeToSlide: true,
			arrows: false,
		} );
	},

	setImageDependSize( $ ) {
		$( '#bear-content-slider .principal-slider .slick-slide' ).each( function( k, v ) {
			const images = $( v ).data( 'slides' );
			let imageSelected = '';

			if ( window.innerWidth > 991 ) {
				imageSelected = images.desktop;
			} else if ( window.innerWidth > 760 && window.innerWidth <= 991 ) {
				imageSelected = images.tablet;
			} else if ( window.innerWidth < 760 ) {
				imageSelected = images.mobile;
			}

			$( v ).find( 'img' ).attr( 'src', imageSelected );
		} );
	},

};

var MainMenuExtended = {

	initOpenMenu( $ ) {
		$( document ).on( 'click', 'header.site-header #main-menu-header a.open-menu, header.site-header .for-mobile button.open-menu', function( e ) {
			e.preventDefault();

			MainMenuExtended.toggleMenu();
		} );
	},

	setPositionOfMenu( $ ) {
		$( '#bear-sidebar' ).css( 'top', calculateTop() + 'px' );
	},

	setBurgerState( set ) {
		const burger = document.querySelector( 'header .for-mobile .burger-menu' );

		if ( set === undefined ) {
			burger.classList.toggle( 'open' );
		} else if ( ! set ) {
			burger.classList.remove( 'open' );
		} else {
			burger.classList.add( 'open' );
		}
	},

	toggleMenu() {
		const html = document.querySelector( 'html' );
		html.classList.toggle( 'menu-show' );

		if ( html.className === 'menu-show' ) {
			// setTimeout(function () {
			//     MainMenuExtended.initMasonry(jQuery);
			// }, 100);
		} else {
			// MainMenuExtended.destroyMasonry(jQuery);
		}

		MainMenuExtended.setBurgerState();
	},

	closeMenu() {
		const html = document.querySelector( 'html' );
		html.classList.remove( 'menu-show' );
		// MainMenuExtended.destroyMasonry(jQuery);
	},

	closeMenuDesktop( $ ) {
		let over = false;

		$( '#bear-sidebar' ).hover( function() {
			over = true;
		}, function() {
			over = false;
		} );

		$( document ).on( 'click', 'body', function( e ) {
			const safeElements = [ 'open-menu', 'burger-menu' ];
			let close = false;

			for ( let index = 0; index < safeElements.length; index++ ) {
				const element = safeElements[ index ];
				// if ( e.target.className.search( element ) !== -1 ) {
				if( jQuery(e.target).hasClass( element ) ){
					close = true;
				}
			}

			if ( ! over && ! close ) {
				MainMenuExtended.closeMenu();
				MainMenuExtended.destroyMasonry( $ );
			}
		} );
	},

	dropdownMenuMobile( $ ) {
		if ( window.innerWidth <= 768 ) {
			$( document ).on( 'click', '#bear-sidebar .bear-menu-expanded .has-children', function( e ) {
				if ( e.target.localName !== 'a' ) {
					e.preventDefault();

					$( this ).toggleClass( 'open' );

					setTimeout( () => {
						if ( $( this ).hasClass( 'open' ) ) {
							$( this ).find( '.fa-plus' ).addClass( 'fa-minus' ).removeClass( 'fa-plus' );
						} else {
							$( this ).find( '.fa-minus' ).addClass( 'fa-plus' ).removeClass( 'fa-minus' );
						}
					}, 150 );
				}
			} );
		}
	},

	initMasonry( $ ) {
		if ( window.innerWidth > 991 ) {
			$( '#bear-sidebar .bear-menu-expanded .bear-content-menu .item.has-children > ul' ).masonry( {
				itemSelector: '.bear-content-sub-menu',
				horizontalOrder: true,
			} ).addClass( 'initialized' );
		}
	},

	destroyMasonry( $ ) {
		if ( $( '#bear-sidebar .bear-menu-expanded .bear-content-menu .item.has-children > ul' ).hasClass( 'initialized' ) ) {
			$( '#bear-sidebar .bear-menu-expanded .bear-content-menu .item.has-children > ul' ).masonry( 'destroy' ).removeClass( 'initialized' );
		}
	},

};

var CheckOutPage = {

	initApplyCode( $ ) {
		const parent = '#bear-wrapper-checkout .body .promo-code';

		$( document ).on( 'click', parent + ' .apply-code-link', function( e ) {
			e.preventDefault();

			if ( $( this ).hasClass( 'open' ) ) {
				$( this ).removeClass( 'open' );
				$( parent + ' .apply-code-input' ).addClass( 'open' );
			}
		} );
	},

	checkArrowInShowOrder( $ ) {
		$( document ).on( 'click', '#bear-checkout-finish .body .show-order-container .order-head', function( e ) {
			if ( $( this ).attr( 'aria-expanded' ) === 'true' ) {
				$( this ).addClass( 'is-open' );
			} else {
				$( this ).removeClass( 'is-open' );
			}
		} );
	},

};

var CartBox = {

	toggleCartBox( $ ) {
		$( document ).on( 'click', '.toggle-cart-box, #menu-search-login-cart li a.cart-contents', function( e ) {
			if ( window.location.pathname !== '/cart/' ) {
				e.preventDefault();

				$( 'body' ).toggleClass( 'cart-open' );

				$( '#bear-content-cart' ).toggleClass( 'open' );

				$( '.cart-overlay' ).toggleClass( 'open' );
			}
		} );
	},

	closeCartBox( $ ) {
		$( document ).on( 'click', '.bear-close-cart-box, .cart-overlay', function( e ) {
			e.preventDefault();

			$( 'body' ).removeClass( 'cart-open' );

			$( '#bear-content-cart' ).removeClass( 'open' );

			$( '.cart-overlay' ).removeClass( 'open' );
		} );
	},

};

var InputFields = {

	inputPasswordEye( $ ) {
		$( 'input[type="password"]' ).addClass( 'password' ).parent().css( 'position', 'relative' );

		$( '<span></span>' ).insertAfter( 'input[type="password"]' );

		// now, init functionality
		InputFields.initTogglePasswordToText( $ );
	},

	// init functionality of change password to text
	initTogglePasswordToText( $ ) {
		$( document ).on( 'click', 'input.password +span', function() {
			if ( $( this ).prev( 'input' ).attr( 'type' ) === 'password' ) {
				$( this ).prev( 'input' ).attr( 'type', 'text' );
			} else {
				$( this ).prev( 'input' ).attr( 'type', 'password' );
			}
		} );
	},

	initDatePickers( $ ) {
		$( '.bear-date-mask' ).mask( '00/00/0000' );
	},

};

var SearchBar = {

	toggleSearchBar( $ ) {
		$( document ).on( 'click', '.toggle-search-bar', function( e ) {
			e.preventDefault();

			$( '#bear-search-bar-container' ).toggleClass( 'open' );
		} );
	},

	closeSearchBar( $ ) {
		let over = false;

		$( '.toggle-search-bar, #bear-search-bar-container' ).hover( function() {
			over = true;
		}, function() {
			over = false;
		} );

		$( document ).on( 'click', '*', function() {
			if ( ! over ) {
				$( '#bear-search-bar-container' ).removeClass( 'open' );
			}
		} );
	},

	resetSearch( $ ) {
		$( document ).on( 'click', '#bear-search-bar-container .left .delete-search', function( e ) {
			e.preventDefault();

			$( '#bear-search-bar-container .left input[type="text"]' ).val( '' );
		} );
	},

};

var ContactPage = {

	submitFormEffect( $ ) {
		$( document ).on( 'click', '.content-form form input[type="submit"]', function() {
			$( '.bear-loader' ).show();
			setTimeout( () => {
				$( '.bear-loader' ).hide();
			}, 1000 );
		} );
	},

};

function buttonEffects( $ ) {
	$( document ).on( 'mouseover', '.bear-button', function( e ) {
		const x = e.clientX - e.target.getBoundingClientRect().left;
		const y = e.clientY - e.target.getBoundingClientRect().top;

		const ripples = document.createElement( 'span' );
		ripples.style.left = x + 'px';
		ripples.style.top = y + 'px';

		this.appendChild( ripples );

		setTimeout( () => {
			ripples.remove();
		}, 1000 );
	} );
}

function updateQty( event, key, qty ) {
	event = event || window.event;
	event.preventDefault();
	jQuery.post( wp_ajax_object.ajaxurl, {
		action: 'modify_product_quantity',
		cart_item_key: key,
		cart_item_qty: qty,
	} ).done( function( data ) {
		//function updateCartFragment
		updateCartFragment();
	} );
}

function updateCartFragment() {
	$fragment_refresh = {
		url: woocommerce_params.ajax_url,
		type: 'POST',
		data: { action: 'woocommerce_get_refreshed_fragments' },
		success( data ) {
			if ( data && data.fragments ) {
				jQuery.each( data.fragments, function( key, value ) {
					jQuery( key ).replaceWith( value );
				} );

				if ( typeof( sessionStorage ) !== 'undefined' ) {
					sessionStorage.setItem( 'wc_fragments', JSON.stringify( data.fragments ) );
					sessionStorage.setItem( 'wc_cart_hash', data.cart_hash );
				}
				jQuery( 'body' ).trigger( 'wc_fragments_refreshed' );
			}
		},
	};

	//Always perform fragment refresh
	jQuery.ajax( $fragment_refresh );
}

function calculateTop() {


    // if mobile return the hardcoded 90px and dip
    if( window_width() < 768 ){
        return 90;
    }

	return jQuery('.header-wrapper').outerHeight() ? jQuery('.header-wrapper').outerHeight() : 142;
	
}

//AJAX add to cart for product pages, from:
//https://plugins.trac.wordpress.org/browser/woo-ajax-add-to-cart/trunk/assets/woo-ajax-add-to-cart.js

( function( $ ) {
	$.fn.serializeArrayAll = function() {
		const rCRLF = /\r?\n/g;
		return this.map( function() {
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		} ).map( function( i, elem ) {
			const val = jQuery( this ).val();
			if ( val == null ) {
				return val == null;
				//next 2 lines of code look if it is a checkbox and set the value to blank
				//if it is unchecked
			} else if ( this.type === 'checkbox' && this.checked === false ) {
				return { name: this.name, value: this.checked ? this.value : '' };
				//next lines are kept from default jQuery implementation and
				//default to all checkboxes = on
			}
			return jQuery.isArray( val )
				? jQuery.map( val, function( val, i ) {
					return { name: elem.name, value: val.replace( rCRLF, '\r\n' ) };
				} )
				: { name: elem.name, value: val.replace( rCRLF, '\r\n' ) };
		} ).get();
	};

	//add to cart on product page
	$( document ).on( 'click', '.single_add_to_cart_button:not(.disabled)', add_to_cart );
	$( document ).on( 'click', '.bear-buy-now-btn:not(.disabled)', add_to_cart );
}( jQuery ) );

function add_to_cart( e ) {
	e.preventDefault();
	const buyNow = ( ! jQuery( this ).hasClass( 'single_add_to_cart_button' ) );
	let $thisbutton = ( buyNow ) ? jQuery( '.single_add_to_cart_button' ) : jQuery( this ),
		$form = $thisbutton.closest( 'form.cart' ),
		data = $form.find( 'input:not([name="product_id"]), select, button, textarea' ).serializeArrayAll() || 0;

	//if the product is a bundle we don't need to change the name of the id

	jQuery.each( data, function( i, item ) {
		if ( item.name === 'add-to-cart' ) {
			item.name = 'product_id';
			if ( ! $thisbutton.hasClass( 'bundle_add_to_cart_button' ) ) {
				item.value = $form.find( 'input[name=variation_id]' ).val() || $thisbutton.val();
			}
		}
	} );

	jQuery( document.body ).trigger( 'adding_to_cart', [ $thisbutton, data ] );
	if ( buyNow ) {
		$thisbutton = jQuery( this );
	}
	let buttonText = '';
	let buttonWidth = 0;
	jQuery.ajax( {
		type: 'POST',
		url: woocommerce_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'add_to_cart' ),
		data,
		beforeSend( response ) {
			$thisbutton.removeClass( 'added' ).addClass( 'loading' );
			buttonText = $thisbutton.text();
			buttonWidth = $thisbutton.outerWidth();
			$thisbutton.css( { 'min-width': buttonWidth } );
			$thisbutton.text( '' );
			$thisbutton.append( '<i class="fas fa-spinner"></i>' );
		},
		complete( response ) {
			$thisbutton.addClass( 'added' ).removeClass( 'loading' );
			$thisbutton.find( '.fa-spinner' ).remove();
			$thisbutton.append( '<i class="fas fa-check"></i>' );
			setTimeout( function() {
				$thisbutton.find( '.fa-check' ).remove();
				$thisbutton.text( buttonText );
				if ( buyNow ) {
					window.location = '/checkout';
				}
			}, 200 );
		},
		success( response ) {
			if ( response.error && response.product_url ) {
				// window.location = response.product_url;
				return;
			}

			jQuery( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisbutton ] );
		},
	} );

	return false;
}

function reloadCategories( ev ) {
	ev.preventDefault();
	const $filtersButton = jQuery( '#bear-show-results' );
	if ( $filtersButton.text() !== '' ) {
		$filtersButton.data( 'text', $filtersButton.text() );
	}
	$filtersButton.text( '' );
	$filtersButton.append( '<span class="fas fa-spinner"></span>' );
	const order = jQuery( 'input[name=orderby]:checked' ).val();
	const categoriesElem = jQuery( '.bear-category-filter:checked' );
	const categories = categoriesElem.map( function() {
		return jQuery( this ).val();
	} ).get();
	jQuery.post( wp_ajax_object.ajaxurl, {
		action: 'query_filtered_categories',
		order,
		categories,
	} ).done( function( data ) {
		$filtersButton.find( '.fa-spinner' ).remove();
		$filtersButton.append( '<span class="fas fa-check"></span>' );
		setTimeout( function() {
			$filtersButton.find( '.fa-check' ).remove();
			$filtersButton.text( $filtersButton.data( 'text' ) );
		}, 500 );
		jQuery( 'ul.products' ).html( data );
		jQuery( '.woocommerce-result-count' ).text( jQuery( 'ul.products li' ).length + ' Items' );
		const selectedCats = jQuery( '.bear-category-filter:checked' );
		const selected = selectedCats.length;
		jQuery( '.bear-category-badges span' ).remove();
		selectedCats.each( function() {
			jQuery( '.bear-category-badges' ).append( '<span class="col-6" data-slug="' + jQuery( this ).val() + '">' + jQuery( this ).data( 'name' ) + '<span class="fas fa-times"></span></span>' );
		} );
		jQuery( '#bear-open-filters .bear-filter-counter' ).remove();
		if ( selected > 0 ) {
			jQuery( '#bear-open-filters' ).append( '<span class="bear-filter-counter">(' + selected + ')</span>' );
		}
		jQuery( '#bear-filters-modal' ).modal( 'hide' );
		jQuery( '#bear-filters-modal' ).fadeOut( function() {
			jQuery( 'body' ).off( 'click', listenForOutsideClicks );
		} );
	} );
}

function updateTotalPrice( quantity ) {
	const $totalPrice = jQuery( '.bear-price-total' );
	if ( $totalPrice.length > 0 && jQuery( '.bundle_form' ).length === 0 ) {
		let total = jQuery( '.bear-cbdfx-price ins span.amount' ).text();
		if ( total === '' ) {
			total = jQuery( '.bear-cbdfx-price span.amount' ).text();
		}
		if ( total === '' ) {
			total = $totalPrice.data( 'unit-price' );
			if ( total === undefined ) {
				jQuery( '.bear-cbdfx-price' ).text();
				total = $totalPrice.text();
				$totalPrice.data( 'unit-price', total );
			}
		}
		total = ( ( total.match( /\d.+/ )[ 0 ] ) * quantity ).toFixed( 2 );
		$totalPrice.text( '$' + total );
		jQuery( '.sezzle-promo span' ).text( '$' + ( total / 4 ).toFixed( 2 ) );
	} else {
		setTimeout( function() {
			const bundleScripts = getBundleScripts();
			if ( bundleScripts ) {
				const total = bundleScripts.price_data.totals.price;
				const discount = bundleScripts.price_data.totals.regular_price - total;
				jQuery( '.sezzle-promo span' ).html( wc_pb_price_format( total / 4 ) );
				jQuery( '.price .bear-savings' ).remove();
				jQuery( '.price .price-total' ).append( '<span class="bear-savings">You save ' + wc_pb_price_format( discount ) + ' (10%)</span>' );
			}
		}, 100 );
	}
}

// Special version to update total pricing on static bundles
function updateTotalPriceStaticBundleVariation( quantity ) {
	const bundleData = jQuery( '.bundle_data' ).data( 'bundle_form_data' );

	const regularPrice = bundleData.base_regular_price ? bundleData.base_regular_price : bundleData.subtotals.regular_price;
	const basePrice = ( bundleData.base_price != '' ) ? bundleData.base_price : bundleData.subtotals.price;

	// get the HTML version with the currency symbol and everything
	const regularPriceTotal = wc_pb_price_format( regularPrice * quantity ); // original price
	const basePriceTotal = wc_pb_price_format( basePrice * quantity ); // sale price


	// if the original price and sales price match, we need to change both prices
	if( basePrice != regularPrice ) {
		jQuery('del .woocommerce-Price-amount').html(regularPriceTotal);
		jQuery( 'ins .woocommerce-Price-amount' ).html( basePriceTotal );
	} else {
		// elements look different if not on sale
		jQuery( '.bear-cbdfx-price .woocommerce-Price-amount' ).html( basePriceTotal );
	}

	// update our sezzle text
	jQuery( '.sezzle-promo span' ).text( '$' + ( ( basePrice * quantity ) / 4 ).toFixed( 2 ) );

}

// Special version to update total pricing on static bundles
function updateTotalPriceStaticBundle( quantity ) {
	const bundleData = jQuery( '.bundle_data' ).data( 'bundle_form_data' );

	const regularPrice = bundleData.base_regular_price ? bundleData.base_regular_price : bundleData.subtotals.regular_price;
	const basePrice = ( bundleData.base_price != '' ) ? bundleData.base_price : bundleData.subtotals.price;

	// get the HTML version with the currency symbol and everything
	const regularPriceTotal = wc_pb_price_format( regularPrice * quantity ); // original price
	const basePriceTotal = wc_pb_price_format( basePrice * quantity ); // sale price


	// if the original price and sales price match, we need to change both prices
	if( basePrice != regularPrice ) {
		jQuery('del .woocommerce-Price-amount bdi').html(regularPriceTotal);
		jQuery( 'ins .woocommerce-Price-amount bdi' ).html( basePriceTotal );
	} else {
		// elements look different if not on sale
		jQuery( '.bear-cbdfx-price .woocommerce-Price-amount bdi' ).html( basePriceTotal );
	}

	// update our sezzle text
	jQuery( '.sezzle-promo span' ).text( '$' + ( ( basePrice * quantity ) / 4 ).toFixed( 2 ) );

}

function listenForOutsideClicks( event ) {
	if ( ! jQuery( event.target ).closest( '#bear-filters-modal' ).length && ! jQuery( event.target ).is( '#bear-filters-modal' ) ) {
		jQuery( '#bear-filters-modal' ).fadeOut( function() {
			jQuery( 'body' ).off( 'click', listenForOutsideClicks );
		} );
	}
}

function applyCoupon() {
	const coupon = jQuery( 'input[name=coupon_code]' ).val();
	jQuery.post( wp_ajax_object.ajaxurl, {
		action: 'add_coupon_minicart',
		couponcode: coupon,
	} ).done( function( data ) {
		jQuery( document.body ).trigger( 'wc_fragment_refresh' );
	} );
}

function getBundleScripts() {
	if ( typeof wc_pb_bundle_scripts !== 'undefined' ) {
		for ( const obj in wc_pb_bundle_scripts ) {
			return wc_pb_bundle_scripts[ obj ];
		}
	}
	return false;
}

function resetBundlePrice() {
	const bundleScripts = getBundleScripts();
	bundleScripts.update_totals();
}

function handleMiniCartQuantityChange( ev, target = undefined ) {
	const $qtyInput = ( target ) ? jQuery( target ) : jQuery( this );
	const itemKey = $qtyInput.data( 'cart-item-key' );
	updateQty( ev, itemKey, $qtyInput.val() );
}

let cartTimeout;

function refreshCart() {
	if ( cartTimeout !== undefined ) {
		clearTimeout( cartTimeout );
	} //cancel previously scheduled event
	cartTimeout = setTimeout( function() {
		jQuery( '[name="update_cart"]' ).trigger( 'click' );
	}, 1000 ); // schedule update cart event with 1000 miliseconds delay
}

function admin_bar_showing() {
	if ( jQuery( 'body.admin-bar' )[ 0 ] ) {
		return true;
	}
	return false;
}

function window_width() {
	return jQuery( window ).width();
}

/* Calculate the Fixed Header offset */
function recalculate_header() {
	// console.log( 'recalculating header' );
	if ( window_width() < 767 ) {
		headerHeight = jQuery( '.header-wrapper' ).outerHeight();

		if ( jQuery( '.content-wrapper' )[ 0 ] ) {
			jQuery( '.content-wrapper' ).css( { 'padding-top': headerHeight + 'px' } );
		}

		// .site-main
	} else {
		jQuery( '.content-wrapper' ).css( { 'padding-top': 0 } );
	}
}

jQuery( window ).resize( function() {
	// recalculate_header();
} );


jQuery(function () {
    jQuery('[data-toggle="popover"]').popover();
})


jQuery('.popover-dismiss').popover({
    trigger: 'focus'
})


function calculate_mega_menu_positioning(){

    var megamenu = jQuery('#menu-main li a.open-menu');  //record the elem so you don't crawl the DOM everytime
    // var topPosition = megamenu.position().top;
    var topPosition = megamenu.offset().top;
    var outerHeight = megamenu.outerHeight(true);
    // var bottom = el.position().top + el.outerHeight(true); //

    console.log( 'topPosition:' + topPosition );
    console.log( 'outerHeight:' + outerHeight );
    // console.log( "pos:" +bottom );
}