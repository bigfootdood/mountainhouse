var camera, scene, renderer;
var controls, current_season;
var interaction;

var objects = [];
var allSeasons = [];
var springSummerFall = [];
var summer = [];
var winter = [];

var attractions;
var composer;

init();
update();

//init function to set up scene/renderer and load initial map
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
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = false;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Object Interaction
  interaction = new THREE.Interaction(renderer, scene, camera);
  interaction.on;

  //Orbit Controls
  controls = new THREE.OrbitControls( camera );
  camera.position.set( 0, 5, 9);
  controls.update();

  var light = new THREE.DirectionalLight( 0xffffff, 1, 100);
  light.position.set(-5,10,-3);
  light.intensity = 1;

  // light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  scene.add(light);
  // light.shadowDarkness = 0.5;

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 2;
  light.shadow.camera.far = 20;
  // light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
  // light.shadow.bias = 0.0001;
  light.shadow.bias = - 0.01;


  var ambient = new THREE.AmbientLight(0xfffffff);
  ambient.intensity = 0.2;
  scene.add(ambient);

  //Camera Shadow Box Helper
  var helper = new THREE.CameraHelper( light.shadow.camera );
  scene.add( helper );

  // seasonChanger(1);
  trigger_animations(scene);
  // animateCamera()

  // Load main Terrain (default master terrain for testing)
  loader.load(
  	'assets/models/terrain/MASTER.glb',
  	function ( gltf ) {


      gltf.scene.scale.set(.001,.001,.001);
      gltf.scene.traverse(function(node){
        // node.scale.set(.0001,.0001,.0001);
        node.castShadow = true;
        node.receiveShadow =true;
      });
      scene.add( gltf.scene );
      objects.push(gltf.scene )

  	},
  	// called while loading is progressing
  	function ( xhr ) {

  		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  	},
  	// called when loading has errors
  	function ( error ) {

  		console.log( 'An error happened' );

  	}
  );


  //Have loading screen update on Loading Manager
  THREE.DefaultLoadingManager.onLoad = function ( ) {
    // document.getElementById('loadingScreen').style.animation = "fadeOut 1s forwards";
    // startIntro();
    console.log( 'Loading Complete!');
    console.log( objects);
  };

  // THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  //   var percent = Math.round((itemsLoaded/itemsTotal)*100);
  //   console.log(percent);
  //   document.getElementById('loadingText').innerHTML = "Loading " + percent + "%";
  //   console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  //
  // };
}


// Refresh scene and switch to selected Season
async function seasonChanger(season){
    if (season == 1) {
      current_season = 1;
      refresh();
      // Re-open loading manager
      // load summer Terrain
      // load models from json file for spring

      // loadJSON(function(response) {
      //   attractions = JSON.parse(response);
      //   // Test_environment(scene,objects,attractions);
      // });
      // Summer(scene,objects)
    }else if(season ==2) {
      current_season = 2;
      refresh();
      // Re-open loading manager
      // load fall Terrain
      loadGlb()
      // load models from json file for fall

    }else if (season == 3) {
      current_season = 3;
      refresh();
      // Re-open loading manager
      // load fall Terrain
      // load models from json file for fall

    }else if (season == 4) {
      current_season = 4;
      refresh();
      // Re-open loading manager
      // load spring Terrain
      // load models from json file for spring

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
   xobj.open('GET', 'json/test_environment.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

//Render gltf model from object
function loadGlb(object) {
    loader.load(
      // resource URL
      object.path,
      // called when the resource is loaded
      function ( gltf ) {
        // console.log(attractions[j].name);
        gltf.scene.traverse(function(node){
          node.castShadow = true;
          node.receiveShadow = true;
        });
        gltf.scene.name = object.name;
        gltf.scene.description = object.description;
        // gltf.scene.scale.set(.004,.004,.004);
        gltf.scene.scale.x = object.scale.x;
        gltf.scene.scale.y = object.scale.y;
        gltf.scene.scale.z = object.scale.z;
        // gltf.scene.position.set(1.5,0,3);
        gltf.scene.position.x = object.position.x;
        gltf.scene.position.y = object.position.y;
        gltf.scene.position.z = object.position.z;

        gltf.scene.cameraPosition = {"x":0,"y":0,"z":0}
        gltf.scene.cameraPosition.x = object.cameraPosition.x;
        gltf.scene.cameraPosition.y = object.cameraPosition.y;
        gltf.scene.cameraPosition.z = object.cameraPosition.z;

        gltf.scene.photo = object.photo;



        gltf.scene.selectable = true;


        scene.add( gltf.scene );
        // summer_objects.push(gltf.scene);
        // objects = summer_objects;

      }
    );
}

function startIntro(){
  controls.autoRotate = true; //upgrade to custom camera animation
  //Transition between 3 different Icons
  document.getElementById("click").style.animation = "fadeInOut 2s";
  document.getElementById("zoom").style.animation = "fadeInOut 2s 2s";
  document.getElementById("rotate").style.animation = "fadeInOut 2s 4s";
  document.getElementById("tutorialOne").style.animation = "fadeOut 1s 5s forwards";
  //Switch to Season text
  document.getElementById("tutorialTwo").style.animation = "fadeIn 1s 6s forwards";
  //Fade in Season dropdown
  document.getElementById("topbar").style.animation = "fadeIn 1s 7s forwards";
  document.getElementById("tutorialScreen").style.animation = "fadeOut 1s 8s forwards";
}

function endIntro(){
  controls.autoRotate = false;
  // make custom camera animation to do 1 more camera spin AND bounce all objects
  // Set camera to default starting position
  // Set all fullscreen divs to hidden
}


//scaling
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function update(cube) {

  requestAnimationFrame( update );
  TWEEN.update();
  controls.update();
  var title = document.getElementById("sunTitle");
  title.innerHTML = ("Camera: "+Math.round(camera.position.x)+" "+Math.round(camera.position.y)+ " "+ Math.round(camera.position.z)+ "Origin: "+Math.round(controls.target.x)+" "+Math.round(controls.target.y)+ " "+ Math.round(controls.target.z));
  render();

};


function render(){
  renderer.render( scene, camera );
}
