/*
    A simple clock class which allows scaling of time
*/

export default class Clock {

        constructor() {

            this.reset( Date.now() );
        }

        reset( now ) {

            this._start = now;      // Starting time
            this._internal = now;   // Internal value to calculate delta

            this.delta = 0;         // Time since last update
            this.current = now;     // Current time (scaled)
            this.elapsed = 0;       // Elapsed time (scaled)
            this.scale = 1;         // Time scale factor
        }

        tick( now = Date.now() ) {

            // Calculate real change
            this.delta = now - this._internal;
            this._internal = now;

            // Apply scaled updates
            this.current += this.delta * this.scale;
            this.elapsed = this.current - this._start;
        }

        setTimescale( scale = 1 ) { this.scale = scale; }

        getTime() { return this.current; }
        getElapsed() { return this.elapsed; }
        getDelta() { return this.delta; }

    }