var camera, scene, renderer;
var controls, current_season;
var interaction;
var objects = [];
var attractions;
var composer;

init();
update();

function init(){

  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x7EC0EE);

  // Camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.receiveShadow = true;
  camera.castShadow = true;

  //Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = false;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Postprocessing composer
  //
  // var renderPass = new THREE.RenderPass( scene, camera );
  //
  // var copyPass = new THREE.ShaderPass( THREE.CopyShader );
  // copyPass.renderToScreen = true;
  //
  // var bokehPass = new Three.ShaderPass(THREE.BokehShader);
  //
  // var composer = new THREE.EffectComposer( renderer );
  // composer.addPass( renderPass );
  // composer.addPass( copyPass );
  //
  // composer.render( 0.05 );


  // renderer.shadowCameraNear = 3;
  // renderer.shadowCameraFar = camera.far;
  // renderer.shadowCameraFov = 50;
  // // renderer.shadowMapDarkness = 0.5;
  // renderer.shadowMapWidth = 1024;
  // renderer.shadowMapHeight = 1024;
  // renderer.shadowMapDebug = true; 50;
  // renderer.shadowMapDarkness = 0.5;
  // renderer.shadowMapWidth = 512;
  // renderer.shadowMapHeight = 512;
  // renderer.shadowMapDebug = true;

  // Object Interaction
  interaction = new THREE.Interaction(renderer, scene, camera);
  interaction.on;

  // Object Information (name,description,photos...)
  loadJSON(function(response) {
    attractions = JSON.parse(response);
  });

  //Orbit Controls
  controls = new THREE.OrbitControls( camera );
  camera.position.set( 0, 5, 9);
  controls.update();

  var light = new THREE.DirectionalLight( 0xffffff, 1, 100);
  light.position.set(-5,10,-3);
  light.intensity = 1;

  // light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadowDarkness = 0.5;

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 5;       // default
  light.shadow.camera.far = 15;   // default
  // light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
  // light.shadow.bias = 0.0001;
  light.shadow.bias = - 0.01;
  scene.add(light);

  var ambient = new THREE.AmbientLight(0xfffffff);
  ambient.intensity = 1;
  scene.add(ambient);

  // var helper = new THREE.CameraHelper( light.shadow.camera );
  // scene.add( helper );

  seasonChanger(1);
  trigger_animations(scene);
  // animateCamera();




  // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  // var cube = new THREE.Mesh( geometry, material );
  // cube.name = "cube1";
  // cube.castShadow = true;
  // cube.receiveShadow = true;
  // cube.selectable = true;
  // cube.animating = false;
  // cube.position.set(-2,3,0);
  // scene.add(cube);
  //
  // var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
  // var material = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  // var plane = new THREE.Mesh( geometry, material );
  // plane.rotation.set(1.5708,0,0);
  // plane.position.set(-2,2,0);
  // plane.castShadow = true;
  // plane.receiveShadow = true;
  // plane.name = "plane";
  // plane.selectable = false;
  // plane.animating = false;
  // scene.add(plane);
  // console.log(plane.material);



  // light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  // light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
  // var light = new THREE.HemisphereLight( 0x404040 ); // soft white light
  // light.intensity = 1;
  // light.position.set(-20,30,10)
  // scene.add( light );
  //
  // var light = new THREE.SpotLight( 0x404040 ); // soft white light
  // light.intensity = 3;
  // light.castShadow = true;
  // light.target.position.set( 0, 0, 0 );
  // light.position.set(-20,30,10)
  // scene.add( light );
  // var light2 = new THREE.SpotLight( 0x404040 ); // soft white light
  // light2.intensity = 3;
  // light2.position.set(-3,-30,-10)
  // scene.add( light2 );

  // var light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
  // light3.intensity = 1;
  // scene.add( light3 );
}


// Refresh scene and switch to selected Season
async function seasonChanger(season){
    if (season == 1) {
      current_season = 1;
      refresh();
      Summer(scene,objects);
    }else if(season ==2) {
      current_season = 2;
      refresh()
      GasStation(scene,objects);
    }else if (season == 3) {
      current_season = 3;
      refresh();
      Winter(scene,objects);
    }else if (season == 4) {
      current_season = 4;
      refresh();
      Summer(scene,objects);
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

//Json Loader for loading object descriptions and properties
function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', 'json/test.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
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


    var more = document.getElementById("more");
    more.innerHTML = "";
}

function loadModal(){

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
  TWEEN.update();
  controls.update();
  // composer.render();
  render();

};


function render(){
  renderer.render( scene, camera );
}
