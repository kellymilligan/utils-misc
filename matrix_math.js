define([

    'sylvester'

], function (

    Sylvester

) { 'use strict';

    return {

        degToRad: function (degrees) {

            return degrees * ( Math.PI / 180 );
        },

        getRotationXMatrix: function (rotateX) {

            return Sylvester.Matrix.create([
                [1,0,0,0],
                [0,Math.cos(this.degToRad(rotateX)),Math.sin(this.degToRad(rotateX * -1)),0],
                [0,Math.sin(this.degToRad(rotateX)),Math.cos(this.degToRad(rotateX)),0],
                [0,0,0,1]
            ]);
        },

        getRotationYMatrix: function (rotateY) {

            return Sylvester.Matrix.create([
                [Math.cos(this.degToRad(rotateY)),0,Math.sin(this.degToRad(rotateY)),0],
                [0,1,0,0],
                [Math.sin(this.degToRad(rotateY * -1)),0,Math.cos(this.degToRad(rotateY)),0],
                [0,0,0,1]
            ]);
        },

        getRotationZMatrix: function (rotateZ) {

            return Sylvester.Matrix.create([
                [Math.cos(this.degToRad(rotateZ)),Math.sin(this.degToRad(rotateZ * -1)),0,0],
                [Math.sin(this.degToRad(rotateZ)),Math.cos(this.degToRad(rotateZ)),0,0],
                [0,0,1,0],
                [0,0,0,1]
            ]);
        },

        getScaleMatrix: function (scaleX, scaleY, scaleZ) {

            scaleX = scaleX === undefined ? 1 : scaleX;
            scaleY = scaleY === undefined ? 1 : scaleY;
            scaleZ = scaleZ === undefined ? 1 : scaleZ;

            return Sylvester.Matrix.create([
                [scaleX,0,0,0],
                [0,scaleY,0,0],
                [0,0,scaleZ,0],
                [0,0,0,1]
            ]);
        },

        getTranslationMatrix: function (translationX, translationY, translationZ) {

            translationX = translationX === undefined ? 0 : translationX;
            translationY = translationY === undefined ? 0 : translationY;
            translationZ = translationZ === undefined ? 0 : translationZ;

            return Sylvester.Matrix.create([
                [1,0,0,0],
                [0,1,0,0],
                [0,0,1,0],
                [translationX,translationY,translationZ,1]
            ]);
        },

        getResultMatrix: function (matrixArray) {

            if ( matrixArray.length === 1 ) {

                return matrixArray[0];
            }
            else {

                var resultMatrix = Sylvester.Matrix.create([
                    [1,0,0,0],
                    [0,1,0,0],
                    [0,0,1,0],
                    [0,0,0,1]
                ]);

                for ( var i = 0; i < matrixArray.length; i++ ) {

                    resultMatrix = matrixArray[i].x(resultMatrix);
                }

                return resultMatrix;
            }
        },

        getTransform3dString: function (matrix) {

            var transformString = "matrix3d(";

            transformString += matrix.e(1,1).toFixed(5) + "," + matrix.e(1,2).toFixed(5) + "," + matrix.e(1,3) + "," + matrix.e(1,4).toFixed(5) + ",";
            transformString += matrix.e(2,1).toFixed(5) + "," + matrix.e(2,2).toFixed(5) + "," + matrix.e(2,3) + "," + matrix.e(2,4).toFixed(5) + ",";
            transformString += matrix.e(3,1).toFixed(5) + "," + matrix.e(3,2).toFixed(5) + "," + matrix.e(3,3) + "," + matrix.e(3,4).toFixed(5) + ",";
            transformString += matrix.e(4,1).toFixed(5) + "," + matrix.e(4,2).toFixed(5) + "," + matrix.e(4,3) + "," + matrix.e(4,4).toFixed(5);
            transformString += ")";

            return transformString;
        }

    };
});