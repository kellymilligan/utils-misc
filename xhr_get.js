/*
    Make a simple 'GET' async XHR request

    endpoint    String              endpoint to send the request to
    success     Function            callback when successful response returned
    error       Function            callback when request fails

    ---
    Returns     XMLHttpRequest      refernce to the request

*/

export default function (

    endpoint,
    success = (response) => { console.log( 'XHR success - Response:', response ); },
    error = (request) => { console.log( 'XHR error - Request:', request ); }

) {

    let xhr = new XMLHttpRequest();

    xhr.open( 'GET', endpoint, true );
    xhr.onload = () => {
        xhr.status === 200 ? success( JSON.parse( xhr.responseText ) ) : error( xhr );
    };
    xhr.send();

    return xhr;
}