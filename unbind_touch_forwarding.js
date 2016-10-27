define( function () {

    'use strict';

    /*
        Unbind touch events from the provided handlers
        ---

        element         obj       HTML element object where events were bound
        startHandler    func      Function previously bound to touchstart event
        moveHandler     func      Function previously bound to touchmove event
        endHandler      func      Function previously bound to touchend event

    */

    return function (element, startHandler, moveHandler, endHandler) {

        element.removeEventListener( 'touchstart', startHandler, false );
        element.removeEventListener( 'touchmove', moveHandler, false );
        element.removeEventListener( 'touchend', endHandler, false );
    };
});