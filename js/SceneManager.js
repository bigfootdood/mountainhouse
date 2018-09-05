var camera,
    scene,
    renderer,
    controls,
    interaction,
    terrains,
    allSeasons,
    spring,
    summer,
    fall,
    winter,
    attractions,
    composer;

var current_season = 0;
var objects = [];
var animating = false;

var modelPlacementMode = true;
var globalModel;

init();

async function init(){

  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x4FAFFF);

  // Camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.receiveShadow = true;
  camera.castShadow = true;

  //Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //terrain files from json for season changer
  await loadJSON('json/terrains.json',function(response) {
    terrains = JSON.parse(response);
  });
  await loadJSON('json/spring.json',function(response) {
    spring = JSON.parse(response);
  });
  await loadJSON('json/summer.json',function(response) {
    summer = JSON.parse(response);
  });
  await loadJSON('json/fall.json',function(response) {
    fall = JSON.parse(response);
  });
  await loadJSON('json/winter.json',function(response) {
    winter = JSON.parse(response);
  });
  await loadJSON('json/allSeasons.json',async function(response) {
    allSeasons = JSON.parse(response);
    seasonChanger(1); //Load inital season after parsing json
    // console.log("allseasons: " + allSeasons.tower);
  });

  // Object Interaction
  interaction = new THREE.Interaction(renderer, scene, camera);
  interaction.on;

  //Orbit Controls
  controls = new THREE.OrbitControls( camera );
  camera.position.set( 0, 5, 9);
  controls.update();

  // Lighting
  var light = new THREE.DirectionalLight( 0xffffff, 1, 100);
  light.position.set(-30,60,45);
  light.intensity = 0.4;
  light.castShadow = true;
  scene.add(light);
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 60;
  light.shadow.camera.right = 25;
  light.shadow.camera.left = -25;
  light.shadow.camera.top = 25;
  light.shadow.camera.bottom = -25;
  light.shadow.camera.far = 115;
  light.shadow.bias = - 0.01;

  var ambient = new THREE.AmbientLight(0xfffffff);
  ambient.intensity = 0.6;
  scene.add(ambient);

  //Camera Shadow Box Helper (uncomment to see shadow map)
  // var helper = new THREE.CameraHelper( light.shadow.camera );
  // scene.add( helper );

  //Have loading screen update on Loading Manager
  THREE.DefaultLoadingManager.onLoad = function ( ) {
    document.getElementById('loadingScreen').style.animation = "fadeOut 1s";
    document.getElementById('loadingScreen').style.opacity = 0;
    if (modelPlacementMode) {
      document.getElementById('modelPlacementscreen').hidden = false;
    }
    // startIntro();
    console.log( 'Loading Complete!');
    trigger_animations(scene,objects,animating);
  };

  THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    var percent = Math.round((itemsLoaded/itemsTotal)*100);
    document.getElementById('loadingText').innerHTML = "Loading " + percent + "%";
    // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };
  update();

}

// Refresh scene and switch to selected Season
async function seasonChanger(season){
    document.getElementById('loadingScreen').style.opacity = 1;

    //Model Placement mode
    if (modelPlacementMode) {
      await testGlb(spring.garden);
    }


    for (var key in allSeasons){
      loadGlb(allSeasons[key], true);
    }
    if (season == 0) { //TESTING SEASON
      current_season = 0;
    }else if(season == 1) { //SPRING
      current_season = 1;
      refresh();
      loadGlb(terrains.springTerrain,false);
      for (var key in spring){
        loadGlb(spring[key], true);
      }
    }else if(season ==2) { //SUMMER
      current_season = 2;
      refresh();
      loadGlb(terrains.summerTerrain,false);
      for (var key in summer){
        loadGlb(summer[key], true);
      }
    }else if (season == 3) { //FALL
      current_season = 3;
      refresh();
      loadGlb(terrains.fallTerrain,false);
      for (var key in fall){
        loadGlb(fall[key], true);
      }
    }else if (season == 4) { //WINTER
      current_season = 4;
      refresh();
      loadGlb(terrains.winterTerrain,false);
      for (var key in winter){
        loadGlb(winter[key], true);
      }
    }
}

function refresh(){
  for (var i = 0; i < objects.length; i++) {
    scene.remove(objects[i]);
  }
  objects = [];
}

//Json Loader for loading object descriptions and properties
async function loadJSON(path,callback) {
   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', path, true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

// Render gltf model from object
function loadGlb(object,selectable) {
    loader.load(
      object.path,
      function ( gltf ) {
        gltf.scene.traverse(function(node){
          node.castShadow = true;
          node.receiveShadow = true;
        });
        gltf.scene.name = object.name;
        gltf.scene.description = object.description;

        gltf.scene.scale.x = object.scale.x;
        gltf.scene.scale.y = object.scale.y;
        gltf.scene.scale.z = object.scale.z;

        gltf.scene.position.x = object.position.x;
        gltf.scene.position.y = object.position.y;
        gltf.scene.position.z = object.position.z;

        gltf.scene.rotation.x = object.rotation.x;
        gltf.scene.rotation.y = object.rotation.y;
        gltf.scene.rotation.z = object.rotation.z;

        gltf.scene.cameraPosition = {"x":0,"y":0,"z":0}
        gltf.scene.cameraPosition.x = object.cameraPosition.x;
        gltf.scene.cameraPosition.y = object.cameraPosition.y;
        gltf.scene.cameraPosition.z = object.cameraPosition.z;

        gltf.scene.photo = object.photo;
        gltf.scene.video = object.video;


        if (selectable) {
          gltf.scene.selectable = true;
        }

        objects.push(gltf.scene);
        scene.add( gltf.scene );

      }
    );
}

async function testGlb(object) {
    loader.load(

      object.path,

      function ( gltf ) {
        gltf.scene.traverse(function(node){
          node.castShadow = true;
          node.receiveShadow = true;
        });

        gltf.scene.scale.x = object.scale.x;
        gltf.scene.scale.y = object.scale.y;
        gltf.scene.scale.z = object.scale.z;

        gltf.scene.position.x = 0;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 0;

        globalModel = gltf.scene;
        scene.add(globalModel);



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


function update() {

  if (globalModel) {
    globalModel.position.copy(controls.target);
    globalModel.position.y = camera.position.y - 2;
  }

  if (modelPlacementMode) {
    document.getElementById("modelX").innerHTML = controls.target.x;
    document.getElementById("modelY").innerHTML = camera.position.y - 2;
    document.getElementById("modelZ").innerHTML = controls.target.z;

    document.getElementById("cameraX").innerHTML = camera.position.x;
    document.getElementById("cameraY").innerHTML = camera.position.y;
    document.getElementById("cameraZ").innerHTML = camera.position.z;
  }
  // var title = document.getElementById("sunTitle");
  // title.innerHTML = ("Camera: "+camera.position.x+" "+camera.position.y+ " "+ camera.position.z+ "Origin: "+controls.target.x+" "+controls.target.y+ " "+ controls.target.z);

  requestAnimationFrame( update );
  TWEEN.update();
  if (!animating) {
    controls.update();
  }
  render();
};


function render(){
  renderer.render( scene, camera );
}
