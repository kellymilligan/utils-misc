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

import $ from 'webpack-zepto';

export default function ($element, wrapAsWords = false) {

    let chunks = $element.text().split( ' ' );

    let words = [];
    let letters = [];

    $element.empty();

    $.each( chunks, (i, word) => {

        let $word = $( '<span class="word">' + word + '</span>' );
        let characters = $word.text().split( '' );

        $word.empty();

        if ( wrapAsWords ) {

            let $textSpan = $( document.createElement('span') );
            let $animSpan = $( document.createElement('span') );

            $textSpan.addClass( 'char-text' );
            $textSpan.append( word );

            $animSpan.addClass( 'char-anim' );
            $animSpan.attr( 'data-char', word ); // Add to pseudo element's content property

            $word.append( $textSpan );
            $word.append( $animSpan );

            $word.addClass( 'char' );

            words.push( $word );
        }
        else {

            $.each( characters, (i, c) => {

                let $outerSpan = $( document.createElement('span') );
                let $textSpan = $( document.createElement('span') );
                let $animSpan = $( document.createElement('span') );

                $textSpan.addClass( 'char-text' );
                $textSpan.append( c );

                $animSpan.addClass( 'char-anim' );
                $animSpan.attr( 'data-char', c ); // Add to pseudo element's content property

                $outerSpan.append( $textSpan );
                $outerSpan.append( $animSpan );

                $outerSpan.addClass( 'char' );

                $word.append( $outerSpan );

                letters.push( $outerSpan );
            });
        }

        words.push( $word );

        $element[ 0 ].appendChild( $word[ 0 ] );
        $element.append( ' ' ); // Add a white space between each word

    });

    return { words: words, letters: letters };
}