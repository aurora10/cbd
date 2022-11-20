jQuery(document).ready(function ($) {
    
    checkIfChanged($);

    visualChanges($);

    signInBox($);

    loginFromCheckout($);

    // $('#cfw-customer-info > h3:first-child').after('<p class="bear-already-account">Already have an account? <a href="/my-account/">Sign in</a></p>')

    // $('.bear-already-account').after(`
    //     <div class="bear-box-login">
    //         <div class="form-group">
    //             <input type="email" name="email" placeholder="Email Address*" />
    //         </div>
    //         <div class="form-group">
    //             <input type="password" name="password" placeholder="Password*" />
    //         </div>
    //         <div class="form-group">
    //             <input type="submit" value="Login" />
    //         </div>
    //         <p>Login is optional. You may continue with your order below.</p>
    //         <hr>
    //     </div>
    // `)

    $('#cfw-shipping-info-action .previous-button').appendTo('#cfw-shipping-info-action');
    $('#cfw-shipping-action .previous-button').appendTo('#cfw-shipping-action');
    $('#cfw-payment-action .previous-button').appendTo('#cfw-payment-action');
    $('#cfw-coupons').appendTo('#cfw-shipping-method-list')

    $('.shipping-details-link a').text('Edit')

})

function checkIfChanged($) {
    setInterval(function(){

        if($("#cfw-mobile-total .icon-bear-icon-cart").length === 0){
            console.log('adasd');
            visualChanges($);
        }
        
    }, 500);
}

function visualChanges($){

    $('#cfw-mobile-total').prepend('<span class="icon icon-bear-icon-cart"></span>');

    if(!$('#checkout').hasClass('updated')){
        $('#checkout').addClass('updated');
    }
   
}

function signInBox($){

    $(document).on('click', '.bear-already-account a', function(e){

        e.preventDefault();

        $('#cfw-login-details').hide()

        $('.bear-box-login').show()

    })

}

function loginFromCheckout($){

    $(document).on('click', '.bear-box-login .form-group button', function(e) {

        e.preventDefault()
        
        var email = $('.bear-box-login .form-group input[type="email"]').val()
        var password = $('.bear-box-login .form-group input[type="password"]').val()

        

    })

}