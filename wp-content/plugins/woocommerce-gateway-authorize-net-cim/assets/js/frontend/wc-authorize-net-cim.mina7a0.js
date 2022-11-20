"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}(),_get=function e(t,a,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,a);if(void 0!==r){if("value"in r)return r.value;r=r.get;return void 0!==r?r.call(n):void 0}t=Object.getPrototypeOf(t);if(null!==t)return e(t,a,n)};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}!function(){var n=[].indexOf;jQuery(function(d){var t;function a(e){_classCallCheck(this,a);var t=_possibleConstructorReturn(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.handle_iframe_event=t.handle_iframe_event.bind(t),t.logging_enabled=e.logging_enabled,t.lightbox_enabled=e.lightbox_enabled,t.login_id=e.login_id,t.client_key=e.client_key,t.general_error=e.general_error,t.ajax_url=e.ajax_url,t.ajax_log_nonce=e.ajax_log_nonce,d(document.body).on("checkout_error",function(){return d("#wc-authorize-net-cim-credit-card-payment-nonce").val(""),d("#wc-authorize-net-cim-credit-card-payment-descriptor").val(""),d("#wc-authorize-net-cim-echeck-payment-nonce").val(""),d("#wc-authorize-net-cim-echeck-payment-descriptor").val("")}).on("DOMNodeInserted","#AcceptUIContainer",function(){return d("#AcceptUIContainer").attr({role:"dialog","aria-hidden":"true","aria-live":"assertive"})}),d(window).on("message",function(e){return t.handle_iframe_event(e.originalEvent)}),t}return t=window.WC_Authorize_Net_Payment_Form_Handler=(_inherits(a,SV_WC_Payment_Form_Handler_v5_10_8),_createClass(a,[{key:"handle_iframe_event",value:function(e){if(!function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")}(this,t),e.origin&&e.origin.match(/authorize.net$/)&&"object"===_typeof(e.data)&&e.data.verifyOrigin&&"AcceptMain"===e.data.verifyOrigin)return"CLOSE_IFRAME"===e.data.type?this.unblock_ui():void 0}},{key:"block_ui",value:function(){var t;if(_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"block_ui",this).call(this),this.lightbox_enabled)return t=this,d("#AcceptUIContainer").find("iframe").focus(),d("#AcceptUIContainer").attr("aria-hidden","false"),d("#AcceptUIBackground").on("click.authorize_net",function(){return t.unblock_ui()}),d(window).on("keyup.authorize_net",function(e){if("Escape"===e.key)return t.unblock_ui()})}},{key:"unblock_ui",value:function(){if(_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"unblock_ui",this).call(this),this.lightbox_enabled)return d(window).off("keyup.authorize_net"),this.remove_overlay()}},{key:"remove_overlay",value:function(){return d("#AcceptUIContainer, #AcceptUIBackground").removeClass("show"),d("#AcceptUIContainer").attr("aria-hidden","true")}},{key:"validate_payment_data",value:function(){return!this.form.is(".processing")&&(this.log("Validating payment data"),this.has_nonce()?(this.log("Payment nonce present, submitting form"),!0):(this.errors=[],this.saved_payment_method_selected=this.payment_fields.find(".js-sv-wc-payment-gateway-payment-token:checked").val(),this.lightbox_enabled&&!this.saved_payment_method_selected?(this.init_hosted_form(),!1):!!("credit-card"===this.type?this.validate_card_data():this.validate_account_data())&&(!!this.saved_payment_method_selected||(this.dispatch_payment(),!1))))}},{key:"init_hosted_form",value:function(){return this.log("Starting hosted payment form"),this.block_ui(),d(".AcceptUI").click()}},{key:"dispatch_payment",value:function(){var e,t=this;return this.log("Dispatching payment"),this.block_ui(),e=this.get_request_data(),this.log_request(e),Accept.dispatchData(e,function(e){return t.log("Payment dispatched"),t.handle_response(e)})}},{key:"get_request_data",value:function(){var e=d("input[id=wc-"+this.id_dasherized+"-account-number]").val().replace(/-|\s/g,""),t={authData:{clientKey:this.client_key,apiLoginID:this.login_id}},a=d("#billing_first_name").val(),n=d("#billing_last_name").val(),a=null!=a&&null!=n?a+" "+n:"";return"credit-card"===this.type?(n=d.payment.cardExpiryVal(d("input[name=wc-"+this.id_dasherized+"-expiry]").val()),t.cardData={cardNumber:e,month:n.month.toString(),year:n.year.toString()},null!=(n=this.payment_fields.find("input#wc-"+this.id_dasherized+"-csc").val())&&this.csc_required&&(t.cardData.cardCode=n),null!=(n=d("#billing_postcode").val())&&0<n.length&&(t.cardData.zip=n),a.length&&(t.cardData.fullName=a)):t.bankData={accountNumber:e,routingNumber:d("input[id=wc-"+this.id_dasherized+"-routing-number]").val(),nameOnAccount:a,accountType:d("#wc-"+this.id_dasherized+"-account-type").val()},t}},{key:"handle_response",value:function(e){var t,a,n,r,i,o,c;if(this.log("Handling Accept.js response"),this.log_response(e),"Error"!==e.messages.resultCode)return this.set_nonce(e.opaqueData.dataValue,e.opaqueData.dataDescriptor),null!=e.encryptedCardData?(r=null!=e.encryptedCardData.cardNumber?e.encryptedCardData.cardNumber.slice(-4):"",a=null!=e.encryptedCardData.bin?d.payment.cardType(e.encryptedCardData.bin):"",null!=e.encryptedCardData.expDate&&d("input[name=wc-"+this.id_dasherized+"-expiry]").val(e.encryptedCardData.expDate)):(r=(t=d("input[id=wc-"+this.id_dasherized+"-account-number]").val())?t.slice(-4):"",a=d.payment.cardType(t)),d("input[name=wc-"+this.id_dasherized+"-last-four]").val(r),"credit-card"===this.type&&d("input[name=wc-"+this.id_dasherized+"-card-type]").val(a),this.form.submit();for(n=0,i=(c=e.messages.message).length;n<i;n++)o=c[n],this.handle_error(o.code,o.text);return this.render_errors(this.errors),this.unblock_ui()}},{key:"set_nonce",value:function(e,t){return d("input[name=wc-"+this.id_dasherized+"-payment-nonce]").val(e),d("input[name=wc-"+this.id_dasherized+"-payment-descriptor]").val(t)}},{key:"handle_error",value:function(e,t){switch(this.log(t+" ("+e+")","error"),e){case"E_WC_05":t=this.params.card_number_invalid;break;case"E_WC_06":case"E_WC_07":case"E_WC_08":case"E00073":t=this.params.card_exp_date_invalid;break;case"E_WC_15":t=this.params.cvv_length_invalid;break;default:t=this.general_error}if(n.call(this.errors,t)<0)return this.errors.push(t)}},{key:"has_nonce",value:function(){return d("input[name=wc-"+this.id_dasherized+"-payment-nonce]").val()}},{key:"handle_saved_payment_methods",value:function(){var t;return _get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"handle_saved_payment_methods",this).call(this),t="js-sv-wc-payment-gateway-credit-card-form-csc",d("input.js-wc-authorize-net-cim-credit-card-payment-token").change(function(){var e=d("#wc-authorize-net-cim-credit-card-credit-card-form");return d("input.js-wc-authorize-net-cim-credit-card-payment-token:checked").val()?(e.hide(),d("#wc-authorize-net-cim-credit-card-csc").removeClass(t)):(d("#wc-authorize-net-cim-credit-card-csc").addClass(t),e.show())})}},{key:"log_request",value:function(e){e=this.clone_log_data(e);return e.cardData?(e.cardData.cardNumber&&(e.cardData.cardNumber=e.cardData.cardNumber.replace(/\d(?=\d{4})/g,"*")),e.cardData.cardCode&&(e.cardData.cardCode=e.cardData.cardCode.replace(/[0-9]/g,"*"))):e.bankData&&(e.bankData.accountNumber&&(e.bankData.accountNumber=e.bankData.accountNumber.replace(/\d(?=\d{4})/g,"*")),e.bankData.routingNumber&&(e.bankData.routingNumber=e.bankData.routingNumber.replace(/[0-9]/g,"*"))),this.log_data(e,"request")}},{key:"log_response",value:function(e){return this.log_data(e,"response")}},{key:"clone_log_data",value:function(e){var t,a;if(null==e||"object"!==(void 0===e?"undefined":_typeof(e)))return e;for(t in a={},e)a[t]=this.clone_log_data(e[t]);return a}},{key:"log_data",value:function(e,t){if(this.logging_enabled)return e={action:"wc_"+this.id+"_log_js_data",security:this.ajax_log_nonce,type:t,data:e},d.ajax({url:this.ajax_url,data:e})}},{key:"log",value:function(e){if(this.logging_enabled)return"error"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"notice")?console.error("Authorize.Net Error: "+e):console.log("Authorize.Net: "+e)}}]),a),d(document.body).trigger("wc_authorize_net_payment_form_handler_loaded"),window.wc_authorize_net_cim_credit_card_accept_hosted_handler=function(e){return window.wc_authorize_net_cim_credit_card_payment_form_handler.handle_response(e)}})}.call(void 0);