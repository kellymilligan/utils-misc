/*
    Wrap individual letters and words in a span structure
    ---
    Useful for animating individual letters or words while maintaining CSS layout.
    Wraps words and individual characters, storing them in arrays which are returned.

    @TODO - Remove dependency on jQuey/Zepto for manipulation

    $element        Element     jQuery/Zepto Element object whose characters to split

    ---
    Returns         Object      References to the 'words' and 'letters' arrays

*/

import $ from 'webpack-zepto';

export default function ($element) {

    let chunks = $element.text().split( ' ' );

    let words = [];
    let letters = [];

    $element.empty();

    $.each( chunks, (i, word) => {

        let $word = $( '<span class="word">' + word + '</span>' );
        let characters = $word.text().split( '' );

        $word.empty();

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

        words.push( $word );

        $element[ 0 ].appendChild( $word[ 0 ] );
        $element.append( ' ' ); // Add a white space between each word

    });

    return { words: words, letters: letters };
}