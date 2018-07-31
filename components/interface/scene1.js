//create scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x7EC0EE);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
const interaction = new THREE.Interaction(renderer, scene, camera);
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
scene.add( cube );
scene.add(cube2);
cube.position.set(-2,0,0);
cube2.position.set(2,0,0);

//plane
var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.set(1.5708,0,0);
plane.position.set(0,-.5,0);
plane.name = "plane";
scene.add( plane );

var animate = function () {
  requestAnimationFrame( animate );
  //traverse the scene to access each object
  scene.traverse( function( node ) {
    if ( node instanceof THREE.Mesh & node.name !== "plane") {
      node.on('mouseover', function(ev) {
        node.scale.set(1.2,1.2,1.2);
        bounce = true;
      });
      node.on('mouseout', function(ev) {
        node.scale.set(1,1,1);
      });
      node.on('touchmove', function(ev) {
        node.scale(1,1,1);
      });
      node.on('touchstart', function(ev) {
        node.scale(1,1,1);
      });
      node.on('click', function(ev) {
        new TWEEN.Tween( camera.position ).to( {
          x: node.position.x+2,
          y: node.position.y+2,
          z: node.position.z+2}, 3000)
          .easing( TWEEN.Easing.Cubic.Out).start();

          new TWEEN.Tween( controls.target).to( {
            x: node.position.x,
            y: node.position.y,
            z: node.position.z}, 3000)
            .easing( TWEEN.Easing.Cubic.Out).onUpdate(function(){controls.update()}).start();
          });
        }
      });
      render();
    };

function render(){
  TWEEN.update();
  renderer.render( scene, camera );
}
animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
