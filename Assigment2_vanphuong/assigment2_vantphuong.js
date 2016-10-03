"use strict";

var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var colors = [];
var transforms = [];

var xAxisRotation = 0;
var yAxisRotation = 1;
var zAxisRotation = 2;
var xNegTranslate = 3;
var xPosTranslate = 4;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;
var uMatrixLoc;
var modelMatrix;

var steps = 0;
var mouseDown = false;
var nLastMouseX = null;
var nLastMouseY = null;
var v3Transform = vec3(0.0, 0.0, 0.0);
var cubCenter = [0.0, 0.0, 0.0];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //.
    gl.enable(gl.DEPTH_TEST);
    //.
    document.onmouseup = handleMouseUp;
    canvas.onmousedown = handleMouseDown;
    document.onmousemove = handleMouseMove;
    //
    //  Load shaders and initialize attribute buffers
    //
    initCube();
    //.
    document.getElementById( "xButton" ).onclick = function () {
        transforms.push(rotateX(-2.0));
        render();
    };
    document.getElementById( "yButton" ).onclick = function () {
        transforms.push(rotateY(2.0));
        render();
    };
    document.getElementById( "zButton" ).onclick = function () {
        transforms.push(rotateZ(2.0));
        render();
    };

    window.onkeydown = function(event) {
        switch(event.keyCode) {
            case 37: //.Left-Arrow-Key
                cubCenter[0] -= 0.01;
                v3Transform = vec3(-0.01, 0.0, 0.0);
                transforms.push(translate(v3Transform));
                render();
                break;
            case 38: //.Up-Arrow-Key
                cubCenter[1] += 0.01;
                v3Transform = vec3(0.0, 0.01, 0.0);
                transforms.push(translate(v3Transform));
                render();
                break;
            case 39: //.Right-Arraoy-Key
                cubCenter[0] += 0.01;
                v3Transform = vec3(0.01, 0.0, 0.0);
                transforms.push(translate(v3Transform));
                render();
                break;
            case 40: //.Dn-Arrow-Key
                cubCenter[1] -= 0.01;
                v3Transform = vec3(0.0, -0.01, 0.0);
                transforms.push(translate(v3Transform));
                render();
                break;
            case 188: //. < Key - PgUp
                steps++;
                if(steps > 10) {
                    steps--;
                    break;
                }
                cubCenter[2] += 0.01;
                transforms.push(translate(vec3(0.0, 0.0, 0.1)));
                transforms.push(scalem(1.05, 1.05, 1.05));
                render();
                break;
            case 190: //. > Key - PgDn
                steps--;
                if(steps < -10) {
                    steps++;
                    break;
                }
                cubCenter[2] -= 0.01;
                transforms.push(translate(vec3(0.0, 0.0, -0.1)));
                transforms.push(scalem(0.95, 0.95, 0.95));
                render();
                break;
            default:
            //.
        }
    };

    window.onkeypress = function(event) {
        switch(event.charCode) {
            case 114: //. 'r' Key
                transforms.push(rotateY(1.0));
                render();
                break;
            case 82: //. 'R' Key
                transforms.push(rotateY(-1.0));
                render();
                break;
            case 115: //. 's' Key
                transforms.push(scalem(0.95, 0.95, 0.95));
                render();
                break;
            case 83: //. 'S' Key
                transforms.push(scalem(1.05, 1.05, 1.05));
                render();
                break;
            case 66: //. 'B' Key
            case 98: //. 'b' Key
                initCube();
                render();
                break;
            default: //. '-' Key
        }
    }

    render();

}

function initCube()
{
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    //.
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    uMatrixLoc = gl.getUniformLocation(program, "uMatrix");

    transforms = [];
    transforms.push(rotateX(15.0));
    transforms.push(rotateY(15.0));

    steps = 0;
    mouseDown = false;
    nLastMouseX = null;
    nLastMouseY = null;
    v3Transform = vec3(0.0, 0.0, 0.0);
    cubCenter = [0.0, 0.0, 0.0];
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d)
{
    var vertices = [
        vec4( -0.25, -0.25,  0.25, 1.0 ),
        vec4( -0.25,  0.25,  0.25, 1.0 ),
        vec4(  0.25,  0.25,  0.25, 1.0 ),
        vec4(  0.25, -0.25,  0.25, 1.0 ),
        vec4( -0.25, -0.25, -0.25, 1.0 ),
        vec4( -0.25,  0.25, -0.25, 1.0 ),
        vec4(  0.25,  0.25, -0.25, 1.0 ),
        vec4(  0.25, -0.25, -0.25, 1.0 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push(vertexColors[a]);
    }
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Using the MV functions ... briefly described on Pg 194
    modelMatrix = mat4();
    for(var i = transforms.length -1; i >= 0 ; i--) {
        modelMatrix = mult(modelMatrix, transforms[i]);
    }
    gl.uniformMatrix4fv( uMatrixLoc, false, flatten(modelMatrix));
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//.
function handleMouseDown(event)
{
    mouseDown = true;
    nLastMouseX = event.clientX;
    nLastMouseY = event.clientY;
}

function handleMouseUp(event)
{
    mouseDown = false;
}

function handleMouseMove(event)
{
    if(!mouseDown) {
        return;
    }
    var fDeltaX = cubCenter[0];
    var fDeltaY = cubCenter[1];
    var fDeltaZ = cubCenter[2];
    var nNewMouseX = event.clientX;
    var nNewMouseY = event.clientY;
    var nDeltaX = nNewMouseX - nLastMouseX;
    var nDeltaY = nNewMouseY - nLastMouseY;
    var fRotAngleX = nDeltaY / 5.0;
    var fRotAngleY = nDeltaX / 5.0;

    transforms.push(translate(vec3(-fDeltaX, -fDeltaY, -fDeltaZ)));
    transforms.push(rotateX(fRotAngleX));
    transforms.push(rotateY(fRotAngleY));
    transforms.push(translate(vec3(fDeltaX, fDeltaY, fDeltaZ)));

    render();
    nLastMouseX = nNewMouseX;
    nLastMouseY = nNewMouseY;
}
//.
