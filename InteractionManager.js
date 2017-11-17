/*
    A stand-alone controller class that handles user input.
    Internally manages event bindings and input dimensions.
*/

const POINTER_DEFAULTS = {

    is_down: false,
    is_moving: false,

    time_down: 0,

    // Browser coordinates where top/left is 0/0, and bottom/right is w/h
    client: {
        x: 0,
        y: 0
    },

    // Browser coordinates offset to place origin (0/0) at viewport center
    offset: {
        x: 0,
        y: 0
    },

    // Normalized coordinates with offset origin (between -1 and 1 on both axes)
    normal: {
        x: 0,
        y: 0
    },

    // Pointer delta parameters, calculated each tick
    speed: {
        x: 0,           // Delta on x-axis
        y: 0,           // Delta on y-axis
        distance: 0,    // Absolute delta
        x_prev: 0,      // Previous normal X position, used to calculate delta
        y_prev: 0       // Previous normal Y position, used to calculate delta
    }
};

export default class InteractionManager {

    constructor( element = document.body ) {

        this._element = element;

        this._tracking = {
            active: false,
            touch: false,
            pointer: Object.assign( {}, POINTER_DEFAULTS ),
        };

        this._env = {
            bounds: {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            }
        };

        this.prev_time = 0;

        // Bindings
        this._onPointerDown = this._onPointerDown.bind( this );
        this._onPointerMove = this._onPointerMove.bind( this );
        this._onPointerUp = this._onPointerUp.bind( this );
        this._onTouchStart = this._onTouchStart.bind( this );
        this._onTouchMove = this._onTouchMove.bind( this );
        this._onTouchEnd = this._onTouchEnd.bind( this );
    }


    // Public
    // ------

    /*
        Start tracking interactions
        Returns a reference to the tracking object for data access
    */
    start() {

        if ( this._tracking.active ) { console.warn( 'InteractionManager: start() was called while already active...' ); return; }
        this._tracking.active = true;

        this._setPointer( 0, 0 );
        this._setPointerSpeed();
        this.refresh();

        this._attachEvents();

        return this._tracking;
    }

    /*
        Stop tracking interactions
        Returns a reference to the tracking object for data access
    */
    stop() {

        this._tracking.active = false;
        this._tracking.pointer = Object.assign( {}, POINTER_DEFAULTS );
        this._detachEvents();

        return this._tracking;
    }

    /*
        Refresh tracking parameters (i.e. resize bounds with window resize)
        Dimensions can be overridden if passed as arguments
    */
    refresh(

        width = this._element.offsetWidth,
        height = this._element.offsetHeight,
        left = this._element.offsetLeft,
        top = this._element.offsetTop

    ) {

        this._env.bounds.width = width;
        this._env.bounds.height = height;
        this._env.bounds.left = left;
        this._env.bounds.top = top;
    }


    // Bindings
    // --------

    _attachEvents() {

        this._loop = window.requestAnimationFrame( () => this._onAnimationFrame() );

        // Listen for the interaction initiatator on the element itself, but then
        // continue to track move and release events on the document. Allows the
        // interaction to continue updating, even if the pointer has left the area
        // of the tracked element.
        this._element.addEventListener( 'mousedown', this._onPointerDown, false );
        document.addEventListener( 'mousemove', this._onPointerMove, false );
		document.addEventListener( 'mouseup', this._onPointerUp, false );

        this._element.addEventListener( 'touchstart', this._onTouchStart, false );
		document.addEventListener( 'touchmove', this._onTouchMove, false );
		document.addEventListener( 'touchend', this._onTouchEnd, false );
    }

    _detachEvents() {

        window.cancelAnimationFrame( this._loop );

        this._element.removeEventListener( 'mousedown', this._onPointerDown, false );
		document.removeEventListener( 'mousemove', this._onPointerMove, false );
		document.removeEventListener( 'mouseup', this._onPointerUp, false );

        this._element.removeEventListener( 'touchstart', this._onTouchStart, false );
		document.removeEventListener( 'touchmove', this._onTouchMove, false );
		document.removeEventListener( 'touchend', this._onTouchEnd, false );
    }


    // Helpers
    // -------

    _setPointer(x, y) {

        this._tracking.pointer.client.x = x - this._env.bounds.left;
        this._tracking.pointer.client.y = y - this._env.bounds.top;
        this._tracking.pointer.offset.x = this._tracking.pointer.client.x - ( this._env.bounds.width * 0.5 );
        this._tracking.pointer.offset.y = this._tracking.pointer.client.y - ( this._env.bounds.height * 0.5 );
        this._tracking.pointer.normal.x = ( this._tracking.pointer.offset.x / this._env.bounds.width ) * 2;
        this._tracking.pointer.normal.y = ( this._tracking.pointer.offset.y / this._env.bounds.height ) * 2;
    }

    _setPointerSpeed() {

        this._tracking.pointer.speed.x = this._tracking.pointer.normal.x - this._tracking.pointer.speed.x_prev;
        this._tracking.pointer.speed.y = this._tracking.pointer.normal.y - this._tracking.pointer.speed.y_prev;

        this._tracking.pointer.speed.distance = Math.sqrt(
            this._tracking.pointer.speed.x * this._tracking.pointer.speed.x +
            this._tracking.pointer.speed.y * this._tracking.pointer.speed.y
        );

        this._tracking.pointer.speed.x_prev = this._tracking.pointer.normal.x;
        this._tracking.pointer.speed.y_prev = this._tracking.pointer.normal.y;
    }


    // Handlers
    // --------

    _onAnimationFrame() {

        let now = Date.now();
        let delta = now - this.prev_time;
        this.prev_time = now;

        this._setPointerSpeed();

        if ( this._tracking.pointer.is_down ) { this._tracking.pointer.time_down += delta; }

        this._loop = window.requestAnimationFrame( () => this._onAnimationFrame() );
    }

    _onPointerDown(e) {

        this._setPointer( e.clientX, e.clientY );

        this._tracking.pointer.is_down = true;
    }

    _onPointerMove(e) {

        this._setPointer( e.clientX, e.clientY );

        this._tracking.pointer.is_moving = true;
    }

    _onPointerUp(e) {

        this._tracking.pointer.time_down = 0;

        this._setPointer( e.clientX, e.clientY );

        this._tracking.pointer.is_down = false;
        this._tracking.pointer.is_moving = false;
    }

    // Relay to pointer handler
    _onTouchStart(e) {

        this._tracking.touch = true;

        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;

        this._onPointerDown( e );
    }

    // Relay to pointer handler
    _onTouchMove(e) {

        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;

        this._onPointerMove( e );
    }

    // Relay to pointer handler
    _onTouchEnd(e) {

        e.clientX = e.changedTouches[0].clientX;
        e.clientY = e.changedTouches[0].clientY;

        this._onPointerUp( e );
    }

}