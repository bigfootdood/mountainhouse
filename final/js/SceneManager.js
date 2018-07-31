var camera, scene, renderer;
var controls, current_season;
var interaction;

var objects = [];

init();
update();

function init(){
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x7EC0EE);

  // Camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  //Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Object Interaction
  interaction = new THREE.Interaction(renderer, scene, camera);

  //Orbit Controls
  controls = new THREE.OrbitControls( camera );
  camera.position.set( 0, 2, 5);
  controls.update();

  seasonChanger(1);
  trigger_animations(scene);
  // animateCamera();


  var light = new THREE.DirectionalLight( 0x404040 ); // soft white light
  light.intensity = 4.5;
  light.position.set(-20,30,10)
  scene.add( light );

  var light2 = new THREE.SpotLight( 0x404040 ); // soft white light
  light2.intensity = 3;
  light2.position.set(-3,-30,-10)
  scene.add( light2 );

  var light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
  light3.intensity = 1;
  scene.add( light3 );

  // var loader = new THREE.GLTFLoader();
  // loader.load(
  //   // resource URL
  //   'assets/models/GasStation/GasStation.gltf',
  //   // called when the resource is loaded
  //   function ( gltf ) {
  //     gltf.scene.traverse(
  //       function(node){
  //         console.log(node);
  //       }
  //     )
  //     gltf.scene.scale.set(1,1,1);
  //     gltf.scene.position.set(0,-0.5,0);
  //     scene.add( gltf.scene );
  //   },
  //   // called while loading is progressing
  //   function ( xhr ) {
  //
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //
  //   },
  //   // called when loading has errors
  //   function ( error ) {
  //     console.log( 'An error happened' );
  //
  //   }
  // );

}

// Refresh scene and switch to selected Season
function seasonChanger(season){
    if (season == 1) {
      current_season = 1;
      refresh();
      objects = Summer();
    }else if(season ==2) {
      current_season = 2;
      refresh()
      objects = GasStation();
    }else if (season == 3) {
      current_season = 3;
      refresh();
      objects = Winter();
    }else if (season == 4) {
      refresh();
    }
    for (var i = 0; i < objects.length; i++) {
      scene.add(objects[i]);
    }
    trigger_animations(scene);
}

function refresh(){
  for (var i = 0; i < objects.length; i++) {
    // console.log(objects[i]);
    scene.remove(objects[i]);
  }
  objects = [];
}

function resetCamera() {
  new TWEEN.Tween( camera.position ).to( {
    x: 0,
    y: 2,
    z: 5}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).start();

  new TWEEN.Tween( controls.target).to( {
    x: 0,
    y: 0,
    z: 0}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).onUpdate(function(){controls.update()}).start();
}


//scaling
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function update() {
  requestAnimationFrame( update );
  //Load Animations
  // trigger_animations(scene);
  TWEEN.update();
  controls.update();
  render();
};


function render(){
  renderer.render( scene, camera );
}
