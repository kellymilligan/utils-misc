/*
    Use an async GeoIP lookup to detect EU visitors.
    Useful for detecting when a cookie bar needs to be displayed to the user.
    By default uses freegeoip.net/json endpoint, has a limit of 15,000 requests per day.

    callback    Function    fired if user matches an EU country code

    method      String      Optional - method to request with (depends on service)
    service     String      Optional - service endpoint to use
    field       String      Optional - country code field name in response

*/

const EU_CODES = [ 'AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GB', 'GE', 'GI', 'GR', 'HU', 'HR', 'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PL', 'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA' ];

export default function (

    callback,

    method = 'GET',
    service = 'https://freegeoip.net/json/',
    field = 'country_code'

) {

    let xhr = new XMLHttpRequest();

    xhr.open( method, service );
    xhr.onload = () => { if ( xhr.status === 200 ) {

        let json = JSON.parse( xhr.responseText );
        if ( json[ field ] && EU_CODES.indexOf( json[ field ] ) > -1 ) { callback(); }
    } };
    xhr.send();
}