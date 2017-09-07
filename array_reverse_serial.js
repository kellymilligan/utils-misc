/*
    Generate a reversed version of the array based on 'n' grouping
    Useful when working with arrays of coordinates stored in serial format
    ---

    arr         Array      Value to format
    n           Number     Length of array grouping

    ---
    Returns     Array      Reversed array

*/

export default function reverseSerialArray(arr, n = 2) {

    let reversed = [];

    for ( let i = arr.length - n; i >= 0; i -= n ) {
        for ( let j = 0; j < n; j++ ) {
            reversed.push( arr[ i + j ] );
        }
    }

    return reversed;
}