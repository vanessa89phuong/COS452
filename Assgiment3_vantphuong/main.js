var scene, camera, renderer;
var keyboard = {};
var viewer = { height:2.0, speed:0.2, turnSpeed:Math.PI*0.02 };
var cube;
var	red = new THREE.Color(1, 0, 0);
var	green = new THREE.Color(0, 1, 0);
var	blue = new THREE.Color(0, 0, 1);
var colors = [red, green, blue];
var headMesh;
var width = window.innerWidth;
var height = window.innerHeight;
var viewSize = 90;
var aspectRatio = width/height;
var viewport = { viewSize: viewSize,
    			aspectRatio: aspectRatio,
    			left: (-aspectRatio * viewSize) / 2,
    			right: (aspectRatio * viewSize) / 2,
    			top: viewSize / 2,
   				bottom: -viewSize / 2,
   			 	near: -10000,
    			far: 1000};
				var mesh;
			var spheres =[];
function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(140,aspectRatio, 0.1, 1000);

	//a head
    var head = new THREE.SphereGeometry(2,20,20);
	var materialHead= new THREE.MeshBasicMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.5}) ;
    headMesh = new THREE.Mesh( head, materialHead );
	headMesh.position.set(0.0,1.0, -1.0); 
//    scene.add( headMesh );

	// ear left
	var earLeft = new THREE.SphereGeometry(1,10,10);
	 var materialLeft= new THREE.MeshBasicMaterial({color: 0x999999, transparent: true, opacity: 0.5}) ;
    var leftMesh = new THREE.Mesh( earLeft, materialLeft );
	leftMesh.position.set(1.6,2.4,-1.2)
   //scene.add( leftMesh );

   	//ear right
	var earRight = new THREE.SphereGeometry(1,10,10);
	var materialRight= new THREE.MeshBasicMaterial({color: 0x999999, transparent: true, opacity: 0.5}) ;
    var rightMesh = new THREE.Mesh( earRight, materialRight );
	rightMesh.position.set(-1.6,2.4,-1.2)
   //	scene.add( rightMesh );



var cubeGeometry = new THREE.BoxGeometry(1,1,1);
for (var i = 0; i < 3; i++) {
    cubeGeometry.faces[4 * i].color = colors[i];
    cubeGeometry.faces[4 * i + 1].color = colors[i];
    cubeGeometry.faces[4 * i + 2].color = colors[i];
    cubeGeometry.faces[4 * i + 3].color = colors[i];
}
var textureLoader = new THREE.TextureLoader();
 var material = new THREE.MeshBasicMaterial({color: 0xffffff,
    vertexColors: THREE.FaceColors}) 
  cube = new THREE.Mesh(cubeGeometry, material)
  cube.position.y += 1;
  cube.position.set(0.0,4, -1.0);
  scene.add(cube);

var textureCube = new THREE.CubeTextureLoader()
					.setPath( 'texture/')
				.load( ['phai1.jpg','trai1.jpg', 'tren1.jpg', 'duoi1.jpg', 'truoc1.jpg', 'duoi1.jpg' ] );
				scene.background = textureCube;
			
	camera.position.set(0, viewer.height, -5);
	camera.lookAt(new THREE.Vector3(0,viewer.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	headMesh.rotation.z += 0.01;
	var timer = Date.now() * 0.0001;
		cube.position.x = Math.sin( timer * 10 ) ;
		cube.position.y = Math.cos( timer * 6 ) ;
		cube.position.z = Math.cos( timer * 0 ) ;
		cube.rotation.y = timer *2.5;
		cube.rotation.x = timer *5;
	
	// Keyboard turn inputs
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= viewer.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += viewer.turnSpeed;
	}
  if(keyboard[40]){ // left arrow key
		camera.rotation.x -= viewer.turnSpeed;
	}
	if(keyboard[38]){ // right arrow key
		camera.rotation.x += viewer.turnSpeed;
	}

	if(keyboard[80]){ // P
		camera = new THREE.PerspectiveCamera(140,aspectRatio, 0.1, 1000);
		camera.position.set(0, viewer.height, -5);
		camera.lookAt(new THREE.Vector3(0,viewer.height,0));
	}
	if(keyboard[79]){ // O
	camera = new THREE.OrthographicCamera(
			viewport.left, 
    		viewport.right, 
    		viewport.top, 
    		viewport.bottom, 
    		viewport.near, 
    		viewport.far );
	}
	
	renderer.render(scene, camera);
}
function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
