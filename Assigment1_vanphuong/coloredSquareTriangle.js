"use strict";

var gl;
var points;
var program;
var theta = 0.0;
var thetaLoc;
window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );
    }
    // Four Vertices

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    program.vertexPositionAttribute = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(program.vertexPositionAttribute);

    program.vertexColorAttribute = gl.getAttribLocation(program, "aVertexColor");
    gl.enableVertexAttribArray(program.vertexColorAttribute);

    // Load the data into the GPU

    initBuffers();
    thetaLoc = gl.getUniformLocation( program, "theta" );

    render();
};

var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;
var triangleVertexColorBuffer;
var squareVertexColorBuffer;
var circleVertexPositionBuffer;
var circleVertexColorBuffer;

function initBuffers() {


    triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);

    var vertices = [
        -0.25,  -0.25,  0.0,
        -0.75, -0.75,  0.0,
        0.25, -0.75,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    triangleVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    var colors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    triangleVertexColorBuffer.itemSize = 4;
    triangleVertexColorBuffer.numItems = 3;

    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    
var ax = 0.75;
var ay = 0.75;
var bx = 0.0;
var by = 0.75;
var cx = 0.75;
var cy = 0.0;
var dx = 0.0;
var dy = 0.0;
vertices=[];
var numberOfSquare = 116;
for (var i= 0;i < numberOfSquare; i++){
   var preVertices =[   ax-0.025*i,ay-0.025*i,0.0,
                    bx+0.025*i,by-0.025*i,0.0,
                    cx-0.025*i,cy+0.025*i,0.0,
                    dx+0.025*i,dy+0.025*i,0.0,
                    bx+0.025*i,by-0.025*i,0.0,
                    cx-0.025*i,cy+0.025*i,0.0
                        ];
vertices = vertices.concat(preVertices);
}     
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = numberOfSquare;

    squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);

    colors = [];    
    for(var b = 0; b <  numberOfSquare ; b++) {
        if(b % 2 == 0) {
            for(var i = 0; i < 6; i++) {
                colors = colors.concat([0.0, 1.0, 0.0, 1.0]);
            }
        }
        else {
            for(var i = 0; i < 6; i++) {
                colors = colors.concat([0.0,0.0,0.0, 1.0]);
            }
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = numberOfSquare;
    //for the circle`
    circleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);

    var centerx = -0.5;
    var centery = 0.35;
    vertices = [centerx, centery, 0.0,];
    var numberOfPieces = 30;
    var angle = (2 * Math.PI) / numberOfPieces;
    //.
    for (var i = 0; i <= numberOfPieces; i++) {
        var preVertices = [
        centerx + Math.cos(i * angle) * 0.3,
        centery + Math.sin(i * angle) * 0.3,
        0.0];
        vertices = vertices.concat(preVertices);
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    circleVertexPositionBuffer.itemSize = 3;
    circleVertexPositionBuffer.numItems = numberOfPieces+2;

    circleVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);

    colors = [1.0, 0.0, 0.0, 1.0];  
    var color = 1.0;
    var inc = 2 * (1.0 / numberOfPieces);
    for(var v = 0; v <= numberOfPieces;v++){
        if(v < numberOfPieces / 2) {
           color -= inc;
        }
        else {
            color += inc;
        }
        colors = colors.concat([color, 0.0, 0.0, 1.0]);     
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    circleVertexColorBuffer.itemSize = 4;
    circleVertexColorBuffer.numItems = numberOfPieces+2;

}

function render() {
    theta += 0.01;
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1f( thetaLoc, theta );
    window.requestAnimFrame(render);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    gl.vertexAttribPointer(program.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    gl.vertexAttribPointer(program.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays( gl.TRIANGLES, 0, squareVertexPositionBuffer.numItems );

    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, circleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
    gl.vertexAttribPointer(program.vertexColorAttribute, circleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, circleVertexPositionBuffer.numItems );



}
