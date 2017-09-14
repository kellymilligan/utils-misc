/*
    Shuffle the supplied array, either in place or as a new array
    Source: https://stackoverflow.com/a/6274381
    ---

    arr         Array      Array to be shuffled
    in_place    Boolean    Flag whether to return a new array instance

    ---
    Returns     Array      Shuffled array

*/

export default function shuffleArray(arr, in_place = true) {

    let a = in_place ? arr : [];

    for ( let i = arr.length; i; i-- ) {

        let j = Math.floor( Math.random() * i );
        [ a[ i - 1 ], a[ j ] ] = [ a[ j ], a[ i - 1 ] ];
    }

    return a;
}