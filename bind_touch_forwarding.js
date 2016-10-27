define( function () {

    'use strict';

    /*
        Bind and forward touch events to provided mouse handlers
        ---

        element         obj       HTML element object where events were bound
        startHandler    func      Handler function to forward touchstart events to
        moveHandler     func      Handler function to forward touchmove events to
        endHandler      func      Handler function to forward touchend events to

        --
        Returns         arr       Array containing the touch event handlers

    */

    return function (element, downHandler, moveHandler, upHandler) {

        var bindDown = function (e) {

            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY;

            downHandler( e );
        };

        var bindMove = function (e) {

            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY;

            moveHandler( e );
        };

        var bindUp = function (e) {

            e.clientX = e.changedTouches[0].clientX;
            e.clientY = e.changedTouches[0].clientY;
            e.pageX = e.changedTouches[0].pageX;
            e.pageY = e.changedTouches[0].pageY;

            upHandler( e );
        };

        element.addEventListener( 'touchstart', bindDown, false );
        element.addEventListener( 'touchmove', bindMove, false );
        element.addEventListener( 'touchend', bindUp, false );

        return [ bindDown, bindMove, bindUp ];
    };
});