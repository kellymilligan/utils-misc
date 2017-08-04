/*
    Pure implementation of a konami sequence checker.
    Takes key codes as input, stores current position in the sequence and returns
    a positive flag when the entire sequence has been entered in sequence order.
    ---
    Source: https://stackoverflow.com/a/31627191

    key_code    Number      Event.keyCode value from keyboard events

    ---
    Returns     Boolean     flag whether sequence met with the current input

    Example usage:
    document.addEventListener( 'keyup', (e) => {
        if ( konami( e.keyCode ) ) { destroy(); }
    }, false );

*/

const KEY_CODES = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

const SEQUENCE = [ 'up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a' ];

let sequence_position = 0;

export default function (key_code) {

    if ( KEY_CODES[ key_code ] === SEQUENCE[ sequence_position ] ) {

        sequence_position++;

        if ( sequence_position === SEQUENCE.length ) {

            // Sequence was completed, return a positive flag and reset
            sequence_position = 0;
            return true;
        }
    } else {

        // Key out of sequence, reset
        sequence_position = 0;
    }

    // Sequence not completed
    return false;
}