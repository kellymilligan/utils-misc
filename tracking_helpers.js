/*
    Google Analytics tracking helpers
*/

const DEBUG = false;
const ANCHOR_CLICK_DELAY = DEBUG ? 3000 : 150;
let ga;

// Debugger used in place of real 'ga' if DEBUG flag is set
// or if the ga object hasn't been attached to the window
let debug = function(method, parameters) {

    if ( DEBUG ) console.warn( 'tracking.js: DEBUG flag is true...' );
    else console.warn( 'tracking.js: window.ga wasn\'t found. This event may have been dispatched before the async script had loaded...' );
    console.warn( '... This tracking request has not been submitted to analytics.js. Here\'s the data that was supplied:' )

    console.log(
        '-------------------------------' + '\n' +
        `Method: ${ method }` + '\n' +
        `Type: ${ parameters.hitType }` + '\n' +
        '---' + '\n' +
        `Category: ${ parameters.eventCategory }` + '\n' +
        `Action: ${ parameters.eventAction }` + '\n' +
        ( parameters.eventLabel ? `Label: ${ parameters.eventLabel }` + '\n' : '' ) +
        ( parameters.eventValue ? `Value: ${ parameters.eventValue }` + '\n' : '' ) +
        '-------------------------------'
    );
};

// Poll for analytics.js as it's loaded async. Set to the debugger on the
// first poll and replace with the real API as soon as it's available.
// Don't continue polling if DEBUG flag is turned on.
let poll = function () {

    ga = DEBUG || !window.ga ? debug : window.ga;
    if ( !DEBUG && !window.ga ) { setTimeout( poll, 500 ); }
};

poll();


/**
 * Submit an 'event' tracking call
 *
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} [label] - Event label
 * @param {string} [value] - Event value
 */
export function trackEvent(category, action, label, value) {

    if ( !category ) console.error( 'tracking.js.trackEvent: No event category was supplied!' );
    if ( !action ) console.error( 'tracking.js.trackEvent: No event action was supplied!' );

    ga(
        'send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value
        }
    );
}

/**
 * Handle a delayed trackEvent call when tracking anchor clicks
 *
 * @param {Event} event - Click event object
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} [label] - Event label
 * @param {string} [value] - Event value
 */
export function trackLinkClick(event, category, action, label, value) {

    let href = event.currentTarget.getAttribute( 'href' );
    let target = event.currentTarget.getAttribute( 'target' );
    let blank = target === '_blank' || target === 'blank';
    // let mailto = href.indexOf( 'mailto:' ) > -1;
    // let tel = href.indexOf( 'tel:' ) > -1;

    trackEvent( category, action, label, value );

    if ( href && !blank /*&& !mailto && !tel*/ ) {

        event.preventDefault();
        setTimeout( () => { location.href = href; }, ANCHOR_CLICK_DELAY );
    }
}