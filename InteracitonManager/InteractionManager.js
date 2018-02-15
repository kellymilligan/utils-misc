/*
  A stand-alone controller class that handles user input.
  Internally manages event bindings and input dimensions.
*/

const POINTER_DEFAULTS = {

    isDown: false,
    isMoving: false,

    // Browser coordinates where top/left is 0/0, and bottom/right is w/h
    client: {
      x: 0,
      y: 0,
    },

    // Browser coordinates offset to place origin (0/0) at viewport center
    offset: {
      x: 0,
      y: 0,
    },

    // Normalized coordinates with offset origin (between -1 and 1 on both axes)
    normal: {
      x: 0,
      y: 0,
    },

    // Distance travelled between current tick and when isDown was set
    travel: {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    },

    // Pointer delta parameters, calculated each tick
    speed: {
      x: 0,                 // Delta on x-axis
      y: 0,                 // Delta on y-axis
      distance: 0,          // Absolute delta
      prev: { x: 0, y: 0 }, // Previous X,y normal position, used to calculate delta
    },

  };

  export default class InteractionManager {

    constructor(element = document.body) {
      this.element = element;

      this.tracking = {
        active: false,
        touch: false,
        pointer: Object.assign({}, POINTER_DEFAULTS),
      };

      this.env = {
        time: {
          now: 0,
          delta: 0,
          prev: 0,
        },
        bounds: {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        },
      };

      // Bindings
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    // Public
    // ------

    /*
      Start tracking interactions
      Returns a reference to the tracking object for data access
    */
    start() {
      if (this.tracking.active) { console.warn('InteractionManager: start() was called while already active...'); return this.tracking; }

      this.tracking.active = true;

      this.setPointer(0, 0);
      this.setPointerSpeed();
      this.refresh();

      this.attachEvents();

      return this.tracking;
    }

    /*
      Stop tracking interactions
      Returns a reference to the tracking object for data access
    */
    stop() {
      this.tracking.active = false;
      this.tracking.pointer = Object.assign({}, POINTER_DEFAULTS);
      this.detachEvents();

      return this.tracking;
    }

    /*
      Retrieve the tracking object
      Returns a reference to the tracking object for data access
    */
    subscribe() {
      return this.tracking;
    }

    /*
      Refresh tracking parameters (i.e. resize bounds with window resize)
      Dimensions can be overridden if passed as arguments
    */
    refresh(
      width = this.element.offsetWidth,
      height = this.element.offsetHeight,
      left = this.element.offsetLeft,
      top = this.element.offsetTop
    ) {
      this.env.width = width;
      this.env.height = height;
      this.env.left = left;
      this.env.top = top;
    }

    // Bindings
    // --------

    attachEvents() {
      // Start animation loop
      this.loop = window.requestAnimationFrame(() => this.onAnimationFrame());

      // Listen for the interaction initiatator on the element itself, but then
      // continue to track move and release events on the document. Allows the
      // interaction to continue updating, even if the pointer has left the area
      // of the tracked element.

      this.element.addEventListener('mousedown', this.onPointerDown, false);
      document.addEventListener('mousemove', this.onPointerMove, false);
      document.addEventListener('mouseup', this.onPointerUp, false);

      this.element.addEventListener('touchstart', this.onTouchStart, false);
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
    }

    detachEvents() {
      window.cancelAnimationFrame(this.loop);

      this.element.removeEventListener('mousedown', this.onPointerDown, false);
      document.removeEventListener('mousemove', this.onPointerMove, false);
      document.removeEventListener('mouseup', this.onPointerUp, false);

      this.element.removeEventListener('touchstart', this.onTouchStart, false);
      document.removeEventListener('touchmove', this.onTouchMove, false);
      document.removeEventListener('touchend', this.onTouchEnd, false);
    }

    // Helpers
    // -------

    setPointer(x, y) {
      this.tracking.pointer.client.x = x - this.env.left;
      this.tracking.pointer.client.y = y - this.env.top;
      this.tracking.pointer.offset.x = this.tracking.pointer.client.x - (this.env.width * 0.5);
      this.tracking.pointer.offset.y = this.tracking.pointer.client.y - (this.env.height * 0.5);
      this.tracking.pointer.normal.x = (this.tracking.pointer.offset.x / this.env.width) * 2;
      this.tracking.pointer.normal.y = (this.tracking.pointer.offset.y / this.env.height) * 2;
    }

    setPointerSpeed() {
      // Axis delta
      this.tracking.pointer.speed.x = this.tracking.pointer.normal.x - this.tracking.pointer.speed.prev.x;
      this.tracking.pointer.speed.y = this.tracking.pointer.normal.y - this.tracking.pointer.speed.prev.y;
      this.tracking.pointer.speed.prev.x = this.tracking.pointer.normal.x;
      this.tracking.pointer.speed.prev.y = this.tracking.pointer.normal.y;

      // Absolute delta
      this.tracking.pointer.speed.distance = Math.sqrt(
        (this.tracking.pointer.speed.x * this.tracking.pointer.speed.x) +
        (this.tracking.pointer.speed.y * this.tracking.pointer.speed.y)
      );

      // Movement status
      this.tracking.pointer.isMoving = this.tracking.pointer.isDown && this.tracking.pointer.speed.distance > 0;
    }

    // Handlers
    // --------

    onAnimationFrame() {
      this.env.time.now = Date.now();
      this.env.time.delta = this.env.time.now - this.env.time.prev;
      this.env.time.prev = this.env.time.now;

      this.setPointerSpeed();

      this.loop = window.requestAnimationFrame(() => this.onAnimationFrame());
    }

    onPointerDown(e) {
      this.tracking.pointer.isDown = true;

      this.setPointer(e.clientX, e.clientY);

      this.tracking.pointer.travel.startX = e.clientX;
      this.tracking.pointer.travel.startY = e.clientY;
      this.tracking.pointer.travel.x = 0;
      this.tracking.pointer.travel.y = 0;
    }

    onPointerMove(e) {
      this.setPointer(e.clientX, e.clientY);

      this.tracking.pointer.travel.x = e.clientX - this.tracking.pointer.travel.startX;
      this.tracking.pointer.travel.y = e.clientY - this.tracking.pointer.travel.startY;
    }

    onPointerUp(e) {
      this.tracking.pointer.isDown = false;

      this.setPointer(e.clientX, e.clientY);

      this.tracking.pointer.travel.startX = 0;
      this.tracking.pointer.travel.startY = 0;
      this.tracking.pointer.travel.x = 0;
      this.tracking.pointer.travel.y = 0;
    }

    // Relay to pointer handler
    onTouchStart(e) {
      this.tracking.touch = true;
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      this.onPointerDown(e);
    }

    // Relay to pointer handler
    onTouchMove(e) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      this.onPointerMove(e);
    }

    // Relay to pointer handler
    onTouchEnd(e) {
      e.clientX = e.changedTouches[0].clientX;
      e.clientY = e.changedTouches[0].clientY;
      this.onPointerUp(e);
    }
  }
