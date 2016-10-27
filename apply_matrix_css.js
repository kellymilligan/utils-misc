define( function () {

    'use strict';

    return function(element, matrixString) {

        // If a jQuery/Zepto object, assign to the element object instead
        if ( !element.nodeType ) { element = element[0]; }

        element.style.mozTransform = matrixString;
        element.style.webkitTransform = matrixString;
        element.style.transform = matrixString;
    };
});
