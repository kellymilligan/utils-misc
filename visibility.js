/*
    Abstraction helper for binding callbacks to document visibility states
    ---
    Note:
    'prerender' and 'unloaded' browser support is optional in the spec:
    https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState

    visible     Function    'visible' state callback
    hidden      Function    'hidden' state callback

    prerender   Function    'prerender' state callback
    unloaded    Function    'unloaded' state callback

*/

export default function (

    visible = () => {},
    hidden = () => {},

    prerender = () => {},
    unloaded = () => {},

) {

    document.addEventListener( 'visibilitychange', () => {

        switch( document.visibilityState ) {

            case 'visible': visible(); break;
            case 'hidden': hidden(); break;
            case 'prerender': prerender(); break;
            case 'unloaded': unloaded(); break;
        }
    }, false );
}