var scene, camera, renderer;
var meshFloor, ambientLight, light,light1;
var keyboard = {};
var viewer = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;
var particleSystem;
var width = window.innerWidth;
var height = window.innerHeight;
var viewSize = 90;
var aspectRatio = width/height;
var cubeMesh;
var cubeMesh1;
var pineMesh1;
var pineMesh2;
var pineMesh3;
var particleSystem;
var bluePoint;
var greenPoint;
var viewport = { viewSize: viewSize,
    			aspectRatio: aspectRatio,
    			left: (-aspectRatio * viewSize) / 2,
    			right: (aspectRatio * viewSize) / 2,
    			top: viewSize / 2,
   				bottom: -viewSize / 2,
   			 	near: -10000,
    			far: 1000};

function init(){
    scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90,aspectRatio, 0.1, 1000);

    // a cube 
    var cubeTexture = THREE.ImageUtils.loadTexture('./texture/christmasbox.jpg');
    cubeMesh = new THREE.Mesh( 
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshPhongMaterial({map:cubeTexture})
	);
	cubeMesh.position.y += 1;
	cubeMesh.receiveShadow = true;
	cubeMesh.castShadow = true;
	scene.add(cubeMesh)

	// a cube 
    var cubeTexture1 = THREE.ImageUtils.loadTexture('./texture/christmasbox5.jpg');
    cubeMesh1 = new THREE.Mesh( 
	new THREE.BoxGeometry(1,1.5,1),
	new THREE.MeshPhongMaterial({map:cubeTexture1})
	);
	cubeMesh1.position.y += 1;
	cubeMesh1.position.x += 2;
	cubeMesh1.position.z += 2;
	cubeMesh1.receiveShadow = true;
	cubeMesh1.castShadow = true;
	scene.add(cubeMesh1)
	
    //a floor
    var floorTexture = THREE.ImageUtils.loadTexture('./texture/snowfloor.jpg');
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(30,30, 20,20),
		new THREE.MeshPhongMaterial({map:floorTexture})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(3,6,-7);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
	
	light1 = new THREE.PointLight(0xffffff, 0.8, 18);
	light1.position.set(-7,6,3);
	light1.castShadow = false;
	light1.shadow.camera.near = 0.1;
	light1.shadow.camera.far = 25;
	scene.add(light1);
	
	// Model/material pineTree1
	var mtlLoader1 = new THREE.MTLLoader();
	mtlLoader1.load("models/naturePack_089.mtl", function(materials){
		
		materials.preload();
		var objLoader1 = new THREE.OBJLoader();
		objLoader1.setMaterials(materials);
		
		objLoader1.load("models/naturePack_089.obj", function(pineMesh1){
		
			pineMesh1.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
		
			scene.add(pineMesh1);
			pineMesh1.position.set(-4, 0, 4);
			pineMesh1.rotation.y = -Math.PI/4;
		});
		
	});
    //pineTree2
	var mtlLoader2 = new THREE.MTLLoader();
	mtlLoader2.load("models/naturePack_088.mtl", function(materials){
		
		materials.preload();
		var objLoader2 = new THREE.OBJLoader();
		objLoader2.setMaterials(materials);
		
		objLoader2.load("models/naturePack_088.obj", function(pineMesh2){
		
			pineMesh2.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
		
			scene.add(pineMesh2);
			pineMesh2.position.set(-7, 0, 6);
			pineMesh2.rotation.y = -Math.PI/4;
		});
		
	});
    //pineTree3;
		var mtlLoader3 = new THREE.MTLLoader();
	mtlLoader3.load("models/naturePack_085.mtl", function(materials){
		
		materials.preload();
		var objLoader3 = new THREE.OBJLoader();
		objLoader3.setMaterials(materials);
		
		objLoader3.load("models/naturePack_085.obj", function(pineMesh3){
		
			pineMesh3.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
		
			scene.add(pineMesh3);
			pineMesh3.position.set(2.5, 0, 2.5);
			pineMesh3.rotation.y = -Math.PI/4;
		});
		
	});

	var particles = new THREE.Geometry;
	var particleTexture = THREE.ImageUtils.loadTexture('./texture/snowflake2.png');
	var particleMin = 250;
	var particleMax = 500;
	for (var p = 0; p < 3000 ; p++) {
    var particle = new THREE.Vector3(Math.random() * particleMax - particleMin, Math.random() * particleMax - particleMin, Math.random() * particleMax - particleMin);
    particles.velocity = new THREE.Vector3(0, 0, 0);
    particles.vertices.push(particle);
    
    var particleMaterial = new THREE.ParticleBasicMaterial({ map: particleTexture, transparent: true, size: 3 });
     particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
 
    scene.add(particleSystem);
    }
	// point color
	bluePoint = new THREE.PointLight(0x0033ff, 1, 150);
	bluePoint.position.set( -3.05,3.1,1 );
	scene.add(bluePoint);
	scene.add(new THREE.PointLightHelper(bluePoint, 0.1));
  
	redPoint = new THREE.PointLight(0xFF0000, 0.4, 150);
	redPoint.position.set(-1.80,3.90,2 );
	scene.add(redPoint);
	scene.add(new THREE.PointLightHelper(redPoint, 0.1));

	camera.position.set(0, viewer.height, -5);
	camera.lookAt(new THREE.Vector3(0,viewer.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	var timer = Date.now() * 0.00001;
		cubeMesh.rotation.y = timer *50;
		cubeMesh.rotation.x = timer *50;
		cubeMesh.rotation.z = timer *50;

		cubeMesh1.rotation.y = timer *35;
		cubeMesh1.rotation.x = timer *35;
		cubeMesh1.rotation.z = timer *35;

	 	bluePoint.rotation.x += 0.01;
		bluePoint.rotation.y += 0.02;
		redPoint.rotation.x += 0.01;
		redPoint.rotation.y += 0.02;

	
		cubeMesh1.rotation.y = timer *35;
		cubeMesh1.rotation.x = timer *35;
		cubeMesh1.rotation.z = timer *35;
	
     	particleSystem.rotation.x=timer*3;

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
		camera = new THREE.PerspectiveCamera(90,aspectRatio, 0.1, 1000);
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
