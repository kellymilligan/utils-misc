/*
    Load images in the supplied manifest

    image_manifest      Array       array of image meta objects
    loaded_callback     Function    callback called when all images are loaded

    Manifest structure:
    [
        {
            id: 'image-name',
            url: 'path/to/image.png'
        }
    ]
*/

export default function (

    image_manifest, loaded_callback

) {

    let loaded = [];

    for ( let i = 0, len = image_manifest.length; i < len; i++ ) {

        let item = image_manifest[ i ];
        let image = document.createElement( 'img' );

        image.onload = () => {

            loaded.push( Object.assign( { img: image }, item ) );

            if ( loaded.length === len ) { loaded_callback( loaded ); }
        };

        image.src = item.url;
    }
}