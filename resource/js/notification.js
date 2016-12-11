!function ($) {
    "use strict";

    var nifty = window.nifty = {
        'container'         : $('#container'),
        'contentContainer'  : $('#content-container'),
        'navbar'            : $('#navbar'),
        'mainNav'           : $('#mainnav-container'),
        'aside'             : $('#aside-container'),
        'footer'            : $('#footer'),
        'scrollTop'         : $('#scroll-top'),

        'window'            : $(window),
        'body'              : $('body'),
        'bodyHtml'          : $('body, html'),
        'document'          : $(document),
        'screenSize'        : '', // return value xs, sm, md, lg
        'isMobile'          : function(){
                return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        }(),
        'randomInt'         : function(min,max){
            return Math.floor(Math.random()*(max-min+1)+min);
        },
        'transition'          : function(){
            var thisBody = document.body || document.documentElement,
            thisStyle = thisBody.style,
            support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined;
            return support
        }()
    };
    var pageHolder, floatContainer = {}, notyContainer, addNew = false;
    $.niftyNoty = function(options){
        var defaults = {
            type        : 'primary',
            // DESC     : Specify style for the alerts.
            // VALUE    : primary || info || success || warning || danger || mint || purple || pink ||  dark
            // TYPE     : String


            icon        : '',
            // DESC     : Icon class names
            // VALUE    : (Icon Class Name)
            // TYPE     : String


            title       : '',
            // VALUE    : (The title of the alert)
            // TYPE     : String

            message     : '',
            // VALUE    : (Message of the alert.)
            // TYPE     : String


            closeBtn    : true,
            // VALUE    : Show or hide the close button.
            // TYPE     : Boolean



            container   : 'page',
            // DESC     : This option is particularly useful in that it allows you to position the notification.
            // VALUE    : page || floating ||  "specified target name"
            // TYPE     : STRING


            floating    : {
                position    : 'top-right',
                // Floating position.
                // Currently only supports "top-right". We will make further development for the next version.


                animationIn : 'jellyIn',
                // Please use the animated class name from animate.css

                animationOut: 'fadeOut'
                // Please use the animated class name from animate.css

            },

            html        : null,
            // Insert HTML into the notification.  If false, jQuery's text method will be used to insert content into the DOM.


            focus       : true,
            //Scroll to the notification


            timer       : 0,
            // DESC     : To enable the "auto close" alerts, please specify the time to show the alert before it closed.
            // VALUE    : Value is in milliseconds. (0 to disable the autoclose.)
            // TYPE     : Number


            //EVENTS / CALLBACK FUNCTIONS

            onShow      : function(){},
            // This event fires immediately when the show instance method is called.

            onShown     : function(){},
            // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete).

            onHide      : function(){},
            // This event is fired immediately when the hide instance method has been called.

            onHidden    : function(){}
            // This event is fired when the notification has finished being hidden from the user (will wait for CSS transitions to complete).


        },
        opt = $.extend({},defaults, options ), el = $('<div class="alert-wrap"></div>'),
        iconTemplate = function(){
            var icon = '';
            if (options && options.icon) {
                icon = '<div class="media-left"><span class="icon-wrap icon-wrap-xs icon-circle alert-icon"><i class="'+ opt.icon +'"></i></span></div>';
            }
            return icon;
        },
        alertTimer,
        template = function(){
            var clsBtn = opt.closeBtn ? '<button class="close" type="button"><i class="fa fa-times-circle"></i></button>' : '';
            var defTemplate = '<div class="alert alert-'+ opt.type + '" role="alert">'+ clsBtn + '<div class="media">';
            if (!opt.html) {
                return defTemplate + iconTemplate() + '<div class="media-body"><h4 class="alert-title">'+ opt.title +'</h4><p class="alert-message">'+ opt.message +'</p></div></div>';
            }
            return defTemplate + opt.html +'</div></div>';
        }(),
        closeAlert = function(e){
            opt.onHide();
            if (opt.container === 'floating' && opt.floating.animationOut) {
                el.removeClass(opt.floating.animationIn).addClass(opt.floating.animationOut);
                if (!nifty.transition) {
                    opt.onHidden();
                    el.remove();
                }
            }

            el.removeClass('in').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e){
                if (e.originalEvent.propertyName == "max-height") {
                    opt.onHidden();
                    el.remove();
                }
            });
            clearInterval(alertTimer);
            return null;
        },
        focusElement = function(pos){
            nifty.bodyHtml.animate({scrollTop: pos}, 300, function(){
                el.addClass('in');
            });
        },
        init = function(){
            opt.onShow();
            if (opt.container === 'page') {
                if (!pageHolder) {
                    pageHolder = $('<div id="page-alert"></div>');
                    nifty.contentContainer.prepend(pageHolder);
                };

                notyContainer = pageHolder;
                if (opt.focus) focusElement(0);

            }else if (opt.container === 'floating') {
                if (!floatContainer[opt.floating.position]) {
                    floatContainer[opt.floating.position] = $('<div id="floating-' + opt.floating.position + '" class="floating-container"></div>');
                    $('#container').append(floatContainer[opt.floating.position]);
                }

                notyContainer = floatContainer[opt.floating.position];

                if (opt.floating.animationIn) el.addClass('in animated ' + opt.floating.animationIn );
                opt.focus = false;
            }else {
                var $ct =  $(opt.container);
                var $panelct = $ct.children('.panel-alert');
                var $panelhd = $ct.children('.panel-heading');

                if (!$ct.length) {
                    addNew = false;
                    return false;
                }


                if(!$panelct.length){
                    notyContainer = $('<div class="panel-alert"></div>');
                    if($panelhd.length){
                        $panelhd.after(notyContainer);
                    }else{
                        $ct.prepend(notyContainer)
                    }
                }else{
                    notyContainer = $panelct;
                }

                if (opt.focus) focusElement($ct.offset().top - 30);

            }
            addNew = true;
            return false;
        }();

        if (addNew) {
            console.log(el.html(template))
            notyContainer.append(el.html(template));
            el.find('[data-dismiss="noty"]').one('click', closeAlert);
            if(opt.closeBtn) el.find('.close').one('click', closeAlert);
            if (opt.timer > 0)alertTimer = setInterval(closeAlert, opt.timer);
            if (!opt.focus) var addIn = setInterval(function(){el.addClass('in');clearInterval(addIn);},200);
            el.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e){
                if ((e.originalEvent.propertyName == "max-height" || e.type == "animationend") && addNew) {
                    opt.onShown();
                    addNew = false;
                }
            });
        }
    };

}(jQuery);




