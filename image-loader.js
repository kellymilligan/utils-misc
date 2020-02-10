/*
  Simple class for preloading images:
    - Can load a single image by path or an array of paths
    - Internally holds references to images to avoid garbage collection
    - Items can be manually unloaded by path
    - Provides onLoaded and onProgress (for array) callbacks
*/

export default class ImagePreloader {

  collection = []

  get loaded() { return this.collection }

  load( src, onLoaded, onProgress ) {

    if ( typeof src === 'string' ) {
      this._loadSingle( src, onLoaded )
    }
    else if ( Array.isArray( src ) ) {
      this._loadArray( src, onLoaded, onProgress )
    }
    else {
      console.warn( 'ImageLoader.load(): src was not a string or array of strings...' )
    }
  }

  unload( src ) {

    delete this.collection[ src ]
  }

  _loadArray(
    srcList,
    onLoaded = () => {},
    onProgress = () => {}
  ) {

    console.log( 'load array:', srcList )

    const count = srcList.length
    let loaded = 0

    srcList.forEach(
      src => this._loadSingle( src, () => {
        loaded += 1
        onProgress( loaded / count )
        if ( loaded === count ) {
          onLoaded()
        }
      } )
    )
  }

  _loadSingle( src, onLoaded ) {

    console.log( 'load single:', src )

    if ( this.collection[ src ] !== undefined ) {
      console.log( 'duplicate', src )
      onLoaded()
      return
    }

    this.collection[ src ] = new Image()
    this.collection[ src ].onload = onLoaded
    this.collection[ src ].src = src
  }
}
