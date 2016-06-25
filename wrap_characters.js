define([

    'jquery'

], function(

    $

) { 'use strict';

    /*
        Wrap individual letters and words in a span structure
        ---
        Very useful for animating individual letters or words
        while maintaining CSS based layout. Wraps whole words
        to ensure they don't get split at line-end, and wraps
        words or individual characters in a span structure.

        $element       $ object    Element whose child characters to manipulate
        wrapAsWords    bool        Flag whether to wrap as words or individal characters

    */

    return function ($element, wrapAsWords) {

        wrapAsWords = wrapAsWords || false;

        var words = $element.text().split( ' ' ) ;
        var spans = [];

        $element.empty();

        $.each( words, function(i, word) {

            var $word = $( '<span class="word">' + word + '</span>' );
            var characters = $word.text().split( '' );

            $word.empty();

            if ( wrapAsWords ) {

                var $textSpan = $( document.createElement('span') );
                var $animSpan = $( document.createElement('span') );

                $textSpan.addClass( 'char-text' );
                $textSpan.append( word );

                $animSpan.addClass( 'char-anim' );
                $animSpan.attr( 'data-char', word ); // Add to pseudo element's content property

                $word.append( $textSpan );
                $word.append( $animSpan );

                $word.addClass( 'char' );

                spans.push( $word );
            }
            else {

                $.each( characters, function(i, c) {

                    var $outerSpan = $( document.createElement('span') );
                    var $textSpan = $( document.createElement('span') );
                    var $animSpan = $( document.createElement('span') );

                    $textSpan.addClass( 'char-text' );
                    $textSpan.append( c );

                    $animSpan.addClass( 'char-anim' );
                    $animSpan.attr( 'data-char', c ); // Add to pseudo element's content property

                    $outerSpan.append( $textSpan );
                    $outerSpan.append( $animSpan );

                    $outerSpan.addClass( 'char' );

                    $word.append( $outerSpan );

                    spans.push( $outerSpan );
                });
            }

            $element.append( $word );
            $element.append( ' ' ); // Add a white space between each word

        });

        return spans;
    };

});