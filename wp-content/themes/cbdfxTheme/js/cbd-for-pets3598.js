jQuery(document).ready(function ($) {
    $('.bear-slider-reviews .reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
        nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
        dots: false,
        mobileFirst: true,
        swipeToSlide: true,
    });

// SLIDER FOR PETS
    $('#bear-container-you-may-also-like .bear-container-fluid .slider-for-pets').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        infinite: true,
        prevArrow: '<span class="fas fa-chevron-left prev-arrow"></span>',
        nextArrow: '<span class="fas fa-chevron-right next-arrow"></span>',
        arrows: true,
        // centerMode: true,
        swipeToSlide: true,
        // mobileFirst: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 1,
                centerMode: true,
            },
        }],
    });
});