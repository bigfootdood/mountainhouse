//create scene
var summer = new THREE.Scene();
summer.background = new THREE.Color( 0x7EC0EE);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
const interaction = new THREE.Interaction(renderer, summer, camera);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Orbit Controls
var controls = new THREE.OrbitControls( camera );
camera.position.set( 0, 0, 5);
controls.update();

//create 2 cubes
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh(geometry,material2);
summer.add( cube );
summer.add(cube2);
cube.position.set(-2,0,0);
cube2.position.set(2,0,0);

//plane
var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.set(1.5708,0,0);
plane.position.set(0,-.5,0);
plane.name = "plane";
summer.add( plane );
