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
  interaction.on;

  //Orbit Controls
  controls = new THREE.OrbitControls( camera );
  camera.position.set( 0, 5, 9);
  controls.update();

  seasonChanger(1);
  trigger_animations(scene);
  // animateCamera();


  var light = new THREE.HemisphereLight( 0x404040 ); // soft white light
  light.intensity = 3;
  light.position.set(-20,30,10)
  scene.add( light );

  // var light = new THREE.DirectionalLight( 0x404040 ); // soft white light
  // light.intensity = 10;
  // light.position.set(-20,30,10)
  // scene.add( light );
  // var light2 = new THREE.SpotLight( 0x404040 ); // soft white light
  // light2.intensity = 3;
  // light2.position.set(-3,-30,-10)
  // scene.add( light2 );

  // var light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
  // light3.intensity = 2;
  // scene.add( light3 );
}

// Refresh scene and switch to selected Season
async function seasonChanger(season){
    if (season == 1) {
      current_season = 1;
      refresh();
      objects = await Summer();
      console.log(objects);
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
      object = objects[i];
      // console.log(object);
      scene.add(object);
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
    y: 5,
    z: 9}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).start();

  new TWEEN.Tween( controls.target).to( {
    x: 0,
    y: 0,
    z: 0}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).onUpdate(function(){controls.update()}).start();
    var title = document.getElementById("objectTitle");
    title.innerHTML = "";
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
